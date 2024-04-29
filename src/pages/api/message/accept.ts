import type { NextApiRequest, NextApiResponse } from 'next';
import { sendErrorResponse } from '../../../utils/errorHandler';
import { isValidID } from '@/src/utils/validationHelpers';
import prisma from '@/src/lib/database/prisma';
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

    const isInChatList = await prisma.chat_list.findFirst({
      where: {
        OR: [
          { user_id_1: session.user.user_id, user_id_2: sender_id },
          { user_id_1: sender_id, user_id_2: session.user.user_id },
        ],
      },
    });

    if (!isInChatList) {
      return sendErrorResponse(res, 400, 'Request not found');
    }

    if (isInChatList.status === 'accepted') {
      return sendErrorResponse(res, 400, 'Request already accepted');
    }
    if (isInChatList.status === 'rejected') {
      return sendErrorResponse(res, 400, 'Request already rejected');
    }

    // Valid request

    await prisma.chat_list.update({
      where: {
        user_id_1_user_id_2: {
          user_id_1: sender_id,
          user_id_2: session.user.user_id,
        },
      },
      data: {
        status: 'accepted',
      },
    });
    return res.status(200).json({
      message: `Added to chat list`,
    });
  } catch (error: unknown) {
    console.error('An error occurred while sending message request: ', error);
    return sendErrorResponse(res, 500, 'Internal server error', error);
  }
}
