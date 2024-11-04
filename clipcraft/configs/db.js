import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

const databaseUrl = process.env.NEXT_PUBLIC_DATABASE_URL;

const sql = neon(databaseUrl);
console.log("SQL Client:", sql);

export const db = drizzle({ client: sql });