import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { sendErrorResponse } from '@/src/utils/errorHandler';

type CreateWazaWarriorRequestBody = {
  user_id: string;
};

export default async function createWazaWarrior(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { user_id }: CreateWazaWarriorRequestBody = req.body;

    if (!user_id || typeof user_id !== 'string') {
      return sendErrorResponse(
        res,
        400,
        'user_id cannot be null or undefined and must be a string',
      );
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
    if (existingUser.user_type !== 'Waza Warrior') {
      return sendErrorResponse(res, 403, `User type must be "Waza Warrior"`);
    }
    console.log('existingUser', existingUser);

    const existingWazaWarrior = await prisma.waza_warriors.findMany({
      where: { user_id },
      select: {
        warrior_id: true,
      },
    });
    console.log('existingWazaWarrior', existingWazaWarrior);
    if (existingWazaWarrior.length) {
      return sendErrorResponse(res, 409, 'Waza Warrior already exists');
    }

    const newWazaWarrior = await prisma.waza_warriors.create({
      data: {
        user_id,
      },
    });

    return res.status(201).json(newWazaWarrior);
  } catch (e: unknown) {
    console.error('Error in createWazaWarrior:', e);

    if (e && typeof e === 'object' && 'code' in e) {
      switch ((e as any).code) {
        case 'P2023':
          return sendErrorResponse(res, 406, 'Invalid User Id format');
        default:
          return sendErrorResponse(res, 500, 'Internal Server Error', e);
      }
    }

    sendErrorResponse(res, 500, 'Internal Server Error', e);
  }
}
