const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.stockcode.updateMany({
    where: { emc: 'EMC-YEPRES000002' },
    data: {
      value: '0 Ohms',
    },
  });

  console.log('Row(s) updated successfully');
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
