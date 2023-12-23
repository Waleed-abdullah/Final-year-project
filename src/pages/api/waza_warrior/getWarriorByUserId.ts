import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { sendErrorResponse } from '../../../utils/errorHandler';
import { isValidID } from '@/src/utils/validationHelpers';

export default async function getWarriorByUserId(
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
    const existingWarrior = await prisma.waza_warriors.findUnique({
      where: { user_id: user_id },
      select: {
        users: {
          select: {
            email: true,
            name: true,
            profile_pic: true,
            username: true,
          },
        },
        meals: {
          select: {
            meal_date: true,
            meal_food_items: {
              select: {
                food_item_identifier: true,
                quantity: true,
                unit: true,
              },
            },
            meal_types: {
              select: {
                name: true,
              },
            },
          },
          where: {
            meal_date: {
              gte: new Date(new Date().setDate(new Date().getDate())),
            },
          },
        },
      },
    });
    if (!existingWarrior) {
      return sendErrorResponse(res, 404, 'Warrior not found');
    }

    // Return the existing Trainer
    return res.status(200).json(existingWarrior);
  } catch (e: unknown) {
    console.error('Error in getTrainer:', e);
    return sendErrorResponse(res, 500, 'Internal Server Error', e);
  }
}
