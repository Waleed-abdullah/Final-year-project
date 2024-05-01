import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/database/prisma';
import { sendErrorResponse } from '../../../utils/errorHandler';
import { isValidID } from '@/utils/validationHelpers';

export default async function deleteUser(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Ensure type safety for `id`
  const id = String(req.query.id);

  // Check for required `id`
  if (!isValidID(id)) {
    return sendErrorResponse(res, 400, 'id is required for deleting');
  }

  try {
    const user = await prisma.users.findUnique({
      where: { user_id: id },
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

    await prisma.users.delete({
      where: { user_id: id },
    });

    return res.status(200).json(user); // 204 No Content
  } catch (error: unknown) {
    console.error('An error occurred while deleting the user:', error);
    return sendErrorResponse(res, 500, 'Internal server error', error);
  }
}
