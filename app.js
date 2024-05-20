const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const binRoutes = require('./routes/binRoutes');
const userRoutes = require('./routes/userRoutes');
const optimizationRoutes = require('./routes/optimizationRoutes');
const notificationUtils = require('./utils/notifications');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
app.use(bodyParser.json());

const server = http.createServer(app);
const io = socketIo(server);

// Pievienoties MongoDB
mongoose.connect('mongodb://localhost/waste_management', { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/bins', binRoutes);
app.use('/users', userRoutes);
app.use('/optimize', optimizationRoutes);

// Reāllaika datu plūsma
io.on('connection', (socket) => {
  console.log('Lietotājs pievienojās');
  socket.on('disconnect', () => {
    console.log('Lietotājs atvienojās');
  });
});

app.locals.io = io;

// Sākt serveri
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Serveris darbojas uz porta ${port}`);
});

// Sūtīt paziņojumus
notificationUtils.sendDailyNotifications();
