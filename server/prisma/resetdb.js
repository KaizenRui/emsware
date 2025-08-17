const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Delete all rows in the correct order to respect foreign keys
  await prisma.bomitems.deleteMany({});
  await prisma.billofmaterials.deleteMany({});
  await prisma.stockcode.deleteMany({});

  // Reset auto-increment sequences
  await prisma.$executeRawUnsafe(`ALTER SEQUENCE "bomitems_id_seq" RESTART WITH 1`);
  await prisma.$executeRawUnsafe(`ALTER SEQUENCE "billofmaterials_bom_id_seq" RESTART WITH 1`);
  await prisma.$executeRawUnsafe(`ALTER SEQUENCE "stockcode_id_seq" RESTART WITH 1`);
}

main()
  .catch(() => {})
  .finally(async () => {
    await prisma.$disconnect();
  });

  