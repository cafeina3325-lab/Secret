import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSession } from '@/lib/get-session';
import bcrypt from 'bcryptjs';

export async function PATCH(req: Request) {
  try {
    const session = await getSession();
    if (!session.user) return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });

    const { id, username, nickname, password, profileImage } = await req.json();

    // 관리자이거나 본인인 경우만 수정 가능
    if (session.user.role !== 'admin' && session.user.id !== id) {
      return NextResponse.json({ error: '권한이 없습니다.' }, { status: 403 });
    }

    const updateData: any = { username, nickname, profileImage };
    if (password) {
      updateData.password = bcrypt.hashSync(password, 10);
    }

    const user = await prisma.user.update({
      where: { id },
      data: updateData,
    });

    // 본인 정보 수정 시 세션 갱신
    if (session.user.id === user.id) {
      session.user.username = user.username;
      session.user.nickname = user.nickname;
      await session.save();
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: '정보 수정 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
