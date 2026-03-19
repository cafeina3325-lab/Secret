import { SessionOptions } from 'iron-session';

export interface SessionData {
  user?: {
    id: number;
    username: string;
    nickname: string;
    role: string;
  };
}

export const sessionOptions: SessionOptions = {
  password: "complex_password_at_least_32_characters_long", // 실제 운영 시 환경변수 권장
  cookieName: "darksecret_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};
