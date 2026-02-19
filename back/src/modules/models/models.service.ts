import modelsRepository from './models.repository';
import { ModelDTO } from './models.types';
import { openai } from '../../ai/openai.client';

class ModelsService {
  async listModels(): Promise<ModelDTO[]> {
    try {
      const res: any = await openai.models.list();
      const providerModels = (res?.data ?? [])
        .map((m: any) => m.id)
        .filter((name: string) =>
        name.startsWith('gpt-') && 
        !name.includes('embed') && 
        !name.includes('audio') &&
        !name.includes('image') &&
        !name.includes('video') &&
        !name.includes('codex') &&
        !name.includes('realtime') &&
        !name.includes('transcribe') &&
        !name.includes('moderation') &&
        !name.includes('tts') &&
        !name.includes('search') &&
        !name.includes('moderation')
      );

      for (const name of providerModels) {
        try {
          await modelsRepository.upsertModel(name, 'openai');
        } catch (e) {
          console.warn(`Failed to upsert model ${name}`, e);
        }
      }

      const selected = await modelsRepository.getSelected();
      if (!selected) {
        const preferred = providerModels.find((n: string) => n.includes('gpt-4o')) || providerModels[0];
        if (preferred) {
          try {
            await modelsRepository.selectModelByName(preferred);
          } catch (e) {
            console.warn(`Failed to select default model ${preferred}`, e);
          }
        }
      }
    } catch (err) {
      console.warn('Failed to fetch models from OpenAI:', err);
    }

    let models = await modelsRepository.getAll();

    if (models.length === 0) {
      try {
        await modelsRepository.upsertModel('gpt-4o', 'openai');
        await modelsRepository.selectModelByName('gpt-4o');
      } catch (e) {
        console.warn('Failed to create/select default model:', e);
      }

      models = await modelsRepository.getAll();
    }

    return models.map((m) => ({
      name: m.name,
      provider: m.provider,
      isSelected: m.isSelected,
    }));
  }

  async selectModel(name: string) {
    const model = await modelsRepository.selectModelByName(name);

    return {
      message: 'Model updated successfully',
      selectedModel: model.name,
    };
  }
}

export default new ModelsService();