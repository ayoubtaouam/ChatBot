import OpenAI from 'openai';

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export function createOpenAIClient(apiKey: string) {
  return new OpenAI({ apiKey });
}