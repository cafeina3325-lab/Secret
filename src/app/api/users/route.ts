import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSession } from '@/lib/get-session';
import bcrypt from 'bcryptjs';

// GET /api/users - 관리자용 유저 목록 조회
export async function GET() {
  const session = await getSession();
  if (!session.isLoggedIn || session.user.role !== 'admin') {
    return NextResponse.json({ error: '권한이 없습니다.' }, { status: 403 });
  }

  const users = await prisma.user.findMany({
    where: { role: 'user' },
    select: { id: true, username: true, nickname: true, profileImage: true, createdAt: true },
    orderBy: { createdAt: 'desc' }
  });

  return NextResponse.json({ users });
}

// POST /api/users - 유저 생성
export async function POST(req: Request) {
  const session = await getSession();
  if (!session.isLoggedIn || session.user.role !== 'admin') {
    return NextResponse.json({ error: '권한이 없습니다.' }, { status: 403 });
  }

  try {
    const { username, password, nickname } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        nickname,
        role: 'user',
      },
    });

    return NextResponse.json({ success: true, user: { id: user.id, username: user.username, nickname: user.nickname } });
  } catch (error: any) {
    return NextResponse.json({ error: '이미 존재하는 아이디거나 오류가 발생했습니다.' }, { status: 400 });
  }
}

// DELETE /api/users?userId=... - 유저 삭제
export async function DELETE(req: Request) {
  const session = await getSession();
  if (!session.isLoggedIn || session.user.role !== 'admin') {
    return NextResponse.json({ error: '권한이 없습니다.' }, { status: 403 });
  }

  const searchParams = new URL(req.url).searchParams;
  const userId = parseInt(searchParams.get('userId') || '');

  if (!userId) return NextResponse.json({ error: 'ID가 필요합니다.' }, { status: 400 });

  await prisma.user.delete({ where: { id: userId } });
  return NextResponse.json({ success: true });
}

// PATCH /api/users - 유저 정보 수정 (아이디, 비밀번호)
export async function PATCH(req: Request) {
  const session = await getSession();
  if (!session.isLoggedIn || session.user.role !== 'admin') {
    return NextResponse.json({ error: '권한이 없습니다.' }, { status: 403 });
  }

  try {
    const { userId, username, password, nickname } = await req.json();
    
    if (!userId) {
      return NextResponse.json({ error: '대상 유저 ID가 필요합니다.' }, { status: 400 });
    }

    const updateData: any = {};
    if (username) updateData.username = username;
    if (nickname) updateData.nickname = nickname;
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    return NextResponse.json({ 
      success: true, 
      user: { 
        id: updatedUser.id, 
        username: updatedUser.username, 
        nickname: updatedUser.nickname 
      } 
    });
  } catch (error: any) {
    console.error('User update error:', error);
    return NextResponse.json({ error: '정보 수정 중 오류가 발생했거나 이미 존재하는 아이디입니다.' }, { status: 400 });
  }
}
