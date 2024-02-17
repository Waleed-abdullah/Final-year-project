import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient | null;

// Function to create the Prisma client if it doesn't exist
export const getPrismaClient = () => {
  if (!prisma) {
    prisma = new PrismaClient();
  }
  return prisma;
};

export default getPrismaClient();
