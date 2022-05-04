import { PrismaService } from './prisma.service';
const prisma = new PrismaService();

async function createCategory() {
  const category = await prisma.category.createMany({
    data: [
      {
        name: 'MATH',
      },
      {
        name: 'PROGRAMMING',
      },
      {
        name: 'PHYSICS',
      },
      {
        name: 'ART',
      },
      {
        name: 'MUSIC',
      },
      {
        name: 'ACCOUNTING',
      },
    ],
  });
}

createCategory();
