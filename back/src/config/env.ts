import 'dotenv/config';

export const env = {
  PORT: Number(process.env.PORT) || 3000,
  DATABASE_URL: process.env.DATABASE_URL ?? '',
  OPENAI_API_KEY: process.env.OPENAI_API_KEY ?? '',
};

// optional: quick sanity check
if (!env.DATABASE_URL) {
  throw new Error('DATABASE_URL is missing in .env file');
}