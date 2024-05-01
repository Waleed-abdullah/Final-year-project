import { NextResponse } from 'next/server';
import prisma from '@/lib/database/prisma';
import { Friend } from '@/types/friend';

export const GET = async (request: Request) => {
  //get query params from request
  const url = new URL(request.url);
  const query = url.searchParams.get('query');
  const userId = url.searchParams.get('userId');

  if (!query || !userId) {
    return NextResponse.error();
  }

  // Fetch all warriors from the database that match the query
  try {
    const currentWarrior = await prisma.waza_warriors.findUnique({
      where: {
        user_id: userId,
      },
      select: {
        warrior_id: true,
      },
    });

    const wazaWarriors = await prisma.waza_warriors.findMany({
      where: {
        users: {
          username: {
            contains: query!,
          },
        },
      },
      include: {
        users: {
          select: {
            username: true,
            profile_pic: true,
          },
        },
      },
    });

    const friends = await prisma.friends.findMany({
      where: {
        OR: [
          { requester_id: currentWarrior?.warrior_id },
          { accepter_id: currentWarrior?.warrior_id },
        ],
      },
      select: {
        status: true,
        requester_id: true,
        accepter_id: true,
      },
    });

    // Combine waza warriors and their friend information
    const users: Friend[] = wazaWarriors.map((wazaWarrior) => {
      const friendInfo = friends.find(
        (friend) =>
          friend.requester_id === wazaWarrior.warrior_id ||
          friend.accepter_id === wazaWarrior.warrior_id,
      );
      return {
        profile_pic: wazaWarrior.users?.profile_pic,
        username: wazaWarrior.users?.username,
        warrior_id: wazaWarrior.warrior_id,
        status: friendInfo?.status,
      };
    });
    return NextResponse.json(users);
  } catch (e) {
    return NextResponse.error();
  }
};
