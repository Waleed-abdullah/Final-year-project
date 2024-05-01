import type { NextApiRequest, NextApiResponse } from 'next';
import { sendErrorResponse } from '../../../utils/errorHandler';
import { isValidID } from '@/utils/validationHelpers';
import prisma from '@/lib/database/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { pusherServer } from '@/lib/messages/pusher';

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
    const { text, chat_id } = req.body;
    if (!isValidID(chat_id)) {
      return sendErrorResponse(res, 400, 'Invalid chat ID');
    }
    const chat_list = await prisma.chat_list.findFirst({
      where: {
        chat_list_id: chat_id,
        OR: [
          { user_id_1: session.user.user_id },
          { user_id_2: session.user.user_id },
        ],
      },
    });
    if (!chat_list) {
      return sendErrorResponse(res, 400, 'Request not found');
    }
    const { user_id_1, user_id_2 } = chat_list;
    if (
      user_id_1 !== session.user.user_id &&
      user_id_2 !== session.user.user_id
    ) {
      return sendErrorResponse(res, 403, 'Forbidden');
    }

    if (!isValidID(user_id_1) || !isValidID(user_id_2)) {
      return sendErrorResponse(res, 400, 'Invalid chat ID');
    }
    const partner_id =
      user_id_1 === session.user.user_id ? user_id_2 : user_id_1;
    if (!text || typeof text !== 'string') {
      return sendErrorResponse(res, 400, 'Invalid message');
    }

    const isInChatList = await prisma.chat_list.findFirst({
      where: {
        OR: [
          { user_id_1: user_id_1, user_id_2: user_id_2 },
          { user_id_1: user_id_2, user_id_2: user_id_1 },
        ],
      },
    });

    if (!isInChatList) {
      return sendErrorResponse(res, 400, 'Request not found');
    }

    if (isInChatList.status === 'pending') {
      return sendErrorResponse(res, 400, 'Request not accepted');
    }
    if (isInChatList.status === 'rejected') {
      return sendErrorResponse(res, 400, 'Request already rejected');
    }
    const chat = await prisma.chat.create({
      data: {
        sender_id: session.user.user_id,
        receiver_id: partner_id,
        message_content: text,
        timestamp: new Date(),
        read_status: false,
      },
    });

    await pusherServer.trigger(`${chat_id}`, 'new_message', chat);
    res.send({ message: 'Message sent successfully', chat });
  } catch (error: unknown) {
    console.error('An error occurred while sending message request: ', error);
    return sendErrorResponse(res, 500, 'Internal server error', error);
  }
}
