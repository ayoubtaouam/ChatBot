import { prisma } from '../../config/prisma';

class KeysRepository {
  async saveHash(hash: string): Promise<void> {
    await prisma.settings.upsert({
      where: { id: 1 },
      update: { apiKeyHash: hash },
      create: {
        id: 1,
        apiKeyHash: hash,
      },
    });
  }

  async getHash(): Promise<string | null> {
    const settings = await prisma.settings.findUnique({
      where: { id: 1 },
      select: { apiKeyHash: true },
    });

    return settings?.apiKeyHash ?? null;
  }
}

export default new KeysRepository();