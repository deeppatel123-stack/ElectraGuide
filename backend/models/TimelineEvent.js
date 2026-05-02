const mongoose = require('mongoose');

const timelineEventSchema = new mongoose.Schema({
  date: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, enum: ['past', 'current', 'future'], required: true },
  icon: { type: String, required: true },
  imageUrl: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('TimelineEvent', timelineEventSchema);
