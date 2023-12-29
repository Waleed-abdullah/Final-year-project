'use client';
import { useSession } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function Dashboard() {
  const router = useRouter();
  const session = useSession();
  if (session.data && session.data.user.isNewUser) {
    redirect('/completeProfile');
  }
  useEffect(() => {
    (async () => {
      let apiRouteType: string = '';
      let pageRouteType: string;
      if (!session.data) return;
      else if (session.data.user.user_type === 'Waza Trainer') {
        apiRouteType = 'waza_trainer';
        pageRouteType = 'wazaTrainer';
      } else if (session.data.user.user_type === 'Waza Warrior') {
        apiRouteType = 'waza_warrior';
        pageRouteType = 'wazaWarrior';
      } else return;
      const res = await fetch(
        `http://localhost:3000/api/${apiRouteType}/?user_id=${session.data.user.user_id}`,
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
          `/completeProfile/${pageRouteType}/${session.data.user.user_id}`,
        );
      }
    })();
  }, [session, router]);

  return <div>{JSON.stringify(session)}</div>;
}
