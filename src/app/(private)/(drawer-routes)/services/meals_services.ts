import { MealsByType } from '@/src/types/page/waza_warrior/food_log';

export const fetchSavedMeals = async (warrior_id: string, date: Date) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/waza_warrior/food_log/getMealsByDate?warrior_id=${warrior_id}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: date,
        }),
      },
    );
    return await response.json();
  } catch (error) {
    console.error('Error fetching saved meals:', error);
  }
};

export const fetchNutrients = async (query: string) => {
  try {
    const nutrientResponse = await fetch(
      'https://trackapi.nutritionix.com/v2/natural/nutrients/',
      {
        method: 'POST',
        headers: {
          'x-app-id': `${process.env.NUTRITIONIX_APP_ID || 'ff9eb302'}`,
          'x-app-key': `${
            process.env.NUTRITIONIX_API_KEY ||
            '7d757979b4cc77735b029e29cbd7d5d4'
          }`,
          'x-remote-user-id': '0',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      },
    );
    const nutrients = await nutrientResponse.json();
    return nutrients;
  } catch (error) {
    console.error('Error fetching nutrients:', error);
  }
};

export const fetchSuggestions = async (query: string) => {
  try {
    const response = await fetch(
      `https://trackapi.nutritionix.com/v2/search/instant/?query=${query}`,
      {
        method: 'GET',
        headers: {
          'x-app-id': `${process.env.NUTRITIONIX_APP_ID || 'ff9eb302'}`,
          'x-app-key': `${
            process.env.NUTRITIONIX_API_KEY ||
            '7d757979b4cc77735b029e29cbd7d5d4	'
          }`,
          'x-remote-user-id': '0',
          'Content-Type': 'application/json',
        },
      },
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching suggestions:', error);
  }
};
