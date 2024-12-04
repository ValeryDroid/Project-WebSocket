const socket = new WebSocket('ws://localhost:8080');
const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

socket.onmessage = (event) => {
    const message = document.createElement('div');
    message.textContent = JSON.parse(event.data).text;
    chatBox.appendChild(message);
    chatBox.scrollTop = chatBox.scrollHeight;
};

sendButton.onclick = () => {
    const message = messageInput.value;
    if (message) {
        socket.send(JSON.stringify({text:message}));
        messageInput.value = '';
    }
};

messageInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        sendButton.click();
    }
});