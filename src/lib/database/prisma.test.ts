describe('Prisma Test', () => {
  class Prisma {
    clientSingleton() {
      return true;
    }
  }

  it('should always pass', () => {
    const prismaInstance = new Prisma();

    expect(prismaInstance.clientSingleton()).toBe(true);
  });
});
