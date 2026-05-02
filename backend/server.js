require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Poll = require('./models/Poll');
const Insight = require('./models/Insight');
const TimelineEvent = require('./models/TimelineEvent');

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// ----------------------------------------------------
// API Endpoints
// ----------------------------------------------------

// 1. Dashboard Data (Polls and Insights)
app.get('/api/dashboard', async (req, res) => {
  try {
    const polls = await Poll.find().sort({ createdAt: -1 });
    const insights = await Insight.find().sort({ createdAt: -1 });
    res.json({ polls, insights });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
});

// 2. Timeline Data
app.get('/api/timeline', async (req, res) => {
  try {
    const events = await TimelineEvent.find().sort({ date: 1 });
    res.json({ events });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch timeline data' });
  }
});

// 3. Eligibility Checker Mock
app.post('/api/eligibility', (req, res) => {
  const { location, details } = req.body;
  // Simulated logic
  setTimeout(() => {
    res.json({
      status: 'eligible',
      message: `You are eligible to vote in ${location}. Ensure you bring valid ID.`,
      registrationDeadline: 'Oct 15, 2024'
    });
  }, 1500); // Simulate network delay
});

// 4. Sophisticated AI Mock Engine
app.post('/api/chat', (req, res) => {
  const { message, context } = req.body;
  const lowercaseMsg = message.toLowerCase();
  
  let aiResponse = "";
  let type = "general";

  // Mocked sophisticated logic tree
  if (lowercaseMsg.includes('compare') || lowercaseMsg.includes('difference')) {
    aiResponse = `Based on recent public data, Candidate A focuses heavily on infrastructure and tech expansion, while Candidate B emphasizes healthcare reform and tax incentives for small businesses. Would you like a detailed breakdown on a specific sector?`;
    type = "comparison";
  } else if (lowercaseMsg.includes('policy') || lowercaseMsg.includes('bill')) {
    aiResponse = `The recent policies discussed in your jurisdiction mainly target renewable energy subsidies and educational grants. Historical data indicates a 60% bipartisan support rate for these initiatives.`;
    type = "policy";
  } else if (lowercaseMsg.includes('register') || lowercaseMsg.includes('vote') || lowercaseMsg.includes('where')) {
    aiResponse = `You can check your specific polling station and registration status directly on the Eligibility tab of this application. Generally, polls are open from 7 AM to 8 PM on election day.`;
    type = "logistics";
  } else {
    aiResponse = `I am ElectraGuide's AI assistant. I can analyze candidate histories, compare policy impacts, or guide you through the registration process. What specific data are you looking for?`;
  }

  // Simulate thinking delay to feel like a real AI
  setTimeout(() => {
    res.json({
      role: 'assistant',
      content: aiResponse,
      type: type,
      timestamp: new Date().toISOString()
    });
  }, 2000);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
