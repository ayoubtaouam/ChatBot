import { api } from './apiClient';
import { Model } from '../types/model.types';

export const ModelsService = {
  async getModels(): Promise<Model[]> {
    const res = await api.get('/models');
    return res.data;
  },

  async selectModel(name: string) {
    await api.post('/models/select', { name });
  },
};