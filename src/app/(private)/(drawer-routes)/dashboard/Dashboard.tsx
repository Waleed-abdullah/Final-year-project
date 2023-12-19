'use client';
import { useSession } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function Dashboard() {
  const router = useRouter();
  const session = useSession();
  if (session.data && session.data.user.isNewUser) {
    redirect('/complete-user');
  }
  useEffect(() => {
    (async () => {
      if (!session.data) return;
      else if (session.data.user.user_type === 'Waza Trainer')
        router.push(`/api/auth/signin`);
      // Create a proper work flow

      const res = await fetch(
        `http://localhost:3000/api/waza_warrior/?user_id=${session.data.user.user_id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        console.log('User not found:', data);
        router.push(`/complete-user/waza_warrior/${session.data.user.user_id}`);
      }
    })();
  }, [session, router]);

  return <div>{/* Your main content goes here */}</div>;
}
