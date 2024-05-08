// pages/api/getMeals.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/database/prisma';
import { isValidID } from '@/utils/validationHelpers';
import { sendErrorResponse } from '@/utils/errorHandler';
import { Meal, MealsByType } from '@/types/page/waza_warrior/food_log';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    try {
      const { warrior_id } = req.query;
      const { date }: { date: Date } = req.body; // Expecting date in 'YYYY-MM-DD' format

      if (!isValidID(warrior_id as string)) {
        return sendErrorResponse(res, 400, 'Invalid warrior ID.');
      }
      if (!date) {
        return sendErrorResponse(res, 400, 'Date is required.');
      }
      const meals = await prisma.meals.findMany({
        where: {
          warrior_id: warrior_id as string,
          meal_date: new Date(date),
        },
        include: {
          meal_food_items: true,
          meal_types: true,
        },
      });
      const mealsByType: MealsByType = meals.reduce((acc: any, meal: any) => {
        const mealTypeName = meal.meal_types.name;
        acc[mealTypeName as 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack'] = meal;
        return acc;
      }, {} as MealsByType);

      res.status(200).json(mealsByType);
    } catch (error) {
      console.error('Error fetching meals:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
