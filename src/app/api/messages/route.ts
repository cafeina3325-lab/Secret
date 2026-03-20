import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSession } from '@/lib/get-session';

// GET /api/messages?chatId=...
export async function GET(req: Request) {
  const session = await getSession();
  if (!session.isLoggedIn) return NextResponse.json({ error: '로그인 필수' }, { status: 401 });

  const searchParams = new URL(req.url).searchParams;
  const chatId = searchParams.get('chatId');

  if (!chatId) return NextResponse.json({ error: 'chatId 필수' }, { status: 400 });

  const messages = await prisma.message.findMany({
    where: { chatId },
    orderBy: { createdAt: 'asc' }
  });

  return NextResponse.json({ messages });
}

// POST /api/messages
export async function POST(req: Request) {
  const session = await getSession();
  if (!session.isLoggedIn) return NextResponse.json({ error: '로그인 필수' }, { status: 401 });

  try {
    const { chatId, type, content } = await req.json();

    const message = await prisma.message.create({
      data: {
        chatId,
        senderId: session.user.id,
        type,
        content,
      },
    });

    return NextResponse.json({ success: true, message });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
