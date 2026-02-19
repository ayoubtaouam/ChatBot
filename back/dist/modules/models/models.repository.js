"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../config/prisma");
class ModelsRepository {
    async getAll() {
        return prisma_1.prisma.model.findMany({
            orderBy: { createdAt: 'asc' },
        });
    }
    async getSelected() {
        return prisma_1.prisma.model.findFirst({
            where: { isSelected: true },
        });
    }
    async selectModelByName(name) {
        await prisma_1.prisma.model.updateMany({
            data: { isSelected: false },
        });
        return prisma_1.prisma.model.update({
            where: { name },
            data: { isSelected: true },
        });
    }
}
exports.default = new ModelsRepository();
//# sourceMappingURL=models.repository.js.map