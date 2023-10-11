import { error } from "console";
import { NextApiResponse } from "next";

export const sendErrorResponse = (
  res: NextApiResponse,
  statusCode: number,
  message: string,
  error?: any
) => {
  res.status(statusCode).json({ message, error });
};
