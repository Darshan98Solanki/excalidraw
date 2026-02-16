import { PrismaClient } from "./generated/client/client.js";
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ 
  connectionString: process.env.DATABASE_URL 
});
const prismaclient = new PrismaClient({ adapter });

export default prismaclient;