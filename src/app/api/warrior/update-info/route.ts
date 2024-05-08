import { NextResponse } from 'next/server';
import prisma from '@/lib/database/prisma';

export const PATCH = async (request: Request) => {
  // get data from req.body
  const body = await request.json();

  const profilePic = body.profilePic;
  const warriorId = body.warriorId;
  const weightGoal = body.weightGoal;
  const caloricGoal = body.caloricGoal;
  const userId = body.userId;

  console.log(body);

  if (!warriorId || !userId) {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
  }

  if (weightGoal) {
    //update weigth of warrior
    try {
      await prisma.waza_warriors.update({
        where: { warrior_id: warriorId },
        data: {
          weight_goal: parseFloat(weightGoal),
        },
      });
    } catch (e) {
      return NextResponse.json({ error: e }, { status: 500 });
    }
  }

  if (caloricGoal) {
    //update caloric goal of warrior
    try {
      await prisma.waza_warriors.update({
        where: { warrior_id: warriorId },
        data: {
          caloric_goal: parseInt(caloricGoal),
        },
      });
    } catch (e) {
      return NextResponse.json({ error: e }, { status: 500 });
    }
  }

  if (profilePic) {
    //update profile pic of user
    try {
      await prisma.users.update({
        where: { user_id: userId },
        data: {
          profile_pic: profilePic,
        },
      });
    } catch (e) {
      return NextResponse.json({ error: e }, { status: 500 });
    }
  }

  return NextResponse.json({ message: 'Data updated successfully' });
};
