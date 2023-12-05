import prisma from '@/src/lib/prisma';
import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'Email' },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: '********',
        },
      },
      async authorize(credentials, req) {
        if (!credentials) {
          return null;
        }
        const user = await prisma.users.findUnique({
          where: { email: credentials.email },
        });
        console.log('======================authorize=====================');
        console.log(user);
        if (
          user &&
          user.password &&
          bcrypt.compareSync(credentials.password, user.password)
        ) {
          console.log('user found password matched');
          return {
            id: user.user_id,
            user_id: user.user_id,
            email: user.email,
            isNewUser: false,
            provider: user.provider,
            is_verified: false,
            user_type: user.user_type,
          };
        } else {
          return null;
        }
      },
    }),
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
      console.log('================user=====================');
      console.log(user);
      console.log('================account=====================');
      console.log(account);
      console.log('================profile=====================');
      console.log(profile);

      if (account.provider === 'google') {
        user.is_verified = (
          profile as { email_verified: boolean }
        ).email_verified;
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
      return true; // If the sign-in is not with Google, handle accordingly or deny signIn
    },

    async jwt({ token, user }) {
      if (user) {
        token.user_id = user.user_id;
        token.isNewUser = user.isNewUser;
        token.provider = user.provider;
        token.is_verified = user.is_verified;
        token.user_type = user.user_type;
      }

      return token;
    },

    async session({ session, token, user }) {
      if (session.user) {
        session.user.user_id = token.user_id as string;
        session.user.isNewUser = token.isNewUser as boolean;
        session.user.provider = token.provider as string;
        session.user.is_verified = token.is_verified as boolean;
        session.user.user_type = token.user_type as string;
      }

      return session;
    },
  },
};
export default NextAuth(authOptions);
