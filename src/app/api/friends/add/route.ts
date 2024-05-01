import { NextResponse } from 'next/server';
import prisma from '@/lib/database/prisma';

export const POST = async (request: Request) => {
  //get request from the body
  const body = await request.json();
  const userId = body.userId;
  const friendId = body.friendId;

  if (!userId || !friendId) {
    return NextResponse.error();
  }

  // get the warrior id from userID
  const warrior = await prisma.waza_warriors.findUnique({
    where: {
      user_id: userId,
    },
    select: {
      warrior_id: true,
    },
  });

  try {
    // Create a new friend request
    await prisma.friends.create({
      data: {
        requester_id: warrior?.warrior_id,
        accepter_id: friendId,
        status: 'pending',
      },
    });

    return NextResponse.json({ message: 'Friend request sent' });
  } catch (e) {
    return NextResponse.error();
  }
};
