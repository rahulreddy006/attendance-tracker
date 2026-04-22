# 🎓 Attendance Tracker (MERN Stack)

A full-stack Attendance Management System built using the MERN stack.
This application allows teachers to manage students, mark attendance, and track attendance percentage with smart warnings.

---

## 🚀 Live Demo

* 🌐 Frontend:https://attendance-tracker-navy-three.vercel.app/login
* ⚙️ Backend:https://attendance-tracker-z6nz.onrender.com

---

## 📌 Features

### 🔐 Authentication

* Teacher signup & login
* JWT-based authentication
* Protected routes

### 👨‍🎓 Student Management

* Add students
* View all students
* Delete students
* Filter by department & section

### 📊 Attendance System

* Mark attendance (Present / Absent)
* Prevent duplicate attendance for same day
* Store records per date

### 📈 Attendance Analytics

* Calculate attendance percentage
* Show status (Good / Low)
* Suggest required classes to reach 75%

### 🎨 UI/UX

* Clean dashboard layout
* Sidebar navigation
* Responsive design using Tailwind CSS

---

## 🛠️ Tech Stack

### Frontend

* React.js (Vite)
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js
* MongoDB (Atlas)
* Mongoose

### Authentication

* JWT (JSON Web Tokens)
* bcrypt (password hashing)

### Deployment

* Frontend: Vercel
* Backend: Render
* Database: MongoDB Atlas

---

## 📂 Project Structure

Attendance-Tracker/
│
├── client/ # Frontend (React + Vite)
│ ├── src/
│ └── .env
│
├── server/ # Backend (Node + Express)
│ ├── src/
│ └── .env
│
└── README.md

---

## ⚙️ Environment Variables

### Backend (`server/.env`)

MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000

### Frontend (`client/.env`)

VITE_API_URL=https://attendance-tracker-z6nz.onrender.com

---

## 🚀 Installation & Setup

### 1. Clone the repository

git clone https://github.com/rahulreddy006/attendance-tracker.git
cd attendance-tracker

---

### 2. Setup Backend

cd server
npm install
npm run dev

---

### 3. Setup Frontend

cd client
npm install
npm run dev

---

## 🔐 API Endpoints

### Auth

* POST `/teachers/signup`
* POST `/teachers/login`

### Students

* POST `/students`
* GET `/students`
* DELETE `/students/:id`

### Attendance

* POST `/attendance`
* GET `/attendance`
* GET `/attendance/percentage/:studentId`

---

## 🧠 Key Learnings

* Building full-stack applications with MERN
* Implementing JWT authentication
* Designing REST APIs
* Managing state in React
* Handling real-world validation & errors
* Deployment using Vercel & Render

---


## 👨‍💻 Author

**Rahul Reddy**

* GitHub: https://github.com/rahulreddy006
* LinkedIn:https://www.linkedin.com/in/rahulreddy-kattegummula/

---

## ⭐ If you like this project

Give it a ⭐ on GitHub and share it!
