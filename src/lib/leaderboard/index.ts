import { LeaderBoardItem } from '@/types/leaderboard';

export const updateUserPoints = async (
  warriorId: string,
  leaderBoard: LeaderBoardItem[],
  setLeaderBoard: (leaderBoard: LeaderBoardItem[]) => void,
  pointsToAdd: number,
) => {
  const updatedLeaderBoard = leaderBoard.map((user) => {
    if (user.warrior_id === warriorId) {
      return {
        ...user,
        points: user.points + pointsToAdd,
      };
    }
    return user;
  });

  setLeaderBoard(updatedLeaderBoard);

  await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/leaderboard/add-points`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ pointsToAdd, warriorId }),
  });
};
