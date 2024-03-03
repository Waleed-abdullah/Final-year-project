import { NextApiRequest, NextApiResponse } from 'next';
import createSession from './createSession';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case 'POST':
      return createSession(req, res);
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PATCH', 'DELETE']);
      res.status(405).end('Method Not Allowed');
      break;
  }
}
