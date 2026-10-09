import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { id: 'dummy-user-123' },
    update: {},
    create: {
      id: 'dummy-user-123',
      name: 'Demo User',
      email: 'demo@example.com',
      emailVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      role: 'LANDLORD'
    }
  });
  console.log("Demo user created.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
