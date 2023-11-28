import prisma from '@/src/lib/prisma';
import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
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
      user.provider = account.provider;
      user.is_verified = profile.email_verified;

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

        return true;
      }
      return false; // If the sign-in is not with Google, handle accordingly or deny signIn
    },

    async jwt({ token, user }) {
      if (user) {
        token.isNewUser = user.isNewUser;
        token.provider = user.provider;
        token.is_verified = user.is_verified;
      }

      return token;
    },

    async session({ session, token, user }) {
      if (session.user) {
        session.user.isNewUser = token.isNewUser as boolean;
        session.user.provider = token.provider as string;
        session.user.is_verified = token.is_verified as boolean;
      }

      return session;
    },
  },
};
export default NextAuth(authOptions);
