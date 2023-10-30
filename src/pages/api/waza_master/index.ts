import type { NextApiRequest, NextApiResponse } from 'next';
import getMaster from './GetMaster';
import createMaster from './CreateMaster';
import updateMaster from './UpdateMaster';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case 'GET':
      return getMaster(req, res);
    case 'POST':
      return createMaster(req, res);
    case 'PATCH':
      return updateMaster(req, res);
    // case 'DELETE':
    //   return deleteUser(req, res);

    default:
      res.status(405).end(); // Method Not Allowed
      break;
  }
}
