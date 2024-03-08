import { NextApiRequest, NextApiResponse } from 'next';
import createExerciseLog from './createExerciseLog';
import updateExerciseLog from './updateExerciseLog';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case 'POST':
      return createExerciseLog(req, res);
    case 'PATCH':
      return updateExerciseLog(req, res);
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PATCH', 'DELETE']);
      res.status(405).end('Method Not Allowed');
      break;
  }
}
