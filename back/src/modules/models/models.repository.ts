import { prisma } from '../../config/prisma';
import type { Model } from '@prisma/client';

class ModelsRepository {
  async getAll(): Promise<Model[]> {
    return prisma.model.findMany({
      orderBy: { createdAt: 'asc' },
    });
  }

  async getSelected(): Promise<Model | null> {
    return prisma.model.findFirst({
      where: { isSelected: true },
    });
  }

  async selectModelByName(name: string): Promise<Model> {
    await prisma.model.updateMany({
      data: { isSelected: false },
    });

    return prisma.model.update({
      where: { name },
      data: { isSelected: true },
    });
  }

  async upsertModel(name: string, provider: string): Promise<Model> {
    return prisma.model.upsert({
      where: { name },
      update: { provider },
      create: { name, provider },
    });
  }
}

export default new ModelsRepository();