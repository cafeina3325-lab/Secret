'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeft, Image as ImageIcon, Send, Paperclip } from 'lucide-react';
import { io, Socket } from 'socket.io-client';
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
  const [socket, setSocket] = useState<Socket | null>(null);
  const [loading, setLoading] = useState(true);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 1. Load User & Setup ChatId
  useEffect(() => {
    const init = async () => {
      const res = await fetch('/api/me');
      if (!res.ok) return router.push('/login');
      const data = await res.json();
      setMe(data.user);

      let targetUserId = searchParams.get('userId');
      if (data.user.role === 'admin') {
        if (!targetUserId) return router.push('/profile');
        setChatId(`admin_${targetUserId}`);
      } else {
        setChatId(`admin_${data.user.id}`);
      }
      setLoading(false);
    };
    init();
  }, [searchParams]);

  // 2. Setup Socket & Load History
  useEffect(() => {
    if (!chatId || !me) return;

    const newSocket = io();
    setSocket(newSocket);

    newSocket.emit('join', chatId);

    fetch(`/api/messages?chatId=${chatId}`)
      .then(res => res.json())
      .then(data => setMessages(data.messages));

    newSocket.on('receiveMessage', (msg: Message) => {
      setMessages(prev => [...prev, msg]);
    });

    return () => { newSocket.close(); };
  }, [chatId, me]);

  // 3. Auto Scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (type: 'text' | 'image' = 'text', content: string = input) => {
    if (!content.trim() || !me || !socket) return;

    const msgData = {
      chatId,
      senderId: me.id,
      type,
      content,
      createdAt: new Date().toISOString()
    };

    // DB 저장은 소켓 서버에서 처리하거나 별도 API 호출 (여기서는 단순화를 위해 실시간 전송 후 기록 방식 고려 가능하지만 요구사항은 'Server logic: message saved in database')
    // 실제로는 API를 통해 저장하고 소켓은 알림용으로 쓰거나, 소켓 서버에서 DB 저장을 수행해야 함.
    // 커스텀 server.js에서 DB 저장을 수행하도록 로직을 보강하는 것이 좋음.
    
    socket.emit('sendMessage', msgData);
    if(type === 'text') setInput('');
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/upload', { method: 'POST', body: formData });
    const data = await res.json();
    if (data.url) {
      handleSend('image', data.url);
    } else {
      alert(data.error);
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
          {me?.role === 'admin' ? `사용자 대화 (${chatId})` : 'DarkSecret 관리자'}
        </div>
        <div style={{width: 80}}></div>
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
