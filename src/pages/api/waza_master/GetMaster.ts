import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { sendErrorResponse } from '../../../utils/errorHandler';
import { isValidID } from '@/src/utils/validationHelpers';

export default async function getMaster(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const id = String(req.query.id);

    // Validate id
    if (!isValidID(id)) {
      return sendErrorResponse(res, 400, 'invalid id');
    }

    // Check for existing master
    const existingMaster = await prisma.waza_masters.findUnique({
      where: { master_id: id },
      select: {
        master_id: true,
        user_id: true,
        hourly_rate: true,
        bio: true,
        location: true,
        availability: true,
        exercise: true,
        mastercertifications: true,
        masterspecializations: true,
        reviews: true,
        session: true,
      },
    });

    if (!existingMaster) {
      return sendErrorResponse(res, 404, 'Master not found');
    }

    // Return the existing master
    return res.status(200).json(existingMaster);
  } catch (e: unknown) {
    console.error('Error in getMaster:', e);
    return sendErrorResponse(res, 500, 'Internal Server Error', e);
  }
}
