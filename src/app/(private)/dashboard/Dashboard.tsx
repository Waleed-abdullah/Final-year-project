'use client';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export function Dashboard() {
  const session = useSession();
  if (session.data && session.data.user.isNewUser) {
    redirect('/complete-user');
  }

  return <div>{JSON.stringify(session)}</div>;
}
