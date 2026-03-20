'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Zap } from 'lucide-react';
import styles from './login.module.css';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // localStorage에서 사용자 목록 가져오기 (없으면 초기 관리자 생성)
      const storedUsers = JSON.parse(localStorage.getItem('darksecret_users') || '[]');
      if (storedUsers.length === 0) {
        const adminUser = { id: 1, username: 'admin', password: 'password123', nickname: '관리자', role: 'admin' };
        storedUsers.push(adminUser);
        localStorage.setItem('darksecret_users', JSON.stringify(storedUsers));
      }

      const user = storedUsers.find((u: any) => u.username === username && u.password === password);

      if (user) {
        localStorage.setItem('darksecret_me', JSON.stringify({
          id: user.id,
          username: user.username,
          nickname: user.nickname,
          role: user.role,
          profileImage: user.profileImage
        }));
        router.push('/profile');
      } else {
        setError('아이디 또는 비밀번호가 올바르지 않습니다.');
      }
    } catch (err) {
      setError('로그인 처리 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.container}>
      <div className={`${styles.card} animate-in`}>
        <div className={styles.logo}>
          <Zap size={64} fill="var(--accent)" />
        </div>
        <header className={styles.header}>
          <h1>DarkSecret</h1>
        </header>
        <form className={styles.form} onSubmit={handleLogin}>
          <div className={styles.inputGroup}>
            <label>아이디</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="아이디를 입력하세요"
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label>비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
              required
            />
          </div>
          {error && <p className={styles.errorMessage}>{error}</p>}
          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? '로그인 중...' : '로그인'}
          </button>
        </form>
      </div>
    </main>
  );
}
