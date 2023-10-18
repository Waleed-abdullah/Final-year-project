import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { sendErrorResponse } from "../../../utils/errorHandler";

export default async function getUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id;

  // Type Safety: Validate 'id' query parameter
  if (!id || Array.isArray(id)) {
    return sendErrorResponse(res, 400, "Invalid id parameter");
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
      return sendErrorResponse(res, 404, "User not found");
    }

    res.status(200).json(user);
  } catch (error: any) {
    console.error("Error while fetching user:", error);
    return sendErrorResponse(
      res,
      500,
      "An error occurred while fetching the user",
      error
    );
  }
}
