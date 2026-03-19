const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const adminUsername = 'admin';
  const adminPassword = 'password123';
  
  const existingAdmin = await prisma.user.findUnique({
    where: { username: adminUsername }
  });

  if (!existingAdmin) {
    const hashedPassword = bcrypt.hashSync(adminPassword, 10);
    await prisma.user.create({
      data: {
        username: adminUsername,
        password: hashedPassword,
        nickname: '관리자',
        role: 'admin'
      }
    });
    console.log('✅ Admin user created: admin / password123');
  } else {
    console.log('ℹ️ Admin user already exists.');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
