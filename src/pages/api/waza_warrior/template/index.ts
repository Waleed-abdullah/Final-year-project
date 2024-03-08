// index.ts

import { NextApiRequest, NextApiResponse } from 'next';
import createTemplate from './createTemplate';
import getTemplatesByWarriorId from './getTemplates';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case 'GET':
      return getTemplatesByWarriorId(req, res);
    case 'POST':
      return createTemplate(req, res);

    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end('Method Not Allowed');
      break;
  }
}
