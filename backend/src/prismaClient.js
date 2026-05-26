import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({
  adapter,
});

/**
 * How to use in other files:
 * 
 * import { prisma } from "./prismaClient.js";

// Example usage
async function getAllUsers() {
  const users = await prisma.user.findMany();
  return users;
}
  
 */