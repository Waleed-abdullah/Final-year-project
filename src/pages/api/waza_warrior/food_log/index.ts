// pages/api/addMeal.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, Prisma } from '@prisma/client';
import { isValidID } from '@/src/utils/validationHelpers';
import prisma from '@/src/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const {
    warriorId,
    mealType,
    mealDate,
    foodItems,
  }: {
    warriorId: string;
    mealType: string;
    mealDate: Date;
    foodItems: Prisma.meal_food_itemsCreateInput[];
  } = req.body;

  if (!warriorId || !isValidID(warriorId)) {
    return res.status(400).json({ message: 'Invalid warrior ID.' });
  }
  if (!mealType || !isValidID(mealType)) {
    return res.status(400).json({ message: 'Invalid meal type.' });
  }
  if (!mealDate) {
    return res.status(400).json({ message: 'Meal date is required.' });
  }
  if (!foodItems || foodItems.length === 0) {
    return res
      .status(400)
      .json({ message: 'Meal must have at least one food item.' });
  }

  try {
    await prisma.$transaction(async (prismaTransaction) => {
      const newMeal = await prismaTransaction.meals.create({
        data: {
          warrior_id: warriorId,
          meal_type_id: mealType,
          meal_date: new Date(mealDate),
        },
      });

      await Promise.all(
        foodItems.map((foodItem) =>
          prismaTransaction.meal_food_items.create({
            data: {
              meal_id: newMeal.meal_id,
              food_item_identifier: foodItem.food_item_identifier,
              quantity: foodItem.quantity,
              unit: foodItem.unit,
            },
          }),
        ),
      );
    });

    res.status(200).json({ message: 'Meal added successfully' });
  } catch (error) {
    console.error('Error in transaction:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
