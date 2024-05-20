const mongoose = require('mongoose');

const binSchema = new mongoose.Schema({
  location: String,
  status: { type: String, enum: ['empty', 'half_full', 'full'], default: 'empty' },
  reportTime: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Bin', binSchema);
