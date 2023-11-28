'use client';
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import styles from './signup.module.css';

interface SignUpData {
  username: string;
  email: string;
  password: string;
  user_type: string;
}

const SignUp = () => {
  const [formData, setFormData] = useState<SignUpData>({
    username: '',
    email: '',
    password: '',
    user_type: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would send a request to your API to create a new user
    console.log('Form Data Submitted', formData);
  };

  const handleSignUpWithGoogle = () => {
    signIn('google', { callbackUrl: '/' });
  };

  return (
    <div className={styles.signupContainer}>
      <h1>Create Account</h1>
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
          readOnly // This makes the field not editable
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
