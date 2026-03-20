'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeft, Image as ImageIcon, Send } from 'lucide-react';
import styles from './chat.module.css';

interface Message {
  id?: number;
  chatId: string;
  senderId: number;
  type: 'text' | 'image';
  content: string;
  createdAt: string;
}

interface User {
  id: number;
  nickname: string;
  role: string;
}

function ChatContent() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [me, setMe] = useState<User | null>(null);
  const [chatId, setChatId] = useState('');
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const searchParams = useSearchParams();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 1. Load User & Setup ChatId
  useEffect(() => {
    const meData = localStorage.getItem('darksecret_me');
    if (!meData) {
      router.push('/login');
      return;
    }

    const user = JSON.parse(meData);
    setMe(user);

    let targetUserId = searchParams.get('userId');
    if (user.role === 'admin') {
      if (!targetUserId) {
        router.push('/profile');
        return;
      }
      setChatId(`admin_${targetUserId}`);
    } else {
      setChatId(`admin_${user.id}`);
    }
    setLoading(false);
  }, [searchParams, router]);

  // 2. Load History & Simulate Updates
  useEffect(() => {
    if (!chatId) return;

    const loadMessages = () => {
      const allMessages = JSON.parse(localStorage.getItem('darksecret_messages') || '[]');
      const chatMessages = allMessages.filter((m: Message) => m.chatId === chatId);
      setMessages(chatMessages);
    };

    loadMessages();

    // 로컬 스토리지 변경 감지
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'darksecret_messages') loadMessages();
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [chatId]);

  // 3. Auto Scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (type: 'text' | 'image' = 'text', content: string = input) => {
    if (!content.trim() || !me || !chatId) return;

    const newMsg: Message = {
      id: Date.now(),
      chatId,
      senderId: me.id,
      type,
      content,
      createdAt: new Date().toISOString()
    };

    const allMessages = JSON.parse(localStorage.getItem('darksecret_messages') || '[]');
    allMessages.push(newMsg);
    localStorage.setItem('darksecret_messages', JSON.stringify(allMessages));

    setMessages(prev => [...prev, newMsg]);
    if (type === 'text') setInput('');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      handleSend('image', reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  if (loading) return <div className={styles.loading}>채팅방 연결 중...</div>;

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <button onClick={() => router.push('/profile')} className={styles.backBtn}>
          <ChevronLeft /> 뒤로가기
        </button>
        <div className={styles.chatTitle}>
          {me?.role === 'admin' ? `사용자 대화 (${chatId})` : 'DarkSecret 상대방'}
        </div>
        <div style={{ width: 80 }}></div>
      </header>

      <div className={styles.messageList}>
        {messages.map((msg, i) => (
          <div key={i} className={`${styles.message} ${msg.senderId === me?.id ? styles.myMessage : styles.otherMessage} animate-in`}>
            <div className={styles.bubble}>
              {msg.type === 'image' ? (
                <img src={msg.content} alt="전송 이미지" className={styles.sentImage} />
              ) : (
                msg.content
              )}
            </div>
            <span className={styles.time}>
              {new Date(msg.createdAt).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <footer className={styles.inputArea}>
        <label className={styles.iconBtn}>
          <ImageIcon size={24} />
          <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
        </label>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            placeholder="메시지를 입력하세요..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
          />
        </div>
        <button onClick={() => handleSend()} className={styles.sendBtn} disabled={!input.trim()}>
          <Send size={20} />
        </button>
      </footer>
    </main>
  );
}

export default function ChatPage() {
  return (
    <Suspense fallback={<div className={styles.loading}>채팅 일시 대기 중...</div>}>
      <ChatContent />
    </Suspense>
  );
}
