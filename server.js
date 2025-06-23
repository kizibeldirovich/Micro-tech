const express = require('express');
const { Server } = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Имитация данных Arduino
function simulateArduino() {
    setInterval(() => {
        const mockData = {
            in: Math.floor(Math.random() * 10),       // Случайное число "вошедших"
            out: Math.floor(Math.random() * 5),       // Случайное число "вышедших"
            people: Math.floor(Math.random() * 10),   // Людей в комнате
            speed: Math.floor(Math.random() * 255),   // Случайная скорость мотора
            motorStatus: Math.random() > 0.5          // Случайный статус мотора
        };
        io.emit('arduinoData', mockData);
        console.log("Mock data:", mockData);
    }, 2000);
}

app.use(express.static('public'));

server.listen(3000, () => {
    console.log('Сервер запущен: http://localhost:3000');
    simulateArduino();
});
