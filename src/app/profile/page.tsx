'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, MessageSquare, X, Camera, UserPlus, Settings, LogOut } from 'lucide-react';
import styles from './profile.module.css';

// 이미지 리사이징 헬퍼 함수
const resizeImage = (file: File, maxWidth: number = 1000): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxWidth) {
            width *= maxWidth / height;
            height = maxWidth;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        // 품질을 0.8로 설정하여 용량을 대폭 줄임
        resolve(canvas.toDataURL('image/jpeg', 0.8));
      };
    };
  });
};

interface User {
  id: number;
  username: string;
  nickname: string;
  role: string;
  profileImage?: string;
  createdAt?: string;
}

export default function ProfilePage() {
  const [me, setMe] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [zoomedImg, setZoomedImg] = useState<string | null>(null);
  
  const router = useRouter();

  const fetchData = async () => {
    try {
      const meRes = await fetch('/api/me');
      if (!meRes.ok) return router.push('/login');
      const meData = await meRes.json();
      setMe(meData.user);

      if (meData.user.role === 'admin') {
        const usersRes = await fetch('/api/users');
        const usersData = await usersRes.json();
        setUsers(usersData.users || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [router]);

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' });
    router.push('/login');
  };

  const deleteUser = async (userId: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    const res = await fetch(`/api/users?userId=${userId}`, { method: 'DELETE' });
    if (res.ok) {
      setUsers(users.filter(u => u.id !== userId));
    }
  };

  if (loading) return <div className={styles.loading}>정보를 불러오는 중...</div>;
  if (!me) return null;

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1>My Profile</h1>
        <button onClick={handleLogout} className={styles.logoutBtn}>
          <LogOut size={20} /> 로그아웃
        </button>
      </header>

      <section className={styles.profileCard}>
        <div className={styles.avatarLarge}>
          <img src={me.profileImage || `https://i.pravatar.cc/150?u=${me.id}`} alt="Profile" />
        </div>
        <div className={styles.info}>
          <div className={styles.nameSection}>
            <h2>{me.nickname}</h2>
            <p className={styles.roleBadge}>{me.role === 'admin' ? '관리자' : '일반 사용자'}</p>
          </div>
          
          <div className={styles.mainActions}>
            {me.role === 'admin' ? (
              <button onClick={() => setIsCreateOpen(true)} className={styles.primaryBtn}>
                <UserPlus size={20} /> 사용자 생성
              </button>
            ) : (
              <button onClick={() => router.push('/chat')} className={styles.primaryBtn}>
                <MessageSquare size={20} /> 채팅하기
              </button>
            )}
            <button onClick={() => setIsSettingsOpen(true)} className={styles.iconBtn}>
              <Settings size={20} />
            </button>
          </div>
        </div>
      </section>

      {me.role === 'admin' && (
        <section className={styles.userListSection}>
          <h3>사용자 관리 ({users.length})</h3>
          <div className={styles.userGrid}>
            {users.map(user => (
              <div key={user.id} className={styles.userCard}>
                <div className={styles.userCardContent} onClick={() => setSelectedUser(user)}>
                  <img src={user.profileImage || `https://i.pravatar.cc/80?u=${user.id}`} alt={user.nickname} />
                  <div className={styles.userCardInfo}>
                    <p className={styles.userNickname}>{user.nickname}</p>
                    <p className={styles.username}>@{user.username}</p>
                  </div>
                </div>
                <div className={styles.userActions}>
                  <button className={styles.chatBtn} onClick={() => router.push(`/chat?userId=${user.id}`)}>
                    <MessageSquare size={18} />
                  </button>
                  <button className={styles.deleteBtn} onClick={() => deleteUser(user.id)}>
                    <X size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {isSettingsOpen && <SettingsModal user={me} onUpdated={fetchData} onClose={() => setIsSettingsOpen(false)} />}
      {isCreateOpen && <CreateUserModal onCreated={(newUser: any) => {
        setUsers([newUser, ...users]);
        setIsCreateOpen(false);
      }} onClose={() => setIsCreateOpen(false)} />}
      
      {selectedUser && <UserDetailModal 
        user={selectedUser} 
        onImageClick={(url) => setZoomedImg(url)} 
        onUpdated={fetchData} 
        onClose={() => setSelectedUser(null)} 
      />}
      
      {zoomedImg && (
        <div className={styles.zoomedOverlay} onClick={() => setZoomedImg(null)}>
          <img src={zoomedImg} alt="Zoomed" />
        </div>
      )}
    </main>
  );
}

function UserDetailModal({ user, onImageClick, onUpdated, onClose }: { user: User, onImageClick: (url: string) => void, onUpdated: () => void, onClose: () => void }) {
  const profileImg = user.profileImage || `https://i.pravatar.cc/300?u=${user.id}`;
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(user.username);
  const [nickname, setNickname] = useState(user.nickname);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          userId: user.id, 
          username, 
          nickname, 
          password: password || undefined 
        }),
      });

      if (res.ok) {
        alert('유저 정보가 수정되었습니다.');
        onUpdated();
        setIsEditing(false); // 다시 상세 보기로 돌아감
      } else {
        const data = await res.json();
        alert(data.error || '수정 중 오류가 발생했습니다.');
      }
    } catch (err) {
      console.error(err);
      alert('서버 통신 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3>{isEditing ? '유저 계정 수정' : '유저 상세 정보'}</h3>
          <button onClick={onClose}><X /></button>
        </div>
        <div className={styles.userDetailContent}>
          <div className={styles.avatarHuge} onClick={() => onImageClick(profileImg)} style={{ cursor: 'zoom-in' }}>
            <img src={profileImg} alt="Large Profile" />
          </div>
          
          <div className={styles.detailList}>
            {isEditing ? (
              <>
                <div className={styles.inputGroup}>
                  <label>아이디</label>
                  <input value={username} onChange={e => setUsername(e.target.value)} />
                </div>
                <div className={styles.inputGroup}>
                  <label>닉네임</label>
                  <input value={nickname} onChange={e => setNickname(e.target.value)} />
                </div>
                <div className={styles.inputGroup}>
                  <label>비밀번호 (변경 시에만 입력)</label>
                  <input 
                    type="password" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    placeholder="새 비밀번호 입력"
                  />
                </div>
              </>
            ) : (
              <>
                <div className={styles.detailItem}>
                  <span className={styles.label}>아이디</span>
                  <span className={styles.value}>{user.username}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.label}>닉네임</span>
                  <span className={styles.value}>{user.nickname}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.label}>역할</span>
                  <span className={styles.value}>{user.role === 'admin' ? '관리자' : '일반 사용자'}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.label}>가입일</span>
                  <span className={styles.value}>
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '정보 없음'}
                  </span>
                </div>
              </>
            )}
          </div>

          <div className={styles.modalActions}>
            {isEditing ? (
              <>
                <button onClick={() => setIsEditing(false)} className={styles.cancelBtn}>취소</button>
                <button 
                  onClick={handleUpdate} 
                  className={styles.primaryBtn} 
                  disabled={loading}
                  style={{ flex: 1, justifyContent: 'center', whiteSpace: 'nowrap' }}
                >
                  {loading ? '저장 중...' : '저장하기'}
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => setIsEditing(true)} 
                  className={styles.cancelBtn} 
                  style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap' }}
                >
                  <Settings size={18} /> 계정 관리
                </button>
                <button 
                  onClick={onClose} 
                  className={styles.primaryBtn} 
                  style={{ flex: 1, justifyContent: 'center', whiteSpace: 'nowrap' }}
                >
                  닫기
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingsModal({ user, onUpdated, onClose }: { user: User, onUpdated: () => void, onClose: () => void }) {
  const [username, setUsername] = useState(user.username);
  const [nickname, setNickname] = useState(user.nickname);
  const [password, setPassword] = useState('');
  const [imgUrl, setImgUrl] = useState(user.profileImage || '');
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch('/api/me', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, nickname, password: password || undefined, profileImage: imgUrl }),
    });

    if (res.ok) {
        onUpdated();
        onClose();
    } else {
        // 413 Content Too Large 등 JSON이 아닌 에러 대응
        const contentType = res.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            const data = await res.json();
            alert(data.error);
        } else {
            const text = await res.text();
            if (res.status === 413) {
                alert('이미지 용량이 너무 큽니다. 더 작은 이미지를 선택해주세요. (Vercel 제한)');
            } else {
                alert('업데이트 중 오류가 발생했습니다.');
            }
        }
    }
    setLoading(false);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // 리사이징을 통해 용량 4.5MB(Vercel 제한) 이하로 최적화
    const resizedDataUrl = await resizeImage(file);
    setImgUrl(resizedDataUrl);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h3>프로필 설정</h3>
          <button onClick={onClose}><X /></button>
        </div>
        <form onSubmit={handleUpdate} className={styles.form}>
          <div className={styles.avatarEdit}>
            <img src={imgUrl || `https://i.pravatar.cc/150?u=${user.id}`} alt="Profile" />
            <label htmlFor="img-upload-edit" className={styles.cameraIcon}><Camera size={16} /></label>
            <input id="img-upload-edit" type="file" style={{ display: 'none' }} onChange={handleFileChange} />
          </div>
          <div className={styles.inputGroup}>
            <label>아이디 (로그인 ID)</label>
            <input value={username} onChange={e => setUsername(e.target.value)} required />
          </div>
          <div className={styles.inputGroup}>
            <label>닉네임</label>
            <input value={nickname} onChange={e => setNickname(e.target.value)} required />
          </div>
          <div className={styles.inputGroup}>
            <label>새 비밀번호 (변경시에만 입력)</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="비밀번호 변경 시 입력" />
          </div>
          <div className={styles.modalActions}>
            <button type="button" onClick={onClose} className={styles.cancelBtn}>취소</button>
            <button type="submit" className={styles.primaryBtn} disabled={loading}>저장하기</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function CreateUserModal({ onCreated, onClose }: { onCreated: (u: any) => void, onClose: () => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, nickname }),
    });

    const data = await res.json();
    if (res.ok) {
      onCreated(data.user);
    } else {
      alert(data.error);
    }
    setLoading(false);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h3>사용자 생성</h3>
          <button onClick={onClose}><X /></button>
        </div>
        <form onSubmit={handleCreate} className={styles.form}>
          <div className={styles.inputGroup}>
            <label>아이디</label>
            <input value={username} onChange={e => setUsername(e.target.value)} required />
          </div>
          <div className={styles.inputGroup}>
            <label>비밀번호</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <div className={styles.inputGroup}>
            <label>닉네임</label>
            <input value={nickname} onChange={e => setNickname(e.target.value)} required />
          </div>
          <button type="submit" className={styles.primaryBtn} disabled={loading}>생성하기</button>
        </form>
      </div>
    </div>
  );
}
