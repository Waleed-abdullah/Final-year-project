<<<<<<< HEAD
import { error } from "console";
import { NextApiResponse } from "next";
=======
import { error } from 'console';
import { NextApiResponse } from 'next';
>>>>>>> 89785d4a7be99902214a44d441545388b1c31235

export const sendErrorResponse = (
  res: NextApiResponse,
  statusCode: number,
  message: string,
<<<<<<< HEAD
  error?: any
=======
  error?: any,
>>>>>>> 89785d4a7be99902214a44d441545388b1c31235
) => {
  res.status(statusCode).json({ message, error });
};
