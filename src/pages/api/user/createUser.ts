import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import bcrypt from 'bcrypt';
import { sendErrorResponse } from '../../../utils/errorHandler';
import {
  isValidEmail,
  isValidPassword,
} from '../../../utils/validationHelpers';
import { GenderType, User, UserType } from '@/src/types/page/auth/user';

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS || '10'); // Using environment variable for salt rounds

export default async function createUser(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const reqBody: Partial<User> = req.body;

  if (!reqBody) {
    return sendErrorResponse(res, 400, 'Missing request body');
  }

  const date = new Date();
  const {
    username,
    name,
    age,
    gender,
    email,
    password,
    user_type,
    provider,
    is_verified = false,
    profile_pic,
    date_joined = date,
    last_login = date,
    created_at = date,
    updated_at = date,
  } = reqBody;

  if (!username || !email || !user_type || !name || !age || !gender) {
    return sendErrorResponse(res, 400, 'Missing required fields');
  }
  if (age < 0 || age > 120) {
    return sendErrorResponse(res, 400, 'Invalid age');
  }

  if (!isValidEmail(email)) {
    return sendErrorResponse(res, 400, 'Invalid email format');
  }

  if (!(Object.values(UserType) as string[]).includes(user_type)) {
    return sendErrorResponse(
      res,
      400,
      'Invalid user_type. User type must be Waza Warrior or Waza Trainer',
    );
  }
  if (!(Object.values(GenderType) as string[]).includes(gender)) {
    return sendErrorResponse(res, 400, 'Invalid Gender must be Male or Female');
  }

  if (!provider) {
    return sendErrorResponse(
      res,
      400,
      'Provider is required and cannot be null',
    );
  }

  if (typeof is_verified !== 'boolean') {
    return sendErrorResponse(
      res,
      400,
      'is_verified is required and cannot be null',
    );
  }

  // Check that password can only be null if provider is Google
  if (provider !== 'google' && !password) {
    return sendErrorResponse(
      res,
      400,
      'Password is required unless provider is Google',
    );
  }

  // If the provider is not Google, validate the password
  if (provider !== 'google' && password && !isValidPassword(password)) {
    return sendErrorResponse(
      res,
      400,
      'Invalid password format. Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character',
    );
  }
  if (password && !isValidPassword(password)) {
    return sendErrorResponse(
      res,
      400,
      'Invalid password format. Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character',
    );
  }

  const hashedPassword = password
    ? await bcrypt.hash(password, SALT_ROUNDS)
    : null;

  try {
    const existingUsername = await prisma.users.findMany({
      where: { username },
    });
    const existingEmail = await prisma.users.findMany({
      where: { email },
    });

    if (existingUsername.length) {
      return sendErrorResponse(res, 409, 'Username already exists');
    }
    if (existingEmail.length) {
      return sendErrorResponse(res, 409, 'Email already exists');
    }

    const newUser = await prisma.users.create({
      data: {
        username,
        email,
        password: hashedPassword,
        user_type,
        provider,
        name,
        age,
        gender,
        is_verified,
        profile_pic,
        date_joined,
        last_login,
        created_at,
        updated_at,
      },
    });

    const { password, ...safeUser } = newUser;
    return res.status(201).json(safeUser);
  } catch (error: unknown) {
    console.error('Error while creating user:', error);
    return sendErrorResponse(res, 500, 'Internal server error', error);
  }
}
