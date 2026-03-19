'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, Settings, UserPlus, MessageSquare, Edit3, Trash2, X, Camera, Check } from 'lucide-react';
import styles from './profile.module.css';

interface User {
  id: number;
  username: string;
  nickname: string;
  role: string;
  profileImage?: string;
}

export default function ProfilePage() {
  const [me, setMe] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Load current user and user list (if admin)
  useEffect(() => {
    fetchMe();
  }, []);

  const fetchMe = async () => {
    const res = await fetch('/api/me');
    if (res.ok) {
      const data = await res.json();
      setMe(data.user);
      if (data.user.role === 'admin') fetchUsers();
    } else {
      router.push('/login');
    }
    setLoading(false);
  };

  const fetchUsers = async () => {
    const res = await fetch('/api/user/list');
    if (res.ok) {
      const data = await res.json();
      setUsers(data.users);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' });
    router.push('/login');
  };

  if (loading) return <div className={styles.loading}>로드 중...</div>;
  if (!me) return null;

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>DarkSecret</div>
        <div className={styles.headerActions}>
          <button onClick={() => setIsSettingsOpen(true)} className={styles.iconBtn} title="설정">
            <Settings size={20} />
          </button>
          <button onClick={handleLogout} className={styles.iconBtn} title="로그아웃">
            <LogOut size={20} />
          </button>
        </div>
      </header>

      <section className={`${styles.content} animate-in`}>
        <div className={styles.profileCard}>
          <div className={styles.avatarLarge}>
            <img src={me.profileImage || `https://i.pravatar.cc/150?u=${me.id}`} alt={me.nickname} />
          </div>
          <h2>{me.nickname}</h2>
          <p className={styles.roleBadge}>{me.role === 'admin' ? '관리자' : '일반 사용자'}</p>
          
          <div className={styles.mainActions}>
            {me.role === 'admin' ? (
              <button onClick={() => setIsCreateOpen(true)} className={styles.primaryBtn}>
                <UserPlus size={20} /> 사용자 생성
              </button>
            ) : (
              <button onClick={() => router.push('/chat')} className={styles.primaryBtn}>
                <MessageSquare size={20} /> 관리자와 채팅하기
              </button>
            )}
          </div>
        </div>

        {me.role === 'admin' && (
          <div className={styles.userListSection}>
            <h3>사용자 목록</h3>
            <div className={styles.userGrid}>
              {users.map(user => (
                <div key={user.id} className={styles.userItem}>
                  <img src={user.profileImage || `https://i.pravatar.cc/150?u=${user.id}`} alt={user.nickname} />
                  <div className={styles.userInfo}>
                    <span className={styles.userNickname}>{user.nickname}</span>
                    <span className={styles.username}>@{user.username}</span>
                  </div>
                  <div className={styles.itemActions}>
                    <button onClick={() => router.push(`/chat?userId=${user.id}`)} className={styles.chatBtn}>
                      <MessageSquare size={18} />
                    </button>
                    <button className={styles.deleteBtn} onClick={async () => {
                      if(confirm('정말 삭제하시겠습니까?')) {
                        await fetch('/api/user/delete', { method: 'DELETE', body: JSON.stringify({ id: user.id }) });
                        fetchUsers();
                      }
                    }}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {isSettingsOpen && <SettingsModal user={me} onClose={() => { setIsSettingsOpen(false); fetchMe(); }} />}
      {isCreateOpen && <CreateUserModal onClose={() => { setIsCreateOpen(false); fetchUsers(); }} />}
    </main>
  );
}

// Sub-components (could be in separate files for larger projects)
function SettingsModal({ user, onClose }: { user: User, onClose: () => void }) {
  const [nickname, setNickname] = useState(user.nickname);
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState('');
  const [imgUrl, setImgUrl] = useState(user.profileImage);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await fetch('/api/user/update', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: user.id, username, nickname, password, profileImage: imgUrl }),
    });
    setLoading(false);
    onClose();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('/api/upload', { method: 'POST', body: formData });
    const data = await res.json();
    if (data.url) setImgUrl(data.url);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalCard}>
        <div className={styles.modalHeader}>
          <h3>계정 설정</h3>
          <button onClick={onClose}><X /></button>
        </div>
        <form onSubmit={handleUpdate} className={styles.modalForm}>
          <div className={styles.avatarEdit}>
            <img src={imgUrl || `https://i.pravatar.cc/150?u=${user.id}`} alt="Profile" />
            <label htmlFor="img-upload" className={styles.cameraIcon}><Camera size={16} /></label>
            <input id="img-upload" type="file" style={{display:'none'}} onChange={handleFileChange} />
          </div>
          <div className={styles.inputGroup}>
            <label>아이디</label>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
          </div>
          <div className={styles.inputGroup}>
            <label>닉네임</label>
            <input type="text" value={nickname} onChange={e => setNickname(e.target.value)} />
          </div>
          <div className={styles.inputGroup}>
            <label>새 비밀번호 (변경 시에만 입력)</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="********" />
          </div>
          <button type="submit" className={styles.submitBtn} disabled={loading}>저장하기</button>
        </form>
      </div>
    </div>
  );
}

function CreateUserModal({ onClose }: { onClose: () => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await fetch('/api/user/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, nickname }),
    });
    setLoading(false);
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalCard}>
        <div className={styles.modalHeader}>
          <h3>새 사용자 생성</h3>
          <button onClick={onClose}><X /></button>
        </div>
        <form onSubmit={handleCreate} className={styles.modalForm}>
          <div className={styles.inputGroup}>
            <label>아이디</label>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} required />
          </div>
          <div className={styles.inputGroup}>
            <label>비밀번호</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <div className={styles.inputGroup}>
            <label>닉네임</label>
            <input type="text" value={nickname} onChange={e => setNickname(e.target.value)} required />
          </div>
          <button type="submit" className={styles.submitBtn} disabled={loading}>생성하기</button>
        </form>
      </div>
    </div>
  );
}
