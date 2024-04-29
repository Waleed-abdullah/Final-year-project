import { TrainerFilters } from '@/app/warrior/trainer-marketplace/types';

export const fetchTrainer = async (id: string) => {
  try {
    const response = await fetch(`/api/waza_trainer?user_id=${id}`);
    console.log('response', response);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong!');
    }
    return data;
  } catch (error) {
    console.error('Error fetching trainer:', error);
    throw error;
  }
};

const fetchTrainers = async (
  page: number,
  filters: TrainerFilters,
  limit: number = 10,
) => {
  try {
    // Construct the query string with filters
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    for (const [key, value] of Object.entries(filters)) {
      if (value) {
        queryParams.append(key, value.toString());
      }
    }
    console.log('queryParams', queryParams.toString());

    const response = await fetch(`/api/waza_trainer?${queryParams.toString()}`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong!');
    }
    return data;
  } catch (error) {
    console.error('Error fetching trainers:', error);
    throw error;
  }
};

export { fetchTrainers };
