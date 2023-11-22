import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { sendErrorResponse } from '../../../utils/errorHandler';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';
import { isValidID } from '@/src/utils/validationHelpers';

type CreateTrainerRequestBody = {
  user_id: string;
  hourly_rate?: number;
  bio?: string;
  location?: string;
};

export default async function createTrainer(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { user_id, hourly_rate, bio, location }: CreateTrainerRequestBody =
      req.body;

    if (!isValidID(user_id)) {
      return sendErrorResponse(res, 400, 'invalid user_id');
    }
    if (hourly_rate && typeof hourly_rate !== 'number') {
      return sendErrorResponse(res, 400, 'hourly_rate must be a number');
    }
    if (bio && typeof bio !== 'string') {
      return sendErrorResponse(res, 400, 'bio must be a string');
    }
    if (location && typeof location !== 'string') {
      return sendErrorResponse(res, 400, 'location must be a string');
    }

    const existingUser = await prisma.users.findUnique({
      where: { user_id },
      select: {
        user_id: true,
        user_type: true,
      },
    });

    if (!existingUser) {
      return sendErrorResponse(res, 404, 'User not found');
    }
    if (existingUser.user_type !== 'Waza Trainer') {
      return sendErrorResponse(res, 403, `User type must be "Waza Trainer"`);
    }

    const existingTrainer = await prisma.waza_trainers.findMany({
      where: { user_id },
      select: {
        trainer_id: true,
      },
    });

    if (existingTrainer.length) {
      return sendErrorResponse(res, 409, 'Trainer already exists');
    }

    const newTrainer = await prisma.waza_trainers.create({
      data: {
        user_id,
        hourly_rate,
        bio,
        location,
      },
    });

    return res.status(201).json(newTrainer);
  } catch (e: unknown) {
    console.error('Error in createTrainer:', e);
    sendErrorResponse(res, 500, 'Internal Server Error', e);
  }
}
