import { prisma } from '../../config/prisma';
import { Model } from '@prisma/client';

const prisma = new PrismaClient();

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
}

export default new ModelsRepository();