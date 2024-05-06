// pages/api/exercise/create.ts

import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/database/prisma';
import { sendErrorResponse } from '@/utils/errorHandler';
import { ExerciseRequestBody } from '@/types/page/waza_warrior/exercise';
import { VALID_MUSCLE_GROUPS } from '@/constants/exercises';

export default async function createExercise(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const {
    title,
    muscle_group,
    weight,
    sets,
    reps,
    session_id,
  }: ExerciseRequestBody = req.body;

  // Validate request body
  if (
    !title ||
    !muscle_group ||
    weight === undefined ||
    sets === undefined ||
    reps === undefined ||
    !session_id
  ) {
    return sendErrorResponse(res, 400, 'All fields are required.');
  }

  // Additional data type validations
  if (
    typeof title !== 'string' ||
    typeof muscle_group !== 'string' ||
    !Number.isInteger(weight) ||
    !Number.isInteger(sets) ||
    !Number.isInteger(reps) ||
    typeof session_id !== 'string'
  ) {
    return sendErrorResponse(res, 400, 'Invalid data types in request body.');
  }

  if (!VALID_MUSCLE_GROUPS.includes(muscle_group)) {
    return sendErrorResponse(
      res,
      400,
      `Invalid muscle group. Must be one of: ${VALID_MUSCLE_GROUPS.join(', ')}`,
    );
  }

  try {
    // Create exercise in the database
    const newExercise = await prisma.exercise.create({
      data: {
        title,
        muscle_group,
        weight,
        sets,
        reps,
        session: {
          connect: { session_id },
        },
      },
    });

    const modifiedExercise = { ...newExercise, exercise_log: [] };

    return res.status(201).json(modifiedExercise);
  } catch (error) {
    console.error('Error while creating exercise:', error);
    return sendErrorResponse(res, 500, 'Internal server error', error);
  }
}
