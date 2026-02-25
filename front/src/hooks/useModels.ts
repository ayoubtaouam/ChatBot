import { useEffect, useState } from 'react';
import { Model } from '../types/model.types';
import { ModelsService } from '../services/models.service';

export const useModels = () => {
  const [models, setModels] = useState<Model[]>([]);

  const load = async () => {
    try {
      const data = await ModelsService.getModels();
      setModels(data);
    } catch (err) {
      console.error('Failed to load models:', err);
    }
  };

  const select = async (name: string) => {
    try {
      await ModelsService.selectModel(name);
      await load();
    } catch (err) {
      console.error('Failed to select model:', err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return { models, select };
};