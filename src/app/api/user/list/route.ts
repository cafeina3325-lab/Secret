import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSession } from '@/lib/get-session';

export async function GET() {
  try {
    const session = await getSession();
    if (!session.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: '권한이 없습니다.' }, { status: 403 });
    }

    const users = await prisma.user.findMany({
      where: { role: 'user' },
      select: {
        id: true,
        username: true,
        nickname: true,
        profileImage: true,
      },
    });

    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json({ error: '사용자 목록을 불러오는 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
