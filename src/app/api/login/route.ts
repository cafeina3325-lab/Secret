import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { getIronSession } from 'iron-session';
import { sessionOptions, SessionData } from '@/lib/session';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return NextResponse.json({ error: '사용자를 찾을 수 없습니다.' }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: '비밀번호가 일치하지 않습니다.' }, { status: 401 });
    }

    const cookieStore = await cookies();
    const session = await getIronSession<SessionData>(cookieStore, sessionOptions);
    
    // 중복 로그인 방지를 위한 새로운 세션 토큰 생성 및 DB 업데이트
    const sessionToken = crypto.randomUUID();
    await prisma.user.update({
      where: { id: user.id },
      data: { sessionToken }
    });

    session.user = {
      id: user.id,
      username: user.username,
      nickname: user.nickname,
      role: user.role,
      profileImage: user.profileImage || undefined,
      sessionToken: sessionToken,
    };
    session.isLoggedIn = true;
    await session.save();

    return NextResponse.json({ success: true, user: session.user });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
