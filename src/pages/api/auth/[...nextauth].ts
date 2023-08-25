/* eslint-disable import/extensions */
import NextAuth, { type NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '../../../server/db/client';
import { env } from '../../../env/server.mjs';

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  events: {
    async createUser(message) {
      if (message.user.name) return;
      await prisma.user.update({
        where: {
          id: message.user.id,
        },
        data: {
          name:
            message.user.email?.split('@')[0] ||
            `user-${message.user.id.slice(0, 10)}`,
        },
      });
    },
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),

  ],
  pages: {
    signIn: '/auth/signin',
    verifyRequest: '/auth/verify-request', // (used for check email message)
  }
};

export default NextAuth(authOptions);
