import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib//database/prisma';
import { sendErrorResponse } from '@/utils/errorHandler';

export default async function updateExerciseLog(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const log_id = req.query.log_id as string;

  const { weight, achieved_reps } = req.body;

  // Validation for log_id
  if (!log_id) {
    return sendErrorResponse(res, 400, 'Log ID is required');
  }

  // Preparing update object
  const updateData: { weight?: number; achieved_reps?: number } = {};
  if (weight !== undefined) {
    if (typeof weight !== 'number' || weight < 1) {
      return sendErrorResponse(res, 400, 'Weight must be a positive number');
    }
    updateData.weight = weight;
  }
  if (achieved_reps !== undefined) {
    if (typeof achieved_reps !== 'number' || achieved_reps < 1) {
      return sendErrorResponse(
        res,
        400,
        'Achieved reps must be a positive number',
      );
    }
    updateData.achieved_reps = achieved_reps;
  }

  try {
    const updatedExerciseLog = await prisma.exercise_log.update({
      where: { log_id: log_id },
      data: updateData,
    });

    return res.json(updatedExerciseLog);
  } catch (error) {
    console.error('Error while updating exercise log:', error);
    return sendErrorResponse(res, 500, 'Internal server error', error);
  }
}
