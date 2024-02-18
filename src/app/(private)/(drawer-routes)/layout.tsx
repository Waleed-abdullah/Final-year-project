import type { ReactNode } from 'react';
import { DrawerLayout } from './DrawerLayout';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { UserType } from '@/src/types/page/auth/user';
import { authOptions } from '@/src/pages/api/auth/[...nextauth]';

export default async function PrivateLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('signin');
  }
  if (!session?.user.user_id || !session?.user.user_type) {
    redirect('completeProfile');
  }
  if (session.user.isNewUser) {
    if (session.user.user_type === UserType.WazaWarrior) {
      redirect('completeProfile/wazaWarrior');
    } else {
      redirect('completeProfile/wazaTrainer');
    }
  }

  return <DrawerLayout>{children}</DrawerLayout>;
}
