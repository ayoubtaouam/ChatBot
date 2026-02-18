import modelsRepository from './models.repository';
import { ModelDTO } from './models.types';

class ModelsService {
  async listModels(): Promise<ModelDTO[]> {
    const models = await modelsRepository.getAll();

    return models.map(m => ({
      name: m.name,
      provider: m.provider,
      selected: m.isSelected,
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