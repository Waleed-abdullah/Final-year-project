import React, { createContext, useContext, useState } from 'react';
import { TrainerFilters } from '../types';

const TrainerFilterContext = createContext<{
  filters: TrainerFilters;
  setFilters: React.Dispatch<React.SetStateAction<TrainerFilters>>;
}>({
  filters: {},
  setFilters: () => {},
});

export const TrainerFilterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [filters, setFilters] = useState<TrainerFilters>({});

  return (
    <TrainerFilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </TrainerFilterContext.Provider>
  );
};

export const useTrainerFilter = () => {
  const context = useContext(TrainerFilterContext);
  if (!context) {
    throw new Error(
      'useTrainerFilter must be used within a TrainerFilterProvider',
    );
  }
  return context;
};
