'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ChevronLeft, Send, CheckCircle } from 'lucide-react';
import styles from './chat.module.css';

interface Message {
  id: number;
  chatId: string;
  senderId: number;
  type: string;
  content: string;
  createdAt: string;
}

interface User {
  id: number;
  username: string;
  nickname: string;
  role: string;
}

// 실제 채팅 로직이 담긴 컴포넌트
function ChatContent() {
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');
  const router = useRouter();

  const [me, setMe] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(true);
  
  // 관리 모드용 상태
  const [isManageMode, setIsManageMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const scrollRef = useRef<HTMLDivElement>(null);

  // chatId 생성 로직: 관리자는 대상 userId가 필요하지만, 일반 사용자는 본인 ID 기반으로 자동 생성
  const chatId = me ? 
    (me.role === 'admin' ? (userId ? `admin_${userId}` : '') : `admin_${me.id}`) : '';

  useEffect(() => {
    const checkUser = async () => {
      const res = await fetch('/api/me');
      if (!res.ok) return router.push('/login');
      const data = await res.json();
      setMe(data.user);
    };
    checkUser();
  }, [router]);

  const fetchMessages = async () => {
    if (!chatId) return;
    try {
      const res = await fetch(`/api/messages?chatId=${chatId}`);
      if (res.ok) {
        const data = await res.json();
        setMessages(data.messages);
      }
    } catch (err) {
      console.error(err);
    } finally {
      // chatId가 없더라도 로딩 상태는 해제하여 화면이 멈추지 않게 함
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, [chatId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || !chatId) return;

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chatId, content: inputText, type: 'text' }),
      });
      if (res.ok) {
        setInputText('');
        fetchMessages();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 삭제 기능
  const toggleSelect = (id: number) => {
    if (!selectedIds.includes(id)) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter(sid => sid !== id));
    }
  };

  const handleClearAll = async () => {
    if (!confirm('정말 이 채팅방의 모든 내용을 비우시겠습니까?')) return;
    const res = await fetch('/api/messages', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chatId }),
    });
    if (res.ok) {
      setMessages([]);
      setIsManageMode(false);
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedIds.length === 0) return alert('삭제할 메시지를 먼저 선택해주세요.');
    if (!confirm(`${selectedIds.length}개의 메시지를 삭제하시겠습니까?`)) return;
    
    const res = await fetch('/api/messages', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messageIds: selectedIds }),
    });
    if (res.ok) {
      setMessages(messages.filter(m => !selectedIds.includes(m.id)));
      setSelectedIds([]);
      setIsManageMode(false);
    }
  };

  if (loading) return <div className={styles.loading}>채팅방 연결 중...</div>;

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <button onClick={() => router.push('/profile')} className={styles.backBtn}>
          <ChevronLeft /> 뒤로가기
        </button>
        <div className={styles.chatTitle}>
          {me?.role === 'admin' ? `사용자 대화 (${userId})` : 'DarkSecret 관리자'}
        </div>
        
        <div className={styles.headerActions}>
          {me?.role === 'admin' && (
            isManageMode ? (
              <div className={styles.manageActions}>
                <button onClick={handleClearAll} className={styles.clearBtn}>비우기</button>
                <button onClick={handleDeleteSelected} className={styles.deleteActionBtn}>삭제</button>
                <button onClick={() => { setIsManageMode(false); setSelectedIds([]); }} className={styles.cancelBtn}>취소</button>
              </div>
            ) : (
              <button onClick={() => setIsManageMode(true)} className={styles.manageToggleBtn} style={{ background: 'rgba(56, 189, 248, 0.1)', color: 'var(--accent)' }}>
                채팅 관리
              </button>
            )
          )}
        </div>
      </header>

      <div className={styles.messageList} ref={scrollRef}>
        {messages.map((msg) => {
          const isMine = msg.senderId === me?.id;
          const isSelected = selectedIds.includes(msg.id);
          
          return (
            <div 
              key={msg.id} 
              className={`${styles.message} ${isMine ? styles.myMessage : styles.otherMessage} ${isManageMode ? styles.selectableMessage : ''} ${isSelected ? styles.selected : ''}`}
              onClick={() => isManageMode && toggleSelect(msg.id)}
            >
              <div className={styles.checkboxContainer}>
                {isManageMode && (
                  <div className={`${styles.checkbox} ${isSelected ? styles.checked : ''}`}>
                    {isSelected && <CheckCircle size={14} color="white" />}
                  </div>
                )}
                <div className={styles.bubble}>
                  {msg.type === 'image' ? (
                    <img src={msg.content} alt="Sent" className={styles.sentImage} />
                  ) : (
                    msg.content
                  )}
                </div>
              </div>
              <span className={styles.time}>
                {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          );
        })}
      </div>

      <form onSubmit={handleSend} className={styles.inputArea}>

        <div className={styles.inputWrapper}>
          <input 
            value={inputText} 
            onChange={(e) => setInputText(e.target.value)}
            placeholder="메시지를 입력하세요..."
          />
        </div>
        <button type="submit" className={styles.sendBtn} disabled={!inputText.trim()}>
          <Send size={20} />
        </button>
      </form>
    </main>
  );
}

// 메인 페이지 컴포넌트 (Suspense 래핑)
export default function ChatPage() {
  return (
    <Suspense fallback={<div className={styles.loading}>로딩 중...</div>}>
      <ChatContent />
    </Suspense>
  );
}
