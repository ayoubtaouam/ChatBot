import { useEffect, useState } from 'react';
import { Model } from '../types/model.types';
import { ModelsService } from '../services/models.service';

export const useModels = () => {
  const [models, setModels] = useState<Model[]>([]);

  const load = async () => {
    const data = await ModelsService.getModels();
    setModels(data);
  };

  const select = async (name: string) => {
    await ModelsService.selectModel(name);
    await load();
  };

  useEffect(() => {
    load();
  }, []);

  return { models, select };
};