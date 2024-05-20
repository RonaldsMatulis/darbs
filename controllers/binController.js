const Bin = require('../models/binModel');
const notificationUtils = require('../utils/notifications');

exports.reportBin = async (req, res) => {
  try {
    const { location, status } = req.body;
    const newBin = new Bin({ location, status });
    await newBin.save();
    res.status(201).send(newBin);
    notificationUtils.notifyAdmins(`Jauns atkritumu tvertnes ziņojums: ${location} - ${status}`);
  } catch (error) {
    res.status(500).send({ message: 'Kļūda ziņojot par tvertni' });
  }
};

exports.getBins = async (req, res) => {
  try {
    const bins = await Bin.find();
    res.status(200).send(bins);
  } catch (error) {
    res.status(500).send({ message: 'Kļūda iegūstot tvertņu datus' });
  }
};

exports.getBinById = async (req, res) => {
  try {
    const bin = await Bin.findById(req.params.id);
    if (!bin) {
      return res.status(404).send({ message: 'Tvertne nav atrasta' });
    }
    res.status(200).send(bin);
  } catch (error) {
    res.status(500).send({ message: 'Kļūda iegūstot tvertnes datus' });
  }
};

exports.updateBinStatus = async (req, res) => {
  try {
    const bin = await Bin.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!bin) {
      return res.status(404).send({ message: 'Tvertne nav atrasta' });
    }
    res.status(200).send(bin);
  } catch (error) {
    res.status(500).send({ message: 'Kļūda atjauninot tvertnes statusu' });
  }
};
