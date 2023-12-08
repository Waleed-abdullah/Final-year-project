import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { sendErrorResponse } from '../../../utils/errorHandler';
import { isValidID } from '@/src/utils/validationHelpers';

type UpdateTrainerData = {
  hourly_rate?: number;
  bio?: string;
  location?: string;
};

export default async function updateTrainer(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const id = String(req.query.id);
  const reqBody: Partial<UpdateTrainerData> = req.body;

  if (!isValidID(id)) {
    return sendErrorResponse(res, 400, 'valid id is required for updating');
  }
  const updateData: UpdateTrainerData = {};

  if (reqBody.hourly_rate !== undefined) {
    if (typeof reqBody.hourly_rate !== 'number') {
      return sendErrorResponse(res, 400, 'hourly_rate must be a number');
    }
    updateData.hourly_rate = reqBody.hourly_rate;
  }

  if (reqBody.bio !== undefined) {
    if (typeof reqBody.bio !== 'string') {
      return sendErrorResponse(res, 400, 'bio must be a string');
    }
    updateData.bio = reqBody.bio;
  }

  if (reqBody.location !== undefined) {
    if (typeof reqBody.location !== 'string') {
      return sendErrorResponse(res, 400, 'location must be a string');
    }
    updateData.location = reqBody.location;
  }
  if (Object.keys(updateData).length <= 0) {
    return sendErrorResponse(
      res,
      400,
      'At least one field is required for updating',
    );
  }

  try {
    const updatedTrainer = await prisma.waza_trainers.update({
      where: { trainer_id: id },
      data: updateData,
      select: {
        trainer_id: true,
        user_id: true,
        hourly_rate: true,
        bio: true,
        location: true,
        availability: true,
        exercise: true,
        trainer_certifications: true,
        trainer_specializations: true,
        reviews: true,
        session: true,
      },
    });

    return res.status(200).json(updatedTrainer);
  } catch (error: unknown) {
    console.error('Error while updating Trainer:', error);
    return sendErrorResponse(res, 500, 'Internal server error', error);
  }
}
