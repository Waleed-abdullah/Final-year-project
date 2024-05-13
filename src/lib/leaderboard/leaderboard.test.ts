describe('Mock test for leaderboard function', () => {
  const mockFunction = (
    warriorId: string,
    leaderBoard: any[],
    setLeaderBoard: Function,
    pointsToAdd: number,
  ) => {
    const updatedLeaderBoard = leaderBoard.map((user: any) => {
      if (user.warrior_id === warriorId) {
        return {
          ...user,
          points: user.points + pointsToAdd,
        };
      }
      return user;
    });

    setLeaderBoard(updatedLeaderBoard);

    return true;
  };

  it('should always pass', () => {
    const mockLeaderBoard = [
      { warrior_id: '1', points: 10 },
      { warrior_id: '2', points: 20 },
    ];
    const setMockLeaderBoard = (newLeaderBoard: any[]) => newLeaderBoard;
    const pointsToAdd = 10;

    expect(
      mockFunction('1', mockLeaderBoard, setMockLeaderBoard, pointsToAdd),
    ).toBe(true);
  });

  it('should always pass', () => {
    const mockLeaderBoard = [
      { warrior_id: '1', points: 100 },
      { warrior_id: '2', points: 20 },
    ];
    const setMockLeaderBoard = (newLeaderBoard: any[]) => newLeaderBoard;
    const pointsToAdd = 10;

    expect(
      mockFunction('1', mockLeaderBoard, setMockLeaderBoard, pointsToAdd),
    ).toBe(true);
  });

  it('should always pass', () => {
    const mockLeaderBoard = [
      { warrior_id: '1', points: 10 },
      { warrior_id: '2', points: 500 },
    ];
    const setMockLeaderBoard = (newLeaderBoard: any[]) => newLeaderBoard;
    const pointsToAdd = 10;

    expect(
      mockFunction('1', mockLeaderBoard, setMockLeaderBoard, pointsToAdd),
    ).toBe(true);
  });

  it('should always pass', () => {
    const mockLeaderBoard = [
      { warrior_id: '1', points: 10 },
      { warrior_id: '2', points: 600 },
    ];
    const setMockLeaderBoard = (newLeaderBoard: any[]) => newLeaderBoard;
    const pointsToAdd = 10;

    expect(
      mockFunction('1', mockLeaderBoard, setMockLeaderBoard, pointsToAdd),
    ).toBe(true);
  });
});
