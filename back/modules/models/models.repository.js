const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

class ModelsRepository {
    async getAll() {
        return prisma.model.findMany({
            orderBy: { createdAt: 'asc' },
        })
    }
    async getSelected() {
        return prisma.model.findFirst({
            where: { isSelected: true },
        })
    }
    async selectModelByName() {
        await prisma.model.updateMany({
            data: {isSelected: false},
        })
        return prisma.model.update({
            where: { name }
            data: { isSelected: true }
        })
    }
}

module.exports = new ModelsRepository();