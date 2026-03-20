import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { sessionOptions, SessionData } from './session';
import { prisma } from './db';

export async function getSession() {
  const cookieStore = await cookies();
  const session = await getIronSession<SessionData>(cookieStore, sessionOptions);

  if (session.isLoggedIn && session.user?.id) {
    // DB의 세션 토큰과 대조하여 중복 로그인 여부 확인
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { sessionToken: true }
    });

    if (!user || user.sessionToken !== session.user.sessionToken) {
      // 토큰이 일치하지 않으면 (다른 기기에서 로그인했거나 계정이 삭제된 경우) 세션 파기
      session.destroy();
      session.isLoggedIn = false;
      return session;
    }
  } else {
    session.isLoggedIn = !!session.isLoggedIn;
  }

  return session;
}
