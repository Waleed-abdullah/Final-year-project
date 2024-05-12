import type { ReactNode } from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { redirect } from 'next/navigation';
import { UserType } from '@/types/page/auth/user';
import { ReactChildren } from '@/types/common';

const PrivateLayout: React.FC<ReactChildren> = async ({ children }) => {
  const session = await getServerSession(authOptions);
  const userType = session?.user?.user_type as UserType;

  console.log('Server session', session);
  if (!session || userType !== UserType.WazaTrainer) {
    return (
      <div className='flex h-full items-cetner justify-center text-red-500 text-5xl'>
        Unauthorized
      </div>
    );
  }

  return <>{children}</>;
};

export default PrivateLayout;
