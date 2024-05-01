import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/database/prisma';
import { sendErrorResponse } from '@/utils/errorHandler';

export default async function deleteWazaWarrior(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const id = req.query.id;

    if (!id || typeof id !== 'string') {
      return sendErrorResponse(
        res,
        400,
        'id cannot be null or undefined and must be a string',
      );
    }

    // Check for existing Waza Warrior
    const existingWazaWarrior = await prisma.waza_warriors.findUnique({
      where: { warrior_id: id },
    });

    if (!existingWazaWarrior) {
      return sendErrorResponse(res, 404, 'Waza Warrior not found');
    }

    // Delete the existing Waza Warrior
    const deletedWazaWarrior = await prisma.waza_warriors.delete({
      where: { warrior_id: id },
    });

    return res.status(200).json({
      message: 'Waza Warrior successfully deleted',
      deletedWazaWarrior,
    });
  } catch (e: unknown) {
    console.error('Error in deleteWazaWarrior:', e);

    if (e && typeof e === 'object' && 'code' in e) {
      switch ((e as any).code) {
        case 'P2023':
          return sendErrorResponse(res, 406, 'Invalid warrior Id format');
        default:
          return sendErrorResponse(res, 500, 'Internal Server Error', e);
      }
    }

    return sendErrorResponse(res, 500, 'Internal Server Error', e);
  }
}
