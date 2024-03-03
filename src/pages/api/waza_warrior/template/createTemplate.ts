import { sendErrorResponse } from '@/src/utils/errorHandler';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/database/prisma';

interface CreateTemplateRequest {
  session_id: string;
  title: string;
  description: string;
}

interface CreateTemplateResponse {
  template_id: string;
  title: string;
  description: string;
}

export default async function createTemplate(
  req: NextApiRequest,
  res: NextApiResponse<CreateTemplateResponse | string>,
) {
  const { session_id, title, description }: CreateTemplateRequest = req.body;

  // Validate request body
  if (!session_id || !title || !description) {
    return sendErrorResponse(
      res,
      400,
      'Missing required fields: session_id, title, and description',
    );
  }

  try {
    // Check if the provided session exists
    const session = await prisma.session.findUnique({
      where: { session_id },
      include: {
        exercise: true, // Include all exercises associated with the session
      },
    });

    if (!session) {
      return sendErrorResponse(res, 404, 'Session not found');
    }

    // Create a new template
    const newTemplate = await prisma.template.create({
      data: {
        warrior_id: session.warrior_id,
        title,
        description,
        template_exercise: {
          createMany: {
            data: session.exercise.map((exercise) => ({
              title: exercise.title || '',
              muscle_group: exercise.muscle_group || '',
              weight: exercise.weight || 0,
              sets: exercise.sets || 0,
              reps: exercise.reps || 0,
            })),
          },
        },
      },
      include: {
        template_exercise: true,
      },
    });

    // Return the newly created template
    const response: CreateTemplateResponse = {
      template_id: newTemplate.template_id,
      title: newTemplate.title,
      description: newTemplate.description,
    };

    res.status(201).json(newTemplate);
  } catch (error) {
    console.error('Error creating template:', error);
    return sendErrorResponse(res, 500, 'Internal server error', error);
  }
}
