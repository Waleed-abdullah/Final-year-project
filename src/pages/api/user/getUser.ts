<<<<<<< HEAD
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { sendErrorResponse } from "../../../utils/errorHandler";

export default async function getUser(
  req: NextApiRequest,
  res: NextApiResponse
=======
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { sendErrorResponse } from '../../../utils/errorHandler';

export default async function getUser(
  req: NextApiRequest,
  res: NextApiResponse,
>>>>>>> 89785d4a7be99902214a44d441545388b1c31235
) {
  const id = req.query.id;

  // Type Safety: Validate 'id' query parameter
  if (!id || Array.isArray(id)) {
<<<<<<< HEAD
    return sendErrorResponse(res, 400, "Invalid id parameter");
=======
    return sendErrorResponse(res, 400, 'Invalid id parameter');
>>>>>>> 89785d4a7be99902214a44d441545388b1c31235
  }

  try {
    const user = await prisma.users.findUnique({
      where: { user_id: String(id) },
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

    res.status(200).json(user);
  } catch (error: any) {
<<<<<<< HEAD
    console.error("Error while fetching user:", error);
    return sendErrorResponse(
      res,
      500,
      "An error occurred while fetching the user",
      error
=======
    console.error('Error while fetching user:', error);
    return sendErrorResponse(
      res,
      500,
      'An error occurred while fetching the user',
      error,
>>>>>>> 89785d4a7be99902214a44d441545388b1c31235
    );
  }
}
