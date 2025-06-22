// import { PrismaClient } from "@prisma/client";
// import { PrismaLibSQL } from "@prisma/adapter-libsql";

// const adapter = new PrismaLibSQL({
//   url: process.env.TURSO_DB_URL!,
//   authToken: process.env.TURSO_DB_TOKEN,
// });
// const prisma = new PrismaClient({ adapter });

// export { prisma };

import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
