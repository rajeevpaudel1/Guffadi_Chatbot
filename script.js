const API_KEY = "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"; // DeepSeek API key
const chatBox = document.getElementById('chat-box');

function appendMessage(content, sender) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${sender}`;
  messageDiv.innerText = content;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage() {
  const input = document.getElementById('user-input');
  const userMessage = input.value.trim();
  if (!userMessage) return;

  appendMessage(userMessage, 'user');
  input.value = '';

  appendMessage("Thinking...", 'bot');

  const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: [{ role: "user", content: userMessage }]
    })
  });

  const data = await response.json();
  const botReply = data.choices?.[0]?.message?.content || "Sorry, I couldn't understand that.";
  
  // Remove "Thinking..." placeholder
  const thinkingMsg = document.querySelector('.bot:last-child');
  if (thinkingMsg) thinkingMsg.remove();

  appendMessage(botReply, 'bot');
}
