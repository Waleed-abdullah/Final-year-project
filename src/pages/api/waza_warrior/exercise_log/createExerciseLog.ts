// pages/api/exercise-log/create.js

import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/database/prisma';
import { sendErrorResponse } from '@/utils/errorHandler';

export default async function createExerciseLog(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { exercise_id, weight, achieved_reps } = req.body;

  // Basic validation
  if (!exercise_id) {
    return sendErrorResponse(res, 400, 'Exercise ID is required');
  }
  if (!weight) {
    return sendErrorResponse(res, 400, 'Weight is required');
  }
  if (!achieved_reps) {
    return sendErrorResponse(res, 400, 'Achieved reps is required');
  }
  if (typeof weight !== 'number' && weight < 1) {
    return sendErrorResponse(res, 400, 'Weight must be a positive number');
  }
  if (typeof achieved_reps !== 'number' && achieved_reps < 1) {
    return sendErrorResponse(
      res,
      400,
      'Achieved reps must be a positive number',
    );
  }

  try {
    // Fetch the related exercise to check set limits
    const exercise = await prisma.exercise.findUnique({
      where: { exercise_id },
    });

    if (!exercise) {
      return sendErrorResponse(res, 404, 'Exercise not found');
    }

    const newExerciseLog = await prisma.exercise_log.create({
      data: {
        exercise_id,
        weight,
        achieved_reps,
      },
    });

    return res.status(201).json(newExerciseLog);
  } catch (error) {
    console.error('Error while creating exercise log:', error);
    return sendErrorResponse(res, 500, 'Internal server error', error);
  }
}
