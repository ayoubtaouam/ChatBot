import { hashValue } from '../../utils/hash';
import { KeysRepository } from './keys.repository';
import { createOpenAIClient } from '../../ai/openai.client';
import { env } from '../../config/env';

export const KeysService = {
  async saveApiKey(rawKey: string) {
    const hash = await hashValue(rawKey);
    await KeysRepository.saveHash(hash);
  },

  async getStatus() {
    const hash = await KeysRepository.getHash();
    return { configured: !!hash };
  },

  async validateKey(key: string) {
    try {
      const client = createOpenAIClient(key);
      await client.models.list();
      return true;
    } catch {
      return false;
    }
  },

  async resolveKey(): Promise<string> {
    return env.OPENAI_FALLBACK_KEY;
  },
};