import type { NextApiRequest, NextApiResponse } from 'next';
import createWazaWarrior from './createWazaWarrior';
import getWazaWarrior from './getWazaWrrior';
import deleteWazaWarrior from './deleteWazaWarrior';
import getWarriorByUserId from './getWarriorByUserId';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { user_id } = req.query;
  switch (req.method) {
    case 'GET':
      if (user_id) {
        return getWarriorByUserId(req, res);
      }
      return getWazaWarrior(req, res);
    case 'POST':
      return createWazaWarrior(req, res);
    // case 'PATCH':
    //   return updateUser(req, res);
    case 'DELETE':
      return deleteWazaWarrior(req, res);

    default:
      res.status(405).end(); // Method Not Allowed
      break;
  }
}
