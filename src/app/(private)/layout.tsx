// app/(private)/layout.tsx
import { getServerSession } from 'next-auth';
import { SessionProvider } from './SessionProvider';
import type { ReactNode } from 'react';
import { authOptions } from '@/src/pages/api/auth/[...nextauth]';
import { redirect } from 'next/navigation';

export default async function PrivateLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);
  // if (!session) {
  //   redirect('/api/auth/signin');
  // }

  return <SessionProvider session={session}>{children}</SessionProvider>;
}
