import { sendErrorResponse } from '@/utils/errorHandler';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/database/prisma';

export default async function createSession(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { warrior_id, date } = req.body;

  // Validate request body
  if (!warrior_id || !date) {
    return sendErrorResponse(
      res,
      400,
      'Missing required fields: warrior_id and date',
    );
  }

  // Parse and validate date
  const sessionDate = new Date(date);
  if (isNaN(sessionDate.getTime())) {
    return sendErrorResponse(res, 400, 'Invalid date format');
  }

  try {
    // Check for existing session
    const existingSession = await prisma.session.findFirst({
      where: {
        warrior_id,
        scheduled_date: new Date(date),
      },
      include: {
        exercise: {
          include: {
            exercise_log: true,
          },
        },
      },
    });

    if (existingSession) {
      // If the session exists, return it with its exercises and logs
      return res.status(200).json(existingSession);
    } else {
      // If the session does not exist, create a new one
      const newSession = await prisma.session.create({
        data: {
          warrior_id,
          scheduled_date: sessionDate,
        },
      });

      // Format the response to include empty arrays for exercises and exercise_logs
      const formattedNewSession = {
        ...newSession,
        exercise: [],
      };

      return res.status(201).json(formattedNewSession);
    }
  } catch (error) {
    console.error('Error while handling session:', error);
    return sendErrorResponse(res, 500, 'Internal server error', error);
  }
}
