import dotenv from 'dotenv';

dotenv.config();

export const env = {
  PORT: process.env.PORT || 3000,
  DATABASE_URL: process.env.DATABASE_URL!,
  OPENAI_FALLBACK_KEY: process.env.OPENAI_API_KEY || '',
};