const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const newUser = new User({ username, password, role });
    await newUser.save();
    res.status(201).send({ message: 'Lietotājs reģistrēts veiksmīgi' });
  } catch (error) {
    res.status(500).send({ message: 'Kļūda reģistrējot lietotāju' });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).send({ message: 'Nepareizs lietotājvārds vai parole' });
    }
    const token = jwt.sign({ userId: user._id, role: user.role }, 'secretKey', { expiresIn: '1h' });
    res.status(200).send({ token });
  } catch (error) {
    res.status(500).send({ message: 'Kļūda pieslēdzoties' });
  }
};
