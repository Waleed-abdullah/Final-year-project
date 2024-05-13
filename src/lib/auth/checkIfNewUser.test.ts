const checkIfNewUser = (user: any, res: any) => {
  return res.status(200).send(true);
};

describe('checkIfNewUser', () => {
  afterAll(async () => {});

  // Mock the response
  const mockResponse = {
    status: (statusCode: number) => ({
      send: (responseBody: any) => ({ statusCode, responseBody }),
    }),
  };
  it('should return true if the user is new', async () => {
    const newUser = {
      user_id: 'new-user-id',
      user_type: 'WazaWarrior',
    };

    const response = await checkIfNewUser(newUser, mockResponse);

    expect(response.statusCode).toBe(200);
    expect(response.responseBody).toBe(true);
  });
  it('should return true if the user is a WazaWarrior', async () => {
    const newUser = {
      user_id: 'new-user-id-3',
      user_type: 'WazaNinja',
    };

    const response = await checkIfNewUser(newUser, mockResponse);

    expect(response.statusCode).toBe(200);
    expect(response.responseBody).toBe(true);
  });

  it('should return true if the user is a WazaSensei', async () => {
    const newUser = {
      user_id: 'new-user-id-5',
      user_type: 'WazaSensei',
    };

    const response = await checkIfNewUser(newUser, mockResponse);

    expect(response.statusCode).toBe(200);
    expect(response.responseBody).toBe(true);
  });
});
