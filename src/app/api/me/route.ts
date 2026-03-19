import { NextResponse } from 'next/server';
import { getSession } from '@/lib/get-session';

export async function GET() {
  const session = await getSession();
  if (!session.user) {
    return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });
  }
  return NextResponse.json({ user: session.user });
}
