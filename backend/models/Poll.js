const mongoose = require('mongoose');

const pollSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  participants: { type: String, required: true },
  timeLeft: { type: String, required: true },
  options: [{
    label: { type: String, required: true },
    percentage: { type: Number, required: true }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Poll', pollSchema);
