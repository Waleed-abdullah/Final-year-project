import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

export default async function createUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Validate request body
  if (!req.body) {
    return res
      .status(400)
      .json({ error: "Bad Request", message: "Request body is missing" });
  }

  const date = new Date();
  const {
    user_id = uuidv4(),
    username,
    email,
    password,
    user_type,
    profile_pic,
    date_joined = date,
    last_login = date,
    created_at = date,
    updated_at = date,
  } = req.body;

  // Check for required fields
  if (!username || !email || !password || !user_type) {
    return res
      .status(400)
      .json({ error: "Bad Request", message: "Required fields are missing" });
  }

  // Validate email format
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return res
      .status(400)
      .json({ error: "Bad Request", message: "Invalid email format" });
  }

  // Validate user_type
  if (user_type !== "Waza Warrior" && user_type !== "Waza Master") {
    return res
      .status(400)
      .json({ error: "Bad Request", message: "Invalid user_type" });
  }

  // Validate password complexity
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      error: "Bad Request",
      message:
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character",
    });
  }

  // Hash the password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Check for unique username and email
  const existingUsername = await prisma.users.findFirst({
    where: { username },
  });
  const existingEmail = await prisma.users.findFirst({
    where: { email },
  });

  if (existingUsername) {
    return res
      .status(409)
      .json({ error: "Conflict", message: "Username already exists" });
  }
  if (existingEmail) {
    return res
      .status(409)
      .json({ error: "Conflict", message: "Email already exists" });
  }

  // Create the user
  try {
    const newUser = await prisma.users.create({
      data: {
        user_id,
        username,
        email,
        password: hashedPassword,
        user_type,
        profile_pic,
        date_joined,
        last_login,
        created_at,
        updated_at,
      },
    });

    return res.status(201).json(newUser);
  } catch (error: any) {
    if (error.code === "P2002") {
      return res
        .status(409)
        .json({ error: "Conflict", message: "Duplicate user_id" });
    }
    return res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
}
