import { PrismaService } from './prisma.service';
const prisma = new PrismaService();

async function createCategory() {
  const category = await prisma.category.createMany({
    data: [
      {
        name: 'Maths',
      },
      {
        name: 'Programmation',
      },
      {
        name: 'Physique',
      },
      {
        name: 'Art',
      },
      {
        name: 'Musique',
      },
      {
        name: 'Comptabilité',
      },
    ],
  });
}

createCategory();
