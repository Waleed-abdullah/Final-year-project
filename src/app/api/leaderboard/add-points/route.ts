import { NextResponse } from 'next/server';
import prisma from '@/lib/database/prisma';

export const PATCH = async (request: Request) => {
  // get data from req.body
  const body = await request.json();

  const pointsToAdd = body.pointsToAdd;
  const warriorId = body.warriorId;

  if (!pointsToAdd || !warriorId) {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
  }

  // update the poitns of warrior in leaderboard table
  try {
    await prisma.leaderboard.upsert({
      where: {
        warrior_id: warriorId,
      },
      update: {
        points: {
          increment: pointsToAdd,
        },
      },
      create: {
        warrior_id: warriorId,
        points: pointsToAdd,
      },
    });

    return NextResponse.json({ message: 'Points added successfully' });
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
};
