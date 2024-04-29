import type { NextApiRequest, NextApiResponse } from 'next';
import { sendErrorResponse } from '../../../utils/errorHandler';
import { isValidID } from '@/src/utils/validationHelpers';
import prisma from '@/src/lib/database/prisma';
import { fetchRedis } from '@/src/utils/redis';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { messages } from '@/src/lib/messages/messages';
export default async function Accept(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method !== 'POST') {
      res.setHeader('Allow', ['POST']);
      res.status(405).end('Method Not Allowed');
    }
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return sendErrorResponse(res, 401, 'Unauthorized');
    }
    const { sender_id } = req.body;

    if (!isValidID(sender_id)) {
      return sendErrorResponse(res, 400, 'Invalid user ID');
    }
    const user = await prisma.users.findUnique({
      where: {
        user_id: sender_id,
      },
    });
    if (!user) {
      return sendErrorResponse(res, 404, 'User not found');
    }

    const isInChatList = (await fetchRedis(
      'sismember',
      `user:${session.user.user_id}:chat_list`,
      sender_id,
    )) as 0 | 1;

    if (isInChatList) {
      return sendErrorResponse(res, 400, 'Already in chat list');
    }

    const hasMessageRequest = await fetchRedis(
      'sismember',
      `user:${session.user.user_id}:incoming_message_requests`,
      sender_id,
    );
    if (!hasMessageRequest) {
      return sendErrorResponse(res, 400, 'Request not found');
    }
    // Valid request

    await messages.sadd(`user:${session.user.user_id}:chat_list`, sender_id);
    await messages.sadd(`user:${sender_id}:chat_list`, session.user.user_id);
    await messages.srem(
      `user:${session.user.user_id}:incoming_message_requests`,
      sender_id,
    );

    return res.status(200).json({
      message: `Added to chat list`,
    });
  } catch (error: unknown) {
    console.error('An error occurred while sending message request: ', error);
    return sendErrorResponse(res, 500, 'Internal server error', error);
  }
}
