import { useEffect, useState } from 'react';
import { Model } from '../types/model.types';
import { ModelsService } from '../services/models.service';
import { useCallback } from 'react';

export const useModels = () => {
  const [models, setModels] = useState<Model[]>([]);
  const [loaded, setLoaded] = useState(false);

  const load = useCallback(async () => {
    if (loaded) return;
    try {
      const data = await ModelsService.getModels();
      setModels(data);
      setLoaded(true);
    } catch (err) {
      console.error('Failed to load models:', err);
    }
  }, [loaded]);

const select = async (name: string) => {
  setModels(prev =>
    prev.map(m => ({
      ...m,
      selected: m.name === name,
      isSelected: m.name === name,
    }))
  );

  try {
    await ModelsService.selectModel(name);
  } catch (err) {
    console.error('Failed to select model:', err);
    load();
  }
};

  useEffect(() => {
    load();
  }, [load]);

  return { models, select };
};