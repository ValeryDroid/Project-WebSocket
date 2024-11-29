const WebSocket = require('ws');
const http = require('http');

const server = http.createServer();
const wss = new WebSocket.Server({ server});
wss.on('connection', (ws) => {
    console.log('Новый пользователь подключён');
    ws.send('Добро пожаловать в чат!');
    ws.on('message', (message) => {
        console.log('Получено сообщение:' , message);
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });
    ws.on('close', () => {
        console.log('Клиент отключился');
    });
});

server.listen(8080, () => {
    console.log('Сервер WebSocket запущен на порту 8080');
});