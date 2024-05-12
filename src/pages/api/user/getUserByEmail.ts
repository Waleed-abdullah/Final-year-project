import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/database/prisma';
import { sendErrorResponse } from '@/utils/errorHandler';
import { isValidEmail } from '@/utils/validationHelpers';

export default async function getUserByEmail(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const email = String(req.query.email);

  if (!isValidEmail(email)) {
    return sendErrorResponse(res, 400, 'Invalid email parameter');
  }

  try {
    const user = await prisma.users.findUnique({
      where: { email: String(email) },
      select: {
        user_id: true,
        username: true,
        email: true,
        user_type: true,
        profile_pic: true,
        date_joined: true,
        last_login: true,
        created_at: true,
        updated_at: true,
      },
    });

    if (!user) {
      return sendErrorResponse(res, 404, 'User not found');
    }

    res.status(200).json(user);
  } catch (error: unknown) {
    console.error('Error while fetching user:', error);
    return sendErrorResponse(
      res,
      500,
      'An error occurred while fetching the user',
      error,
    );
  }
}
