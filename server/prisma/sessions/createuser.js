const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      username: 'admin',
      password: '12345', // later use bcrypt
      role: 'admin'
    }
  });
}

main()
  .then(() => console.log('User seeded'))
  .catch(console.error)
  .finally(() => prisma.$disconnect());
