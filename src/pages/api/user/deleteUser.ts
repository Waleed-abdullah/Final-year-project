<<<<<<< HEAD
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { sendErrorResponse } from "../../../utils/errorHandler";

export default async function deleteUser(
  req: NextApiRequest,
  res: NextApiResponse
=======
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { sendErrorResponse } from '../../../utils/errorHandler';

export default async function deleteUser(
  req: NextApiRequest,
  res: NextApiResponse,
>>>>>>> 89785d4a7be99902214a44d441545388b1c31235
) {
  // Ensure type safety for `id`
  const id = String(req.query.id);

  // Check for required `id`
  if (!id) {
<<<<<<< HEAD
    return sendErrorResponse(res, 400, "id is required for deleting");
=======
    return sendErrorResponse(res, 400, 'id is required for deleting');
>>>>>>> 89785d4a7be99902214a44d441545388b1c31235
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
<<<<<<< HEAD
      return sendErrorResponse(res, 404, "User not found");
=======
      return sendErrorResponse(res, 404, 'User not found');
>>>>>>> 89785d4a7be99902214a44d441545388b1c31235
    }

    await prisma.users.delete({
      where: { user_id: id },
    });

    return res.status(200).json(user); // 204 No Content
  } catch (error: any) {
<<<<<<< HEAD
    console.error("An error occurred while deleting the user:", error);
    return sendErrorResponse(res, 500, "Internal server error", error);
=======
    console.error('An error occurred while deleting the user:', error);
    return sendErrorResponse(res, 500, 'Internal server error', error);
>>>>>>> 89785d4a7be99902214a44d441545388b1c31235
  }
}
