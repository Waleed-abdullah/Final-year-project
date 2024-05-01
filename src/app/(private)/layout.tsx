// app/(private)/layout.tsx
import { getServerSession } from 'next-auth';
import { SessionProvider } from './SessionProvider';
import type { ReactNode } from 'react';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { redirect } from 'next/navigation';
import { WarriorAndDateProvider } from './WarriorAndDateProvider';
import { LeaderBoardProvider } from '@/stores/leaderboard-store';

export default async function PrivateLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);
  console.log('Server session', session);
  if (!session) {
    redirect('signin');
  }

  return (
    <SessionProvider session={session}>
      <LeaderBoardProvider>
        <WarriorAndDateProvider>{children}</WarriorAndDateProvider>
      </LeaderBoardProvider>
    </SessionProvider>
  );
}
