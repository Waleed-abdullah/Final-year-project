import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { sendErrorResponse } from '../../../utils/errorHandler';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';
import { isValidID } from '@/src/utils/validationHelpers';

type CreateMasterRequestBody = {
  user_id: string;
  hourly_rate?: number;
  bio?: string;
  location?: string;
};

export default async function createMaster(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { user_id, hourly_rate, bio, location }: CreateMasterRequestBody =
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
    if (existingUser.user_type !== 'Waza Master') {
      return sendErrorResponse(res, 403, `User type must be "Waza Master"`);
    }

    const existingMaster = await prisma.waza_masters.findMany({
      where: { user_id },
      select: {
        master_id: true,
      },
    });

    if (existingMaster.length) {
      return sendErrorResponse(res, 409, 'Master already exists');
    }

    const newMaster = await prisma.waza_masters.create({
      data: {
        user_id,
        hourly_rate,
        bio,
        location,
      },
    });

    return res.status(201).json(newMaster);
  } catch (e: unknown) {
    console.error('Error in createMaster:', e);
    sendErrorResponse(res, 500, 'Internal Server Error', e);
  }
}
