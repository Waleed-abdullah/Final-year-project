'use client';
import { signIn } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Trainer() {
  const router = useRouter();
  const { user_id } = useParams<{ user_id: string }>() || { user_id: '' };
  const [warriorDetails, setWarriorDetails] = useState({
    user_id: user_id,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setWarriorDetails((prevDetails) => ({
      ...prevDetails,
      user_id: user_id,
    }));
  }, [user_id]);

  useEffect(() => {
    (async () => {
      const res = await fetch(
        `http://localhost:3000/api/waza_warrior?user_id=${user_id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (res.ok) {
        const data = await res.json();
        console.log('Warrior found:', data);
        router.push(`/dashboard`);
      }
    })();
  }, [user_id]);

  useEffect(() => {
    (async () => {
      const res = await fetch(`http://localhost:3000/api/user?id=${user_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) {
        console.log('User Not found:');
        router.push(`/complete-user`);
      }
    })();
  }, [user_id]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch(`http://localhost:3000/api/waza_warrior`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(warriorDetails),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong!');
      }
      console.log('Warrior created:', data);
      signIn(); // Use router.navigate for Next.js 13+
    } catch (err) {
      // If err is an instance of Error, use its message, otherwise use a default error message
      const errorMessage =
        err instanceof Error ? err.message : 'An unknown error occurred';
      console.error('Error creating warrior:', errorMessage);
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h1>Warrior</h1>
      <form onSubmit={handleSubmit}>
        <button type='submit'>Create Warrior Profile</button>
      </form>
      {isSubmitting && <p>Creating user...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </div>
  );
}
