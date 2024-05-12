import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { FC } from 'react';
import prisma from '@/lib/database/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';

const page: FC = async () => {
  return <div className='text-center'>Click to open a chat</div>;
};

export default page;
