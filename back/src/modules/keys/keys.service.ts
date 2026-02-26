import { hashValue } from '../../utils/hash';
import KeysRepository from './keys.repository';
import { env } from '../../config/env';
import CryptoJS from 'crypto-js';
import OpenAI from 'openai';

const SECRET = process.env.KEY_SECRET || 'dev-secret';

export const KeysService = {

  async saveApiKey(rawKey: string) {
    // 1️⃣ Validate the RAW key first
    await this.validateOpenAI(rawKey);

    // 2️⃣ Encrypt
    const encryptedKey = CryptoJS.AES.encrypt(rawKey, SECRET).toString();

    // 3️⃣ Hash
    const hash = await hashValue(rawKey);

    // 4️⃣ Save
    await KeysRepository.save(hash, encryptedKey);

    console.log('API key saved and encrypted');
  },

  async getStatus() {
    const hash = await KeysRepository.getHash();
    return { configured: !!hash };
  },

  async resolveKey(): Promise<string> {
    const encrypted = await KeysRepository.getEncryptedKey();

    if (encrypted) {
      const bytes = CryptoJS.AES.decrypt(encrypted, SECRET);
      const decryptedKey = bytes.toString(CryptoJS.enc.Utf8);

      if (decryptedKey) return decryptedKey;
    }

    // fallback to ENV
    return env.OPENAI_API_KEY;
  },

  async validateOpenAI(rawKey: string) {
    const testClient = new OpenAI({ apiKey: rawKey });

    try {
      await testClient.models.list();
    } catch {
      throw new Error('Invalid OpenAI API key');
    }
  },

};