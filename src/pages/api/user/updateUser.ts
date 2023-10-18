import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import bcrypt from "bcrypt";
import { sendErrorResponse } from "../../../utils/errorHandler";
import {
  isValidEmail,
  isValidPassword,
} from "../../../utils/validationHelpers";

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS || "10");

type UpdateData = {
  updated_at: Date;
  email?: string;
  password?: string;
  profile_pic?: string;
};

export default async function updateUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = String(req.query.id);

  const reqBody: Partial<UpdateData> = req.body;

  if (!id) {
    return sendErrorResponse(res, 400, "id is required for updating");
  }

  const updateData: UpdateData = {
    updated_at: new Date(),
  };

  if (reqBody.profile_pic !== undefined) {
    updateData.profile_pic = reqBody.profile_pic;
  }

  if (reqBody.email && !isValidEmail(reqBody.email)) {
    return sendErrorResponse(res, 400, "Invalid email format");
  }

  if (reqBody.email) {
    updateData.email = reqBody.email;
  }

  if (reqBody.password && !isValidPassword(reqBody.password)) {
    return sendErrorResponse(res, 400, "Invalid password format");
  }

  if (reqBody.password) {
    const hashedPassword = await bcrypt.hash(reqBody.password, SALT_ROUNDS);
    updateData.password = hashedPassword;
  }

  if (Object.keys(updateData).length <= 1) {
    return sendErrorResponse(
      res,
      400,
      "At least one field is required for updating"
    );
  }

  try {
    const updatedUser = await prisma.users.update({
      where: { user_id: id },
      data: updateData,
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

    return res.status(200).json(updatedUser);
  } catch (error: any) {
    console.error("Error while updating user:", error);
    if (error.code === "P2002") {
      return sendErrorResponse(res, 409, "Conflict, duplicate data");
    }
    return sendErrorResponse(res, 500, "Internal server error", error);
  }
}
