const nodemailer = require('nodemailer');
const User = require('../models/userModel');
const Bin = require('../models/binModel');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password'
  }
});

exports.notifyAdmins = async (message) => {
  try {
    const admins = await User.find({ role: 'admin' });
    admins.forEach(admin => {
      transporter.sendMail({
        from: 'your-email@gmail.com',
        to: admin.email,
        subject: 'Jauns atkritumu tvertnes ziņojums',
        text: message
      });
    });
  } catch (error) {
    console.log('Kļūda sūtot paziņojumus administratoriem:', error);
  }
};

exports.sendDailyNotifications = async () => {
  try {
    const users = await User.find();
    const bins = await Bin.find();

    users.forEach(user => {
      let personalizedMessage = 'Šodienas atkritumu savākšanas ziņojums:\n\n';
      bins.forEach(bin => {
        personalizedMessage += `Tvertne: ${bin.location}, Statuss: ${bin.status}\n`;
      });

      transporter.sendMail({
        from: 'your-email@gmail.com',
        to: user.email,
        subject: 'Dienas atkritumu savākšanas ziņojums',
        text: personalizedMessage
      });
    });
  } catch (error) {
    console.log('Kļūda sūtot ikdienas paziņojumus:', error);
  }
};
