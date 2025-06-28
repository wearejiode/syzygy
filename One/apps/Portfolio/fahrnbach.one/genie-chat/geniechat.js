// genieChat.js
import { createSparkleBurst, startGlowingBorder } from './sparkles.js';

const contactBtn = document.querySelector('.nav-contact-button');

let chatInitialized = false;
let session = {};

function createChatContainer() {
  const chatContainer = document.createElement('div');
  chatContainer.id = 'genie-container';
  chatContainer.innerHTML = `
    <div id="genie-chat-log"></div>
    <input id="genie-input" placeholder="Type here..." autocomplete="off" />
  `;
  document.body.appendChild(chatContainer);
  startGlowingBorder(chatContainer);
  return chatContainer;
}

function appendMessage(content, from = 'user', bubble = true) {
  const log = document.getElementById('genie-chat-log');
  const msg = document.createElement('div');
  msg.className = from;
  msg.textContent = content;
  if (!bubble) msg.classList.add('system'); // unbubbled system text
  log.appendChild(msg);
  log.scrollTop = log.scrollHeight;
}

async function fetchRiddle() {
  const res = await fetch('http://localhost:3001/riddle', {
    credentials: 'include',
  });
  const data = await res.json();
  appendMessage(data.riddle, 'genie', false);
}

async function verifyAnswer(answer) {
  const res = await fetch('http://localhost:3001/verify', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ answer }),
  });
  return await res.json();
}

async function askQuestion(question) {
  const res = await fetch('http://localhost:3001/ask', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question }),
  });
  return await res.json();
}

function initChat() {
  if (chatInitialized) return;
  chatInitialized = true;

  const chat = createChatContainer();
  createSparkleBurst(chat); // 🎆 Genie arrives

  fetchRiddle();

  const input = document.getElementById('genie-input');
  input.focus();

  input.addEventListener('keydown', async (e) => {
    if (e.key !== 'Enter') return;

    const value = input.value.trim();
    if (!value) return;

    appendMessage(value, 'user');
    input.value = '';

    if (!session.verified) {
      const result = await verifyAnswer(value);
      if (result.success) {
        session.verified = true;
        createSparkleBurst(chat); // 🎇 Correct answer
        appendMessage("✨ You may now ask your questions...", 'genie');
      } else {
        appendMessage("Hmm... that's not it. Try again!", 'genie');
      }
    } else {
      const result = await askQuestion(value);
      if (result.response) {
        appendMessage(result.response, 'genie');
        if (result.done) {
          appendMessage(result.message, 'genie', false);
        }
      } else {
        appendMessage("🧞‍♂️ Hmm... I encountered an error.", 'genie');
      }
    }
  });
}

contactBtn?.addEventListener('click', () => {
  initChat();
});