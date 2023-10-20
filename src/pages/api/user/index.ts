import type { NextApiRequest, NextApiResponse } from 'next';
import getUser from './getUser';
import createUser from './createUser';
import updateUser from './updateUser';
import deleteUser from './deleteUser';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case 'GET':
      return getUser(req, res);
    case 'POST':
      return createUser(req, res);
    case 'PATCH':
      return updateUser(req, res);
    case 'DELETE':
      return deleteUser(req, res);

    default:
      res.status(405).end(); // Method Not Allowed
      break;
  }
}
