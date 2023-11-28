import type { NextApiRequest, NextApiResponse } from 'next';
import getTrainer from './getTrainer';
import createTrainer from './createTrainer';
import updateTrainer from './updateTrainer';
import getTrainerByUserId from './getTrainerByUserId';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { user_id } = req.query;

  switch (req.method) {
    case 'GET':
      if (user_id) {
        return getTrainerByUserId(req, res);
      }
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
