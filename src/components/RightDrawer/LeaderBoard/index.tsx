import prisma from '@/lib/database/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { LeaderBoardItem } from '@/types/leaderboard';
import { UserCardContainer } from './UserCardContainer';

const LeaderBoard = async () => {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.user_id;
  const warrior = await prisma.waza_warriors.findUnique({
    where: {
      user_id: userId,
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

  const warriorId = warrior?.warrior_id;

  const friends = await prisma.friends.findMany({
    where: {
      OR: [{ requester_id: warriorId }, { accepter_id: warriorId }],
      AND: {
        status: 'accepted',
      },
    },
    select: {
      status: true,
      requester_id: true,
      accepter_id: true,
    },
  });

  const leaderBoardWarriorIds = friends.map((friend) => {
    if (friend.requester_id === warriorId) {
      return friend.accepter_id;
    } else {
      return friend.requester_id;
    }
  });

  leaderBoardWarriorIds.push(warriorId!);

  const leaderBoardData: LeaderBoardItem[] = [];
  for (const warrior_id of leaderBoardWarriorIds) {
    const warriorData = await prisma.waza_warriors.findUnique({
      where: {
        warrior_id: warrior_id!,
      },
      include: {
        users: {
          select: {
            user_id: true,
            username: true,
            profile_pic: true,
          },
        },
      },
    });

    const warriorLeaderboardData = await prisma.leaderboard.findUnique({
      where: {
        warrior_id: warrior_id!,
      },
    });
    leaderBoardData.push({
      username: warriorData?.users?.username!,
      points: warriorLeaderboardData?.points || 0,
      profile_pic: warriorData?.users?.profile_pic!,
      warrior_id: warriorData?.warrior_id!,
      user_id: warriorData?.users?.user_id!,
    });
  }

  const currentMonth = new Date()
    .toLocaleString('default', { month: 'long' })
    .substring(0, 3);

  return (
    <div className='flex flex-col items-center justify-center cursor-default'>
      <div className='flex justify-between items-center gap-8 mb-2'>
        <div>Leaderboard</div>
        <div className='bg-black hover:bg-yellow-400 text-yellow-400 text-center cursor-default hover:text-white font-bold py-2 px-4 rounded-full'>
          {currentMonth}
        </div>
      </div>
      <UserCardContainer leaderBoardData={leaderBoardData} />
    </div>
  );
};

export default LeaderBoard;
