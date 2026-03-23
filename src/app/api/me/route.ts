import { NextResponse } from 'next/server';
import { getSession } from '@/lib/get-session';
import { prisma } from '@/lib/db';
import bcrypt from 'bcryptjs';

// GET /api/me - 현재 사용자 정보 반환
export async function GET() {
  const session = await getSession();

  if (!session.isLoggedIn) {
    return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });
  }

  // 세션 정보 대신 DB에서 최신 정보를 조회하여 반환 (사진 포함)
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { id: true, username: true, nickname: true, role: true, profileImage: true }
  });

  return NextResponse.json({ user });
}

// PATCH /api/me - 프로필 정보 수정
export async function PATCH(req: Request) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });
  }

  try {
    const { username, nickname, password, profileImage } = await req.json();
    
    const updateData: any = {};
    if (username && username !== session.user.username) {
      // 아이디 중복 체크
      const existingUser = await prisma.user.findUnique({ where: { username } });
      if (existingUser) return NextResponse.json({ error: '이미 사용 중인 아이디입니다.' }, { status: 400 });
      updateData.username = username;
    }
    if (nickname) updateData.nickname = nickname;
    if (profileImage) updateData.profileImage = profileImage;
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: updateData,
    });

    // 세션 정보 업데이트 (사진 등 대용량 데이터는 제외)
    session.user.username = updatedUser.username;
    session.user.nickname = updatedUser.nickname;
    await session.save();

    return NextResponse.json({ success: true, user: session.user });
  } catch (error: any) {
    return NextResponse.json({ error: '정보 수정 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
