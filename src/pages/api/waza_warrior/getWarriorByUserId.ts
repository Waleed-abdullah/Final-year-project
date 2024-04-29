import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/database/prisma';
import { sendErrorResponse } from '../../../utils/errorHandler';
import { isValidID } from '@/utils/validationHelpers';
import { Warrior } from '@/types/app/(private)/(drawer-routes)/dashboard';

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
    const existingWarrior: Warrior | null =
      await prisma.waza_warriors.findUnique({
        where: { user_id: user_id },
        select: {
          warrior_id: true,
          caloric_goal: true,
          users: {
            select: {
              email: true,
              name: true,
              profile_pic: true,
              username: true,
              age: true,
              gender: true,
            },
          },
        },
      });
    if (!existingWarrior) {
      return sendErrorResponse(res, 404, 'Warrior not found');
    }

    // Return the existing Warrior
    return res.status(200).json(existingWarrior);
  } catch (e: unknown) {
    console.error('Error in getTrainer:', e);
    return sendErrorResponse(res, 500, 'Internal Server Error', e);
  }
}
