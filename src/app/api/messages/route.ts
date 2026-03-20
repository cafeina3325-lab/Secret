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

// DELETE /api/messages
export async function DELETE(req: Request) {
  const session = await getSession();
  if (!session.isLoggedIn || session.user.role !== 'admin') {
    return NextResponse.json({ error: '관리자 권한이 필요합니다.' }, { status: 403 });
  }

  try {
    const { messageIds, chatId } = await req.json();

    if (messageIds && Array.isArray(messageIds)) {
      // 선택한 메시지만 삭제
      await prisma.message.deleteMany({
        where: { id: { in: messageIds } },
      });
      return NextResponse.json({ success: true, message: '선택한 메시지가 삭제되었습니다.' });
    } else if (chatId) {
      // 해당 채팅방의 모든 메시지 삭제
      await prisma.message.deleteMany({
        where: { chatId },
      });
      return NextResponse.json({ success: true, message: '채팅방이 비워졌습니다.' });
    }

    return NextResponse.json({ error: '삭제할 대상이 지정되지 않았습니다.' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
