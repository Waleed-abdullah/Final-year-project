import type { NextApiRequest, NextApiResponse } from 'next';
import getTrainer from './GetTrainer';
import createTrainer from './CreateTrainer';
import updateTrainer from './UpdateTrainer';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case 'GET':
      return getTrainer(req, res);
    case 'POST':
      return createTrainer(req, res);
    case 'PATCH':
      return updateTrainer(req, res);
    // case 'DELETE':
    //   return deleteUser(req, res);

    default:
      res.status(405).end(); // Method Not Allowed
      break;
  }
}
