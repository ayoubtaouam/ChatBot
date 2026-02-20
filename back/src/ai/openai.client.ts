import OpenAI from 'openai';
import { env } from '../config/env';

const key = env.OPENAI_API_KEY;

export const openai = new OpenAI({
  apiKey: key,
});

export function createOpenAIClient(apiKey: string) {
  return new OpenAI({ apiKey });
}