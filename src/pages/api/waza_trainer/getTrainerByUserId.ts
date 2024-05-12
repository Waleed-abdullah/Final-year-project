import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/database/prisma';
import { sendErrorResponse } from '@/utils/errorHandler';
import { isValidID } from '@/utils/validationHelpers';

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
        hourly_rate: true,
        bio: true,
        location: true,
        experience: true,
        users: {
          select: {
            user_id: true,
            name: true,
            profile_pic: true,
            age: true,
            gender: true,
          },
        },
        trainer_specializations: {
          select: {
            specializations: {
              select: {
                specialization_name: true,
              },
            },
          },
        },
        trainer_certifications: {
          select: {
            certifications: {
              select: {
                certification_name: true,
              },
            },
          },
        },
        reviews: {
          select: {
            review_id: true,
            rating: true,
            comment: true,
            waza_warriors: {
              select: {
                users: {
                  select: {
                    name: true,
                    profile_pic: true,
                  },
                },
              },
            },
          },
        },
        availability: {
          select: {
            availability_id: true,
            start_time: true,
            end_time: true,
            weekday: true,
          },
        },
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
