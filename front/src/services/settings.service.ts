import { api } from './apiClient';

export const SettingsService = {
  async saveApiKey(key: string) {
    await api.post('/settings/api-key', { apiKey: key });
  },

  async getStatus(): Promise<{ configured: boolean }> {
    const res = await api.get('/settings/api-key/status');
    return res.data;
  },
};