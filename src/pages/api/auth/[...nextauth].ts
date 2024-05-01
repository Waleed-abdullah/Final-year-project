import prisma from '@/lib/database/prisma';
import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import checkIfNewUser from '@/lib/auth/checkIfNewUser';
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
        if (
          user &&
          user.password &&
          bcrypt.compareSync(credentials.password, user.password)
        ) {
          const isNewUser = await checkIfNewUser(user);
          return {
            id: user.user_id,
            user_id: user.user_id,
            email: user.email,
            isNewUser,
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
      if (!account || !user) return false;
      user.provider = account.provider;

      if (account.provider === 'google') {
        user.is_verified = (
          profile as { email_verified: boolean }
        ).email_verified;
        const userInDb = await prisma.users.findUnique({
          where: { email: user.email || '' },
        });

        if (!userInDb) {
          console.log('newUser');
          user.isNewUser = true;
          return true;
        } else {
          user.user_type = userInDb.user_type;
          user.user_id = userInDb.user_id;
          user.isNewUser = await checkIfNewUser(userInDb);
        }
        return true;
      }
      return true; // If the sign-in is not with Google, handle accordingly or deny signIn
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.user_id = user.user_id;
        token.isNewUser = user.isNewUser;
        token.provider = user.provider;
        token.is_verified = user.is_verified;
        token.user_type = user.user_type;
      }
      if (
        trigger === 'update' &&
        session?.id &&
        session?.type &&
        session?.newUser !== undefined
      ) {
        token.user_id = session.id;
        token.user_type = session.type;
        token.isNewUser = session.newUser;
      }
      return token;
    },

    async session({ session, token, user, trigger, newSession }) {
      if (session.user) {
        session.user.user_id = token.user_id as string;
        session.user.isNewUser = token.isNewUser as boolean;
        session.user.provider = token.provider as string;
        session.user.is_verified = token.is_verified as boolean;
        session.user.user_type = token.user_type as string;
      }

      if (
        trigger === 'update' &&
        newSession?.id &&
        newSession?.type &&
        newSession?.newUser !== undefined
      ) {
        session.user.user_id = newSession.id;
        session.user.user_type = newSession.type;
        session.user.isNewUser = newSession.newUser;
      }
      return session;
    },
  },
  pages: {
    signIn: '/signin',
  },
};
export default NextAuth(authOptions);
