// rag.js
import dotenv from 'dotenv';
import { fileURLToPath } from 'url'; 
import path from 'path';

// Setup __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from parent or root (adjust path as needed)
const envPath = path.resolve(__dirname, '../.env');
dotenv.config({ path: envPath });

// Now import the rest
import fs from 'fs/promises';
import OpenAI from 'openai/index.js';
import { embedText } from './utils/embedder.js';
import { findTopMatches } from './utils/search.js';
import { getTopMatches } from './utils/get-context.js';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const EMBEDDINGS_FILE = path.resolve(__dirname, './embeddings/data.json')

async function askRAG(question) {
  const queryEmbedding = await embedText(question);
  const dbRaw = await fs.readFile(EMBEDDINGS_FILE, 'utf-8');
  const db = JSON.parse(dbRaw);
  const matches = findTopMatches(queryEmbedding, db);

  const context = await getTopMatches(question);

  const messages = [
    {
      role: 'system',
      content: `You are a helpful assistant genie tasked with answering questions about Jacob Fahrnbach. 
      You are currently located at fahrnbach.one/contact (in the contact tab) and your goal is to help Jacob
       land an Engineering Role at an Ai or other forward thinking company. 
       You are to explain that you can grant the asker three 'Wishes' or questions. 
       After granting three questions, you are to direct the asker to Jacob's Contact information informing the user that: 
       If you'd like to know more, you must ask the one who conjured me [Jacob Fahrnbach] and provide a link to my resume [resume.fahrnabch.one] and a link to my calendly [calendly.link]
      Keep responses concise but focused — aim for 1 short paragraph max, unless detail is specifically requested. 
      Use emojis liberally when you can, and be sure to separate thoughts with linebreaks (/n). Be friendly, and feel free to be funny. 
      At the end or each question, suggest 1–2 follow-up questions the user might ask next.`,
    },
    {
      role: 'user',
      content: `${question}\n\nContext:\n${context}`,
    },
  ];

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages,
    temperature: 0.5,
  });

  console.log("\n🔎 Top matches used:");
  matches.forEach(m => console.log(`→ ${m.source}: ${m.content.slice(0, 60)}...`));

  const result = completion.choices[0].message.content;

  console.log("\n💬 GPT says:\n", result);
  return result;
}

// Only run this code when executed directly from the command line
if (import.meta.url === `file://${process.argv[1]}`) {
  const userQuestion = process.argv.slice(2).join(" ");
  if (!userQuestion) {
    console.log("Usage: node rag.js 'Your question here'");
    process.exit(1);
  }
  await askRAG(userQuestion);
}

// await askRAG(question);

export { askRAG };