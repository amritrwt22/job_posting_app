import { PrismaClient } from "../app/generated/prisma";
import { withAccelerate } from "@prisma/extension-accelerate";

//globalForPrisma is used to ensure that the PrismaClient instance is reused in development mode
const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

// Create a singleton instance of PrismaClient to avoid multiple connections in development mode
const prisma =globalForPrisma.prisma || new PrismaClient().$extends(withAccelerate());

// If in development mode, assign the PrismaClient instance to the global variable
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export { prisma };


/* explain this page
This page initializes a Prisma Client instance for database access in a Next.js application. It includes:
- Importing the PrismaClient from the generated Prisma schema.
- Using the `withAccelerate` extension to enhance performance with Prisma's Accelerate feature.
- Creating a singleton instance of PrismaClient to avoid multiple connections in development mode.
- Exporting the `prisma` instance for use in other parts of the application.
*/