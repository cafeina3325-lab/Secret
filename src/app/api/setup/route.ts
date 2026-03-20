import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    const adminUsername = 'admin';
    const adminPassword = 'password123';

    // 관리자 계정 존재 여부 확인
    const existingAdmin = await prisma.user.findUnique({
      where: { username: adminUsername }
    });

    if (existingAdmin) {
      return NextResponse.json({ message: '관리자 계정이 이미 존재합니다.' });
    }

    // 관리자 계정 생성
    const hashedPassword = bcrypt.hashSync(adminPassword, 10);
    await prisma.user.create({
      data: {
        username: adminUsername,
        password: hashedPassword,
        nickname: '관리자',
        role: 'admin'
      }
    });

    return NextResponse.json({ 
      success: true, 
      message: '관리자 계정이 성공적으로 생성되었습니다!',
      credentials: {
        id: adminUsername,
        password: adminPassword
      }
    });
  } catch (error) {
    console.error('Setup error:', error);
    return NextResponse.json({ error: '계정 생성 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
