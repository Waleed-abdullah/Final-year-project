import { NextResponse } from 'next/server';
import prisma from '@/lib/database/prisma';
import { FriendRequestAction } from '@/types/friend';

export const POST = async (request: Request) => {
  //get request from the body
  const body = await request.json();
  const requestId: number = body.requestId;
  const action: FriendRequestAction = body.action;

  if (!requestId || !action) {
    return NextResponse.error();
  }

  try {
    // change the status of the existing friend request to action
    await prisma.friends.update({
      where: {
        id: requestId,
      },
      data: {
        status: action,
      },
    });

    return NextResponse.json({ message: 'Friend request updated' });
  } catch (e) {
    return NextResponse.error();
  }
};
