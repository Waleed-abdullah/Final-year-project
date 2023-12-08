'use client';
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import styles from './signup.module.css';
import { useRouter } from 'next/navigation';

interface SignUpData {
  username: string;
  email: string;
  password: string;
  user_type: string;
  provider: string;
  is_verified: boolean;
  profile_pic?: string;
}

const SignUp = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<SignUpData>({
    username: '',
    email: '',
    password: '',
    user_type: '',
    provider: 'credentials',
    is_verified: false,
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Something went wrong!');
      }

      const data = await res.json();
      router.push('/api/auth/signin');
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    }
  };

  const handleSignUpWithGoogle = () => {
    signIn('google', { callbackUrl: '/dashboard' });
  };

  return (
    <div className={styles.signupContainer}>
      <h1>Create Account</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit} className={styles.signupForm}>
        <input
          type='text'
          name='username'
          placeholder='Enter your username'
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type='email'
          name='email'
          placeholder='Enter your email'
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type='password'
          name='password'
          placeholder='Enter a secure password'
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type='text'
          name='user_type'
          value={formData.user_type}
          onChange={handleChange}
          placeholder='Enter your user type'
        />
        <button type='submit'>Sign Up</button>
      </form>
      <p>
        Already have an account? <a href='/login'>Log in</a>
      </p>
      <div className={styles.divider}>or</div>
      <button onClick={handleSignUpWithGoogle} className={styles.googleButton}>
        Sign up with Google
      </button>

      <form onSubmit={handleSubmit} className={styles.signupForm}></form>
    </div>
  );
};

export default SignUp;
