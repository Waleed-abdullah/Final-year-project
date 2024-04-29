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

    // Valid request

    await prisma.chat_list.update({
      where: {
        user_id_1_user_id_2: {
          user_id_1: sender_id,
          user_id_2: session.user.user_id,
        },
      },
      data: {
        status: 'rejected',
      },
    });

    return res.status(200).json({
      message: `Removed message request`,
    });
  } catch (error: unknown) {
    console.error('An error occurred while sending message request: ', error);
    return sendErrorResponse(res, 500, 'Internal server error', error);
  }
}
