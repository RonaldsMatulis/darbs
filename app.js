const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const binRoutes = require('./routes/binRoutes');
const userRoutes = require('./routes/userRoutes');
const notificationUtils = require('./utils/notifications');

const app = express();
app.use(bodyParser.json());

// Pievienoties MongoDB
mongoose.connect('mongodb://localhost/waste_management', { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/bins', binRoutes);
app.use('/users', userRoutes);

// Sākt serveri
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Serveris darbojas uz porta ${port}`);
});

// Sūtīt paziņojumus
notificationUtils.sendDailyNotifications();
