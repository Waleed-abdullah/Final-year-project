'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function CompleteUserPage() {
  const router = useRouter();
  const { data: sessionData, status } = useSession();
  const [userDetails, setUserDetails] = useState({
    username: '',
    user_type: '',
    email: sessionData?.user.email || '',
    profile_pic: sessionData?.user.image || '',
    is_verified: sessionData?.user.is_verified || false,
    provider: sessionData?.user.provider || '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Update userDetails with session data when it's loaded
  useEffect(() => {
    if (status === 'authenticated') {
      setUserDetails((prevDetails) => ({
        ...prevDetails,
        email: sessionData.user.email || '',
        profile_pic: sessionData.user.image || '',
        is_verified: sessionData.user.is_verified || false,
        provider: sessionData.user.provider || '',
      }));
    }
  }, [sessionData, status]);

  useEffect(() => {
    (async () => {
      const res = await fetch(
        `http://localhost:3000/api/user?email=${sessionData?.user.email}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (res.ok) {
        const data = await res.json();
        console.log('User found:', data);
        if (data.user_type === 'Waza Trainer') {
          router.push(`/complete-user/waza_trainer/${data.user_id}`);
        } else if (data.user_type === 'Waza Warrior') {
          router.push(`/complete-user/waza_warrior/${data.user_id}`);
        }
      }
    })();
  }, [sessionData, router]);

  // Handle input changes for each field
  const handleInputChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      console.log('User details:', userDetails);
      const response = await fetch(`http://localhost:3000/api/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userDetails),
      });

      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong!');
      }
      console.log('User created:', data);
      if (data.user_type === 'Waza Warrior')
        router.push(`complete-user/waza_warrior/${data.user_id}`);
      else if (data.user_type === 'Waza Trainer')
        router.push(`complete-user/waza_trainer/${data.user_id}`);
    } catch (err: any) {
      console.error('Error creating user:', err);
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div>
      <h1>Complete User Page</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='username'
          placeholder='Username'
          value={userDetails.username}
          onChange={handleInputChange}
        />
        <input
          type='text'
          name='user_type'
          placeholder='User Type'
          value={userDetails.user_type}
          onChange={handleInputChange}
        />
        <button type='submit'>Submit</button>
      </form>
      {isSubmitting && <p>Creating user...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </div>
  );
}
