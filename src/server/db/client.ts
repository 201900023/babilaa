import { PrismaClient } from '@prisma/client';
import { env } from '../../env/server.mjs';

declare global {

  var prisma: PrismaClient | undefined;
}

//making client as global variable
//handled by prisma & trpc
export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ['query'],
  });

if (env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}
