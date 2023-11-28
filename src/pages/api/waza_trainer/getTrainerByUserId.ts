import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { sendErrorResponse } from '../../../utils/errorHandler';
import { isValidID } from '@/src/utils/validationHelpers';

export default async function getTrainerByUserId(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const user_id = String(req.query.user_id);

    // Validate id
    if (!isValidID(user_id)) {
      return sendErrorResponse(res, 400, 'invalid user_id');
    }

    // Check for existing Trainer
    const existingTrainer = await prisma.waza_trainers.findUnique({
      where: { user_id: user_id },
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

    if (!existingTrainer) {
      return sendErrorResponse(res, 404, 'Trainer not found');
    }

    // Return the existing Trainer
    return res.status(200).json(existingTrainer);
  } catch (e: unknown) {
    console.error('Error in getTrainer:', e);
    return sendErrorResponse(res, 500, 'Internal Server Error', e);
  }
}
