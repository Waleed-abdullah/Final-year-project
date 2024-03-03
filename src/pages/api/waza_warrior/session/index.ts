import { NextApiRequest, NextApiResponse } from 'next';
import createSession from './createSession';
import updateSessionFromTemplate from './updateSession';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case 'PATCH':
      return updateSessionFromTemplate(req, res);
    case 'POST':
      return createSession(req, res);
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PATCH', 'DELETE']);
      res.status(405).end('Method Not Allowed');
      break;
  }
}
