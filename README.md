# 📝 User Feedback System

A full-stack web application for collecting, managing, and visualizing user feedback. Built with **React**, **Node.js**, **Express**, and **MongoDB**.

## 📊 Features

- User-friendly feedback submission form
- Dashboard to view, filter, and sort feedback
- RESTful API for feedback management
- Responsive design for mobile and desktop
- Form validation on both client and server sides
- Feedback categorization
- Pagination for large datasets

## 📁 Project Structure

```
user-feedback-system/
├── server/               # Backend - Node.js/Express application
│   ├── config/           # Configuration files
│   ├── controllers/      # Route handler functions (controllers)
│   ├── models/           # Mongoose models or database schemas
│   ├── routes/           # Express route definitions
│   ├── utils/            # Utility/helper functions
│   ├── .env.example      # Sample environment variables file
│   ├── .gitignore        # Git ignore rules for backend
│   ├── index.js          # Entry point for the backend server
│   └── package.json      # Backend dependencies and scripts
├── client/               # Frontend - React application
│   ├── public/           # Public assets
│   ├── src/              # Source code for React app
│   │   ├── components/   # Reusable React components
│   │   ├── pages/        # Page-level components (e.g., Dashboard)
│   │   ├── services/     # API service functions
│   │   ├── App.js        # Root component of the React app
│   │   └── index.js      # Entry point for React rendering
│   ├── package.json      # Frontend dependencies and scripts
│   ├── .env.example      # Sample environment variables file
│   └── .gitignore        # Git ignore rules for frontend
└── README.md             # Project overview and documentation

```

## 🛠️ Technology Stack

- **Frontend** : React, React Toastify, Styled Components
- **Backend** : Node.js, Express
- **Database** : MongoDB (Mongoose)

## 🚀 Getting Started

### 📋 Prerequisites

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

---

### 🔧 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/r1tikpatil/user-feedback-system.git
   cd user-feedback-system
   ```

2. Set up backend:

   ```bash
   cd backend
   npm install
   ```

3. Create a .env file in the server/ directory with the following variables:

   ```bash
   PORT=8000
   MONGODB_URI=mongodb://localhost:27017/feedback-system
   ```

4. Set up the frontend:

   ```bash
   cd ../client
   npm install
   ```

5. Create a `.env` file in the client/ directory:
   ```
   REACT_APP_API_URL=http://localhost:8000/api
   ```

### ▶️ Running the Application

1. Start MongoDB service (if using local MongoDB)

2. Start the backend server:

   ```bash
   cd server
   npm run dev
   ```

3. Open a new terminal

4. Start the frontend React app:

   ```bash
   cd client
   npm start
   ```
