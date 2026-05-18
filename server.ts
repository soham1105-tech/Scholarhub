import express from 'express';
import path from 'path';
import { GoogleGenAI } from '@google/genai';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

// Initialize Gemini API
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

async function startServer() {
  console.log('Starting server...');
  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // API: Gemini Chat
  app.post('/api/chat', async (req, res) => {
    try {
      const { message } = req.body;
      
      if (!process.env.GEMINI_API_KEY) {
        return res.status(400).json({ 
          error: 'GEMINI_API_KEY is not set. Please add it in Settings > Secrets.' 
        });
      }

      console.log('Sending message to Gemini...');
      const chat = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: 'You are an elite academic assistant for ScholarHub. Provide concise, high-level academic help, focusing on STEM and humanities. Use Markdown for formatting.',
        },
      });

      const response = await chat.sendMessage({ message });
      res.json({ text: response.text });
    } catch (error: any) {
      console.error('Gemini Error:', error);
      res.status(500).json({ error: error.message || 'Failed to generate response' });
    }
  });

  // API: OAuth URL
  app.get('/api/auth/url', (req, res) => {
    const googleAuthUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
    const params = new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID || 'dummy_client_id',
      redirect_uri: `${req.protocol}://${req.get('host')}/auth/callback`,
      response_type: 'code',
      scope: 'openid email profile',
      access_type: 'offline',
      prompt: 'consent',
    });
    res.json({ url: `${googleAuthUrl}?${params.toString()}` });
  });

  // OAuth Callback
  app.get(['/auth/callback', '/auth/callback/'], (req, res) => {
    res.send(`
      <html>
        <body>
          <script>
            if (window.opener) {
              window.opener.postMessage({ type: 'OAUTH_AUTH_SUCCESS' }, '*');
              window.close();
            } else {
              window.location.href = '/home';
            }
          </script>
          <p>Authentication successful. Redirecting...</p>
        </body>
      </html>
    `);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    console.log('Environment: development. Loading Vite middleware...');
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    console.log('Environment: production. Serving static files from dist...');
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
