// updateSessionFromTemplate.ts

import { sendErrorResponse } from '@/utils/errorHandler';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/database/prisma';

export default async function updateSessionFromTemplate(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { session_id = '' }: { session_id?: string } = req.query;
  const { template_id }: { template_id: string } = req.body;

  if (!session_id) {
    return sendErrorResponse(res, 400, 'Missing required field: session_id');
  }
  // Validate request body
  if (!template_id) {
    return sendErrorResponse(res, 400, 'Missing required field: template_id');
  }

  try {
    // Find the template with exercises
    const template = await prisma.template.findUnique({
      where: { template_id },
      include: { template_exercise: true },
    });

    if (!template) {
      return sendErrorResponse(res, 404, 'Template not found');
    }

    // Start a Prisma transaction to ensure atomicity
    const session = await prisma.$transaction([
      // Delete existing exercises for the session
      prisma.exercise.deleteMany({
        where: { session_id: { equals: session_id } },
      }),
      // Add new exercises based on the template
      ...template.template_exercise.map((exercise) =>
        prisma.exercise.create({
          data: {
            session_id: session_id,
            title: exercise.title,
            muscle_group: exercise.muscle_group,
            weight: exercise.weight,
            sets: exercise.sets,
            reps: exercise.reps,
          },
        }),
      ),
    ]);
    const updatedSession = await prisma.session.findUnique({
      where: { session_id },
      include: {
        exercise: {
          include: {
            exercise_log: true,
          },
        },
      },
    });
    res.status(200).json(updatedSession);
  } catch (error) {
    console.error('Error updating session from template:', error);
    return sendErrorResponse(res, 500, 'Internal server error', error);
  }
}
