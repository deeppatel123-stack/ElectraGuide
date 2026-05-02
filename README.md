# 🗳️ ElectraGuide (Backend)

ElectraGuide is a backend service designed to power an interactive platform that **educates users about the election process** through timelines, polls, and insights.

This project focuses on building scalable APIs for managing election-related data.

---

## 🚀 Features

* 📊 **Insights System**

  * Store and manage informative election data

* 🗳️ **Poll System**

  * Create and manage polls for user engagement

* 📅 **Election Timeline**

  * Track and display key election events

* 🌐 **REST API**

  * Built with Express.js for handling requests

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose

---

## 📁 Project Structure

```bash
backend/
│
├── models/
│   ├── Insight.js
│   ├── Poll.js
│   └── TimelineEvent.js
│
├── server.js        # Main server file
├── seed.js          # Database seeding script
├── package.json
└── .env
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/deeppatel123-stack/ElectraGuide.git
cd ElectraGuide/backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

---

## ▶️ Run the Project

```bash
npm run dev
```

OR

```bash
node server.js
```

---

## 🌱 Seed Database (Optional)

```bash
node seed.js
```

---

## 🔗 API Purpose

This backend provides APIs for:

* Managing election insights
* Creating and retrieving polls
* Handling election timeline events

---

## 🚧 Future Scope

* Add React frontend (MERN completion)
* User authentication system
* Real-time poll results
* Admin dashboard
* AI-based election guidance

---

## 👨‍💻 Author

Deep Patel

---

## 📄 License

MIT License
