import { SessionOptions } from 'iron-session';

export interface SessionData {
  user: {
    id: number;
    username: string;
    nickname: string;
    role: string;
    sessionToken: string;
  };
  isLoggedIn: boolean;
}

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_PASSWORD || 'complex_password_at_least_32_characters_long',
  cookieName: 'darksecret_session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};
