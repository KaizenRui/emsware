const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.stockcode.create({
    data: {
      emc: 'EMC-YEPRES000001',
      custpn: '1KA87D',
      mpn1: 'RC0603FR-0747KL',
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