import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSession } from '@/lib/get-session';

export async function GET(req: Request) {
  try {
    const session = await getSession();
    if (!session.user) return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const chatId = searchParams.get('chatId');

    if (!chatId) return NextResponse.json({ error: 'chatId가 필요합니다.' }, { status: 400 });

    const messages = await prisma.message.findMany({
      where: { chatId },
      orderBy: { createdAt: 'asc' },
    });

    return NextResponse.json({ messages });
  } catch (error) {
    return NextResponse.json({ error: '메시지를 불러오는 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
