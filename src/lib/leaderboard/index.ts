import { LeaderBoardItem } from '@/types/leaderboard';

export const updateUserPoints = (
  userId: string,
  leaderBoard: LeaderBoardItem[],
  setLeaderBoard: (leaderBoard: LeaderBoardItem[]) => void,
  pointsToAdd: number,
) => {
  const updatedLeaderBoard = leaderBoard.map((user) => {
    if (user.user_id === userId) {
      return {
        ...user,
        points: user.points + pointsToAdd,
      };
    }
    return user;
  });

  setLeaderBoard(updatedLeaderBoard);

  //TODO:
  // make request to update backend
};
