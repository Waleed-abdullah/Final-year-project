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
      console.log(session);
      let route_type = '';
      if (!session.data) return;
      else if (session.data.user.user_type === 'Waza Trainer')
        route_type = 'waza_trainer';
      else if (session.data.user.user_type === 'Waza Warrior')
        route_type = 'waza_warrior';
      else return;
      const res = await fetch(
        `http://localhost:3000/api/${route_type}/?user_id=${session.data.user.user_id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (!res.ok) {
        const data = await res.json();
        console.log('User not found:', data);
        router.push(
          `/complete-user/${route_type}/${session.data.user.user_id}`,
        );
      }
    })();
  }, [session, router]);

  return <div>{/* Your main content goes here */}</div>;
}
