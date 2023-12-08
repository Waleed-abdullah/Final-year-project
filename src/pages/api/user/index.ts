import type { NextApiRequest, NextApiResponse } from 'next';
import getUser from './getUser';
import createUser from './createUser';
import updateUser from './updateUser';
import deleteUser from './deleteUser';
import getUserByEmail from './getUserByEmail';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Check if the "email" query parameter is used
  const { email } = req.query;

  switch (req.method) {
    case 'GET':
      // If there is an "email" query, use the getUserByEmail function
      if (email) {
        return getUserByEmail(req, res);
      }
      // Otherwise, use the default getUser function
      return getUser(req, res);
    case 'POST':
      return createUser(req, res);
    case 'PATCH':
      return updateUser(req, res);
    case 'DELETE':
      return deleteUser(req, res);
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PATCH', 'DELETE']);
      res.status(405).end('Method Not Allowed');
      break;
  }
}
