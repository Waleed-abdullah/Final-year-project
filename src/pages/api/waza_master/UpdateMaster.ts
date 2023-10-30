import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { sendErrorResponse } from '../../../utils/errorHandler';
import { isValidID } from '@/src/utils/validationHelpers';

type UpdateMasterData = {
  hourly_rate?: number;
  bio?: string;
  location?: string;
};

export default async function updateMaster(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const id = String(req.query.id);
  const reqBody: Partial<UpdateMasterData> = req.body;

  if (!isValidID(id)) {
    return sendErrorResponse(res, 400, 'valid id is required for updating');
  }
  const updateData: UpdateMasterData = {};

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
    const updatedMaster = await prisma.waza_masters.update({
      where: { master_id: id },
      data: updateData,
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

    return res.status(200).json(updatedMaster);
  } catch (error: unknown) {
    console.error('Error while updating master:', error);
    return sendErrorResponse(res, 500, 'Internal server error', error);
  }
}
