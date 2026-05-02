const mongoose = require('mongoose');

const insightSchema = new mongoose.Schema({
  topic: { type: String, required: true },
  mentions: { type: String, required: true },
  trend: { type: String, enum: ['up', 'down', 'stable'], required: true }
}, { timestamps: true });

module.exports = mongoose.model('Insight', insightSchema);
