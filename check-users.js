const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');

async function run() {
  try {
    const adminUsername = 'admin';
    const adminPassword = 'password123';
    
    console.log('--- Database Check ---');
    
    // Check if admin exists
    let admin = await prisma.user.findUnique({ where: { username: adminUsername } });
    
    if (!admin) {
      console.log('Admin user NOT found. Creating...');
      const hashedPassword = bcrypt.hashSync(adminPassword, 10);
      admin = await prisma.user.create({
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

    const users = await prisma.user.findMany();
    console.log('\nTotal users:', users.length);
    console.log('User list:', JSON.stringify(users.map(u => ({ id: u.id, username: u.username, role: u.role })), null, 2));

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

run();
