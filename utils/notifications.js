const nodemailer = require('nodemailer');
const User = require('../models/userModel');

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
  // Šeit varētu ieviest loģiku, lai sūtītu ikdienas paziņojumus lietotājiem
};
