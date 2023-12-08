'use client';
import { signIn } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Trainer() {
  const router = useRouter();
  const { user_id } = useParams<{ user_id: string }>() || { user_id: '' };
  const [trainerDetails, setTrainerDetails] = useState({
    user_id: user_id,
    hourly_rate: '',
    bio: '',
    location: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setTrainerDetails((prevDetails) => ({
      ...prevDetails,
      user_id: user_id,
    }));
  }, [user_id]);

  useEffect(() => {
    (async () => {
      const res = await fetch(
        `http://localhost:3000/api/waza_trainer?user_id=${user_id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (res.ok) {
        const data = await res.json();
        console.log('Trainer found:', data);
        router.push(`/dashboard`);
      }
    })();
  }, [user_id, router]);

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
  }, [user_id, router]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setTrainerDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Ensure hourly_rate is a number and convert it to a float
      const hourlyRate = parseFloat(trainerDetails.hourly_rate);
      if (isNaN(hourlyRate)) {
        throw new Error('Hourly rate must be a number');
      }

      const detailsToSend = {
        ...trainerDetails,
        hourly_rate: hourlyRate, // Use the parsed hourly rate
      };

      console.log('Trainer details:', detailsToSend);
      const response = await fetch(`http://localhost:3000/api/waza_trainer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(detailsToSend),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong!');
      }
      console.log('Trainer created:', data);
      signIn(); // Use router.navigate for Next.js 13+
    } catch (err) {
      // If err is an instance of Error, use its message, otherwise use a default error message
      const errorMessage =
        err instanceof Error ? err.message : 'An unknown error occurred';
      console.error('Error creating trainer:', errorMessage);
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h1>Trainer</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='number'
          name='hourly_rate'
          placeholder='Hourly Rate'
          value={trainerDetails.hourly_rate}
          onChange={handleInputChange}
        />
        <textarea
          name='bio'
          placeholder='Bio'
          value={trainerDetails.bio}
          onChange={handleInputChange}
        />
        <input
          type='text'
          name='location'
          placeholder='Location'
          value={trainerDetails.location}
          onChange={handleInputChange}
        />
        {/* You can add more inputs for other fields as needed */}
        <button type='submit'>Create Trainer Profile</button>
      </form>
      {isSubmitting && <p>Creating user...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </div>
  );
}
