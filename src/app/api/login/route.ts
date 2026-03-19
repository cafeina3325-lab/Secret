import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSession } from '@/lib/get-session';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();
    const session = await getSession();

    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return NextResponse.json({ error: '아이디 또는 비밀번호가 올바르지 않습니다.' }, { status: 401 });
    }

    session.user = {
      id: user.id,
      username: user.username,
      nickname: user.nickname,
      role: user.role,
    };
    await session.save();

    return NextResponse.json({ success: true, user: session.user });
  } catch (error) {
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
