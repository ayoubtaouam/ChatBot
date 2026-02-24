import { hashValue } from '../../utils/hash';
import KeysRepository from './keys.repository';
import { env } from '../../config/env';
import { openai } from '../../ai/openai.client';

export const KeysService = {
  async saveApiKey(rawKey: string) {
    const hash = await hashValue(rawKey);
    const storedHash = await KeysRepository.getHash();

    if (storedHash !== hash) {
      await KeysRepository.saveHash(hash);
      console.log('API key updated');
    }
    
    else {
      console.log('API key already up to date');
    }
  },

  async getStatus() {
    const hash = await KeysRepository.getHash();
    return { configured: !!hash };
  },

  async resolveKey(): Promise<string> {
    return env.OPENAI_API_KEY;
  },

  async validateOpenAI() {
  try {
    await openai.models.list();
    console.log('OpenAI key valid');
    await KeysService.saveApiKey(await KeysService.resolveKey());
  } catch (err) {
    console.error('Invalid OpenAI API key', err);
    process.exit(1);
  }
},
};