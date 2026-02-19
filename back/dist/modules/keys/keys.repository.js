"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../config/prisma");
class KeysRepository {
    async saveHash(hash) {
        await prisma_1.prisma.settings.upsert({
            where: { id: 1 },
            update: { apiKeyHash: hash },
            create: {
                id: 1,
                apiKeyHash: hash,
            },
        });
    }
    async getHash() {
        const settings = await prisma_1.prisma.settings.findUnique({
            where: { id: 1 },
            select: { apiKeyHash: true },
        });
        return settings?.apiKeyHash ?? null;
    }
}
exports.default = new KeysRepository();
//# sourceMappingURL=keys.repository.js.map