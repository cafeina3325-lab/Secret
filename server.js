const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { Server } = require('socket.io');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('join', (chatId) => {
      socket.join(chatId);
      console.log(`Socket ${socket.id} joined room: ${chatId}`);
    });

    socket.on('sendMessage', async (data) => {
      try {
        const { PrismaClient } = require('@prisma/client');
        const prisma = new PrismaClient();
        
        // Save to DB
        const savedMsg = await prisma.message.create({
          data: {
            chatId: data.chatId,
            senderId: data.senderId,
            type: data.type,
            content: data.content,
            createdAt: new Date(data.createdAt),
          }
        });

        io.to(data.chatId).emit('receiveMessage', savedMsg);
      } catch (error) {
        console.error('Error saving message:', error);
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });

  const PORT = process.env.PORT || 3000;
  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
