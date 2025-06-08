
// server.js
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import { v4 as uuidv4 } from 'uuid';

import { getTopMatches } from './utils/get-context.js';
import { askRAG } from './rag.js';
import redisClient from '../genie-session/redisClient.js';

import morgan from 'morgan';
import chalk from 'chalk';

//
import adminRoutes from '../admin-panel/Public/routes/routes/adminRoutes.js';

// ⛏️ Setup project root and .env path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, '../.env');
dotenv.config({ path: envPath });

const app = express();
const PORT = process.env.PORT || 3001;

// Routes
app.use('/admin', adminRoutes);

// Morgan setup
app.use(morgan((tokens, req, res) => {
  return [
    chalk.green(tokens.method(req, res)),
    chalk.cyan(tokens.url(req, res)),
    chalk.yellow(tokens.status(req, res)),
    chalk.magenta(tokens['response-time'](req, res) + ' ms')
  ].join(' ');
}));

// 🧩 Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

// 🧠 Redis Session Helpers
async function getSession(key) {
  const data = await redisClient.get(key);
  return data ? JSON.parse(data) : {};
}

async function saveSession(key, session) {
  await redisClient.set(key, JSON.stringify(session), {
    EX: 60 * 60 * 24, // 24 hours
  });
}

function getTodayKey() {
  const now = new Date();
  return now.toISOString().split('T')[0];
}

// 🍪 Session Cookie Setup
app.use((req, res, next) => {
  let sessionId = req.cookies.genia_session;

  if (!sessionId) {
    sessionId = uuidv4();
    res.cookie('genia_session', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24,
      sameSite: 'Lax',
    });
  }

  req.sessionId = sessionId;
  next();
});

// ❓ Riddles
const riddles = [
  { q: "I speak without a mouth and hear without ears. What am I?", a: "echo" },
  { q: "I have keys but no locks. I have space but no room. What am I?", a: "keyboard" },
];

app.get('/riddle', async (req, res) => {
  const riddle = riddles[Math.floor(Math.random() * riddles.length)];
  const session = await getSession(req.sessionId);
  session.riddleAnswer = riddle.a;
  await saveSession(req.sessionId, session);
  res.json({ riddle: riddle.q });
  console.log(chalk.blue('🔍 Riddle answer set for session:'), req.sessionId);
});


app.post('/verify', async (req, res) => {
  const { answer } = req.body;
  const session = await getSession(req.sessionId);

  if (!session) return res.status(400).json({ error: 'Session not found' });

  const normalized = answer?.trim().toLowerCase();
  const correct = session.riddleAnswer?.toLowerCase() === normalized;
  const magicWord = process.env.MAGIC_WORD?.toLowerCase() === normalized;

  if (correct || magicWord) {
    session.verified = true;
    if (magicWord) session.magic = true;
    await saveSession(req.sessionId, session);
    return res.json({ success: true, magic: !!magicWord });
  }

  return res.status(403).json({ error: 'Wrong answer.' });
});

app.post('/ask', async (req, res) => {
  const { question } = req.body;
  const todayKey = getTodayKey();
  const session = await getSession(req.sessionId);

  if (!session?.verified) {
    return res.status(403).json({ error: "🧞 Solve the riddle to continue." });
  }

  session.counts = session.counts || {};
  session.counts[todayKey] = session.counts[todayKey] || 0;

  if (!session.magic && session.counts[todayKey] >= 3) {
    return res.json({
      message: "🧞‍♂️ You’ve used your 3 wishes for today.\nIf you seek to know more, speak to the summoner:\n [Jacob’s contact info] \n [Resume](https://your-resume-link)\n📅 [Book a time](https://calendly.com/your-link) ",
      done: true,
    });
  }

  try {
    const context = await getTopMatches(question);
    const response = await askRAG(question, context);

    session.counts[todayKey] += 1;
    await saveSession(req.sessionId, session);

    res.json({ response, remaining: 3 - session.counts[todayKey] });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Something went wrong." });
  }
});

app.listen(PORT, () => {
  console.log(`🧞 GenIA server running on http://localhost:${PORT}`);
});
