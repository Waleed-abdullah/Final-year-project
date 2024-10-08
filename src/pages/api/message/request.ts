import type { NextApiRequest, NextApiResponse } from 'next';
import { sendErrorResponse } from '@/utils/errorHandler';
import { isValidID } from '@/utils/validationHelpers';
import prisma from '@/lib/database/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { pusherServer } from '@/lib/messages/pusher';
export default async function Request(
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

    const { user_id: reciever_id } = req.body;
    if (!isValidID(reciever_id)) {
      return sendErrorResponse(res, 400, 'Invalid user ID====');
    }
    const user = await prisma.users.findUnique({
      where: {
        user_id: reciever_id,
      },
    });
    if (!user) {
      return sendErrorResponse(res, 404, 'User not found');
    }

    const alreadySentReq = await prisma.chat_list.findFirst({
      where: {
        OR: [
          { user_id_1: session.user.user_id, user_id_2: reciever_id },
          { user_id_1: reciever_id, user_id_2: session.user.user_id },
        ],
      },
    });

    if (alreadySentReq) {
      return sendErrorResponse(res, 400, 'Request already sent');
    }

    const sender = await prisma.users.findUnique({
      where: {
        user_id: session.user.user_id,
      },
      select: {
        user_id: true,
        username: true,
        profile_pic: true,
        name: true,
      },
    });
    if (!sender) {
      return sendErrorResponse(res, 404, 'Sender not found');
    }

    await prisma.chat_list.create({
      data: {
        user_id_1: session.user.user_id,
        user_id_2: reciever_id,
        status: 'pending',
      },
    });

    await pusherServer.trigger(reciever_id, 'msg-request', sender);

    return res.status(200).json({
      message: 'Request sent',
    });
  } catch (error: unknown) {
    console.error('An error occurred while sending message request: ', error);
    return sendErrorResponse(res, 500, 'Internal server error', error);
  }
}
