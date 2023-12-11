'use client';
import React, { useState, useEffect } from 'react';
import { fetchTrainer } from '../services/trainerService';
import { useParams } from 'next/navigation';
import { DetailedTrainer } from '../types/';

const TrainerMarketplace: React.FC = () => {
  const [trainer, setTrainer] = useState<DetailedTrainer | null>(null);
  const [error, setError] = useState(null);
  const { user_id } = useParams<{ user_id: string }>() || { user_id: '' };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTrainer(user_id);
        console.log(data);
        setTrainer(data);
      } catch (error: any) {
        setError(error);
        console.log(error);
      }
    };

    fetchData();
  }, [user_id]); // user_id is now consistently a string

  return (
    <div>
      <h1>Trainer Details</h1>
      {error && <p>Error loading data: {error}</p>}
      {trainer ? (
        <div>
          {/* Render your trainer data here */}
          <p>Trainer Name: {trainer.users.name}</p>
          {/* Add more details as needed */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default TrainerMarketplace;
