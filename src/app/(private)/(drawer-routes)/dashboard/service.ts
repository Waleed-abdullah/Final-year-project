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

export const fetchNutrients = async (meals: MealsByType) => {
  try {
    const allFoodItems = Object.values(meals).flatMap((mealType) =>
      mealType.flatMap((meal) => meal.meal_food_items),
    );

    const query: string = allFoodItems
      .map(
        (item) => `${item.quantity} ${item.unit} ${item.food_item_identifier}`,
      )
      .join(', ');

    if (!query.length) return;

    const nutrientResponse = await fetch(
      'https://trackapi.nutritionix.com/v2/natural/nutrients/',
      {
        method: 'POST',
        headers: {
          'x-app-id': `${process.env.NUTRITIONIX_APP_ID}`,
          'x-app-key': `${process.env.NUTRITIONIX_API_KEY}`,
          'x-remote-user-id': '0',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      },
    );
    const nutrients = await nutrientResponse.json();
    console.log('nutrients:', nutrients);
    return nutrients;
  } catch (error) {
    console.error('Error fetching nutrients:', error);
  }
};
