'use client';
import React, { useState, useEffect } from 'react';
import TrainerCard from './TrainerCard';
import { fetchTrainers } from '../services/trainerService';
import { useTrainerFilter } from '../context/TrainerFilterContext';
import { Trainer } from '../../../../types/marketplace';

const TrainerList: React.FC = () => {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const { filters } = useTrainerFilter();

  useEffect(() => {
    setIsLoading(true);
    fetchTrainers(page, filters)
      .then((data) => {
        setTrainers(data.trainers);
        setHasMore(data.trainers.length > 0);
      })
      .catch((error) => {
        console.error('Failed to load trainers:', error);
        setHasMore(false);
      })
      .finally(() => setIsLoading(false));
  }, [page, filters]);

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    if (hasMore) setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className='flex p-4 grow'>
      {filters.specialization && filters.specialization.length && (
        <p className='font-bold text-lg'>{`${trainers.length} results for "${filters.specialization}"`}</p>
      )}
      <div className='mt-2 flex flex-col grow'>
        {trainers.map((trainer) => (
          <TrainerCard
            key={trainer.trainer_id}
            trainer_id={trainer.trainer_id}
            bio={trainer.bio}
            hourly_rate={trainer.hourly_rate}
            location={trainer.location}
            experience={trainer.experience}
            users={trainer.users}
            trainer_specializations={trainer.trainer_specializations}
          />
        ))}
        {isLoading && <p>Loading...</p>}
        <div className='flex justify-center space-x-4 mt-4'>
          <button onClick={handlePrevPage} disabled={page === 1}>
            Previous
          </button>
          <button onClick={handleNextPage} disabled={!hasMore}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrainerList;
