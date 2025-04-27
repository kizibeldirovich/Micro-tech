const express = require('express');
const { SerialPort } = require('serialport');
const { Server } = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Укажите порт Arduino (найдите его в Arduino IDE)
const arduinoPort = new SerialPort({
    path: '/dev/cu.usbmodemXXXX', // Замените XXXX на ваш порт
    baudRate: 9600
});

app.use(express.static('public')); // Раздача статики

// Обработка данных с Arduino
arduinoPort.on('data', (data) => {
    try {
        const jsonData = JSON.parse(data.toString());
        io.emit('arduinoData', jsonData); // Отправка данных в браузер
    } catch (e) {
        console.log("Ошибка:", e);
    }
});

server.listen(3000, () => {
    console.log('Сервер запущен: http://localhost:3000');
});