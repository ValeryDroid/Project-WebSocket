const WebSocket = require('ws');
const http = require('http');

const server = http.createServer();
const wss = new WebSocket.Server({ server});
wss.on('connection', (ws) => {
    console.log('Новый пользователь подключён');
    ws.send(JSON.stringify({text:'Добро пожаловать в чат!'}));
    ws.on('message', (message) => {
        let text = JSON.parse(message)
        console.log('Получено сообщение:' , text.text);
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(text));
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