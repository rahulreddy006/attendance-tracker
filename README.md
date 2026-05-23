# Attendance Tracker (MERN Stack)

![MERN](https://img.shields.io/badge/Stack-MERN-green)
![React](https://img.shields.io/badge/Frontend-React-blue)
![Node.js](https://img.shields.io/badge/Backend-Node.js-brightgreen)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-success)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)
![License](https://img.shields.io/badge/License-MIT-yellow)

## Overview

Attendance Tracker is a full-stack Attendance Management System built using the MERN stack. The application enables teachers to manage students, mark attendance, and monitor attendance percentages with automated low-attendance analysis.

The platform includes secure JWT authentication, protected routes, attendance analytics, and a responsive dashboard UI optimized for academic workflows.

This project demonstrates real-world full-stack development practices including REST API development, authentication, database design, frontend-backend integration, deployment, and responsive UI development.

---

# Live Demo

## Frontend
https://attendance-tracker-navy-three.vercel.app/login

## Backend API
https://attendance-tracker-z6nz.onrender.com

---

# Features

## Authentication
- Teacher signup and login
- JWT-based authentication
- Protected frontend routes
- Protected backend APIs

## Student Management
- Add students
- View all students
- Delete students
- Filter by department and section

## Attendance System
- Mark attendance (Present / Absent)
- Prevent duplicate attendance for the same day
- Store attendance records by date

## Attendance Analytics
- Calculate attendance percentage
- Show attendance status (Good / Low)
- Suggest required classes to reach 75%

## UI / UX
- Responsive dashboard layout
- Sidebar navigation
- Tailwind CSS-based modern UI

---

# Tech Stack

## Frontend
- React.js (Vite)
- Tailwind CSS
- Axios

## Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose

## Authentication
- JWT (JSON Web Tokens)
- bcrypt.js

## Deployment
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

---

# Project Structure

```bash
Attendance-Tracker/
│
├── client/                     # Frontend (React + Vite)
│   ├── src/
│   │   ├── pages/              # Main application pages
│   │   ├── components/         # Reusable UI components
│   │   ├── services/           # API configuration
│   │   ├── App.jsx             # Routing configuration
│   │   └── main.jsx            # React entry point
│   │
│   ├── .env                    # Frontend environment variables
│   └── package.json
│
├── server/                     # Backend (Node + Express)
│   ├── src/
│   │   ├── controllers/        # Business logic
│   │   ├── middleware/         # Authentication middleware
│   │   ├── models/             # MongoDB schemas
│   │   └── routes/             # API routes
│   │
│   ├── .env                    # Backend environment variables
│   ├── server.js               # Backend entry point
│   └── package.json
│
└── README.md
```

---

# Environment Variables

## Backend (`server/.env`)

```env
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

## Frontend (`client/.env`)

```env
VITE_API_URL=https://attendance-tracker-z6nz.onrender.com
```

---

# Installation & Setup

## 1. Clone the Repository

```bash
git clone https://github.com/rahulreddy006/attendance-tracker.git
cd attendance-tracker
```

---

# Backend Setup

```bash
cd server
npm install
npm run dev
```

Backend runs on:

```txt
http://localhost:5000
```

---

# Frontend Setup

```bash
cd client
npm install
npm run dev
```

Frontend runs on:

```txt
http://localhost:5173
```

---

# API Endpoints

## Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/teacher/signup` | Register teacher |
| POST | `/teacher/login` | Login teacher |

---

## Students

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/students` | Create student |
| GET | `/students` | Get all students |
| DELETE | `/students/:id` | Delete student |

---

## Attendance

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/attendance` | Mark attendance |
| GET | `/attendance` | Get attendance by date |
| GET | `/attendance/percentage/:studentId` | Get attendance percentage |

---

# Authentication & Authorization

The application uses JWT-based authentication.

## Authentication Flow
1. Teacher logs in using email and password
2. Backend validates credentials
3. JWT token is generated
4. Token is stored in browser localStorage
5. Protected routes validate token access

## Security Features
- Password hashing using bcrypt
- JWT verification middleware
- Protected API routes
- Environment variable security

---

# Database

## Database Used
MongoDB Atlas

---

## Main Collections

### Teacher

```js
{
  name,
  email,
  password,
  department
}
```

### Student

```js
{
  name,
  rollNo,
  department,
  section
}
```

### Attendance

```js
{
  date,
  department,
 section,
  records: [
    {
      studentId,
      status
    }
  ]
}
```

---

# Scripts

## Frontend

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run preview` | Preview production build |

---

## Backend

| Script | Description |
|--------|-------------|
| `npm run dev` | Start backend using nodemon |
| `npm start` | Start production server |

---

# Key Learnings

- Building full-stack MERN applications
- Implementing JWT authentication
- Designing REST APIs
- MongoDB schema modeling
- Frontend-backend integration
- Handling validation and errors
- Deployment using Vercel and Render

---

# Deployment

## Frontend Deployment
The frontend is deployed on Vercel.

### Build Configuration

```txt
Framework: Vite
Root Directory: client
Build Command: npm run build
Output Directory: dist
```

---

## Backend Deployment
The backend is deployed on Render.

### Start Command

```bash
npm start
```

### Environment Variables

```env
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

---

# Future Improvements

- Edit attendance functionality
- Attendance analytics charts
- CSV/PDF export
- Student search and filtering
- Dark mode support
- Google OAuth authentication

---

# Author

Rahul Reddy

- GitHub: https://github.com/rahulreddy006
- LinkedIn: https://www.linkedin.com/in/rahulreddy-kattegummula/

---

# License

This project is licensed under the MIT License.

---

# Support

If you found this project useful, consider giving it a star on GitHub.
