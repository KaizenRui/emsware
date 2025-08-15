const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.stockcode.create({
    data: {
      emc: 'EMC-YEPRES000002',
      custpn: 'KDS909',
      mpn1: 'CRCW04020000Z0ED',
      mpn2: '',
    },
  });
  console.log('Data added successfully');
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });