import { MealsByType } from '@/src/types/page/waza_warrior/food_log';

export const fetchSavedMeals = async (warrior_id: string, date: Date) => {
  console.log('Called fetchSavedMeals');
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
  console.log('Called fetchNutrients');
  try {
    const nutrientResponse = await fetch(
      'https://trackapi.nutritionix.com/v2/natural/nutrients/',
      {
        method: 'POST',
        headers: {
          'x-app-id': `${process.env.NUTRITIONIX_APP_ID || 'afc14df9'}`,
          'x-app-key': `${
            process.env.NUTRITIONIX_API_KEY ||
            '9b4c341882cf7021cee2e2cc4b79ba2d'
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
  console.log('Called fetchSuggestions');
  try {
    const response = await fetch(
      `https://trackapi.nutritionix.com/v2/search/instant/?query=${query}`,
      {
        method: 'GET',
        headers: {
          'x-app-id': `${process.env.NUTRITIONIX_APP_ID}`,
          'x-app-key': `${process.env.NUTRITIONIX_API_KEY}`,
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
