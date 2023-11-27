import prisma from '@/src/lib/prisma';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      httpOptions: {
        timeout: 10000000,
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!account) return false;

      console.log('================account=====================');
      console.log(account);
      console.log('================profile=====================');
      console.log(profile);
      if (account.provider === 'google') {
        const userInDb = await prisma.users.findUnique({
          where: { email: user.email || '' },
        });
        console.log('================userInDb=====================');
        console.log(userInDb);
        if (!userInDb) {
          user.isNewUser = true;
        } else {
          user.isNewUser = false; // Not a new user
        }
        console.log('================user=====================');
        console.log(user);
        return true;
      }
      return false; // If the sign-in is not with Google, handle accordingly or deny signIn
    },
    async session({ session, user }) {
      // Add the isNewUser flag to the session object if it exists
      if (user?.isNewUser !== undefined) {
        session.isNewUser = user.isNewUser;
      }
      return session;
    },
  },
});
