// getTemplatesByWarriorId.ts

import { sendErrorResponse } from '@/utils/errorHandler';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/database/prisma';

export default async function getTemplatesByWarriorId(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { warrior_id } = req.query as { warrior_id: string };

  // Validate warrior_id
  if (!warrior_id) {
    return sendErrorResponse(res, 400, 'Missing required field: warrior_id');
  }

  try {
    // Find all templates belonging to the specified warrior
    const templates = await prisma.template.findMany({
      where: { warrior_id },
    });

    res.status(200).json(templates);
  } catch (error) {
    console.error('Error fetching templates by warrior ID:', error);
    return sendErrorResponse(res, 500, 'Internal server error', error);
  }
}
