import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.house.updateMany({
    where: {
      imageUrl: {
        contains: '1502672260266-1c1f512760a3'
      }
    },
    data: {
      imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800'
    }
  });
  console.log("Updated images.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
