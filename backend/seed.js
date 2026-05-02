require('dotenv').config();
const mongoose = require('mongoose');
const Poll = require('./models/Poll');
const Insight = require('./models/Insight');
const TimelineEvent = require('./models/TimelineEvent');

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB for seeding');
    seedData(); // Run seed only after successful connection
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    console.log('TIP: Check if your IP address is whitelisted in MongoDB Atlas (Network Access tab).');
    process.exit(1);
  });

const seedData = async () => {
  try {
    // Clear existing data
    await Poll.deleteMany({});
    await Insight.deleteMany({});
    await TimelineEvent.deleteMany({});

    // Seed Polls
    await Poll.insertMany([
      {
        title: "Prop 12: Urban Renewal",
        description: "Funding allocation for metropolitan green spaces and public transit.",
        participants: "12,450",
        timeLeft: "48 hours",
        options: [
          { label: "For", percentage: 62 },
          { label: "Against", percentage: 38 }
        ]
      },
      {
        title: "Measure C: Education Tech",
        description: "State-wide integration of digital tablets in elementary schools.",
        participants: "8,200",
        timeLeft: "5 days",
        options: [
          { label: "For", percentage: 45 },
          { label: "Against", percentage: 55 }
        ]
      }
    ]);

    // Seed Insights
    await Insight.insertMany([
      { topic: "Healthcare Reform", mentions: "45K", trend: "up" },
      { topic: "Property Taxes", mentions: "32K", trend: "stable" },
      { topic: "Zoning Laws", mentions: "18K", trend: "down" },
      { topic: "Tech Regulation", mentions: "12K", trend: "up" }
    ]);

    // Seed Timeline Events
    await TimelineEvent.insertMany([
      {
        date: "Oct 15",
        title: "Voter Registration Deadline",
        description: "Last day to register to vote online or postmark your mail-in application. Ensure your status is verified through our secure portal.",
        type: "past",
        icon: "how_to_reg",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCLt-Jim-hOkEdCfitzaOXQsmDpEDHasRIgbOWerPOXeG55TfaqJYFX2YpGRZU7EPQFD8ENAQBWP6ysidUsEjxkTlOrZLJ0puuMTxppOTUaLlaQv4H2O0uNg9-lPlwGU23g0LnFqw81BWGlRCHBVUbp-U9tKs7ZEvNfcMcrvk2bdz8hNMGApuo2qC_DFgBs0FY1DJYI5Bedr9N4oFcrERistwE4Z9LU-KdSQQdeVjomRAH10yASpWtRZM3TGRcWfEaSCOW2NWOYpp8"
      },
      {
        date: "Oct 20",
        title: "Early Voting Begins",
        description: "Polling stations open for early, in-person voting across all districts. Check our interactive map for wait times and location accessibility features.",
        type: "current",
        icon: "where_to_vote",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAMxejNOgEjZ8PbkNPsA6VmGvCDUTPg00VysUmnungqtwCwWvQHaoX0uNFFkm11jRlF-YtVFHymWTnhKzDhx21FRVAEjUz8BSd4dshBQpgqWvyECU3P_ElISMT0Ly0ZoF5myGnLjj8NREB8pbj3Jt2JIctytUHXSumlpmnGpymq7E4tZHHBHyEOQtFf2WHNS92xuKQKENb2o2dm5qnc_MPQMKKc87odCz65uNNBIvUBp2j5Km3vTDM6_eHDSB6aTVYlZljZOtTsrp0"
      },
      {
        date: "Nov 5",
        title: "Election Day",
        description: "Main election day. Polls are open from 7:00 AM to 8:00 PM. Real-time insights and AI-powered ballot analysis available in-app.",
        type: "future",
        icon: "event",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBp0naR6smz15VF53VnoUYaaoTGPTUsZhPagBh3jPjP63sMdDqPpylTqAO_Ne84jSMYe0MSvCVYkIUmxBWg5Q0D_w8QPpQPar39wxwFQkkIOAUl2nah1lao07vW6Hr-NLfFiNsaSmC5tFCo2oG3jzCDpEkQNz_OIWv8GhtE_VZvLeTjLvNlKtH1MWrxxmsOEtwgMifGbIxORDTnoEHyLOjg2t_-OqFP6rll-NjqNnGUyDMFzs6xWjKCibT5BtjRSKWwvKF3GYbigOU"
      }
    ]);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};
