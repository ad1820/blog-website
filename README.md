# MERN Blog App

A production-ready blog application built using the **MERN stack** (MongoDB, Express.js, React, Node.js). This app supports user authentication using **JWT with cookies**, blog creation, viewing public blogs, and logout functionality.

---

## 🔧 Features

### ✅ Backend
- Built with **Node.js + Express**
- Organized controller-service-model structure
- Clean API structure with `asyncHandler` and custom `ApiError`
- JWT-based **authentication** using HTTP-only **cookies**
- Secure routes using **auth middleware**
- CORS configured for frontend development
- MongoDB connected with Mongoose ODM
- Routes:
  - `POST /api/users/signUp` → Register a new user
  - `POST /api/users/login` → Login and set cookie
  - `POST /api/users/logout` → Logout and clear cookie
  - `GET /api/users/profile` → (Protected) Get logged-in user info
  - `GET /api/blogs/home` → Public blogs listing (even without login)

### ✅ Frontend (React + Vite)
- Pages:
  - `/` → Homepage showing public blogs
  - `/signup` → Registration form (username, fullName, email, password)
  - `/login` → Login form
- Components:
  - `Navbar` with links and logout button
- `fetch` requests include credentials (`credentials: 'include'`)
- Routing handled using `react-router-dom`

---

## 🛠️ Tech Stack

| Layer      | Tech                       |
|------------|----------------------------|
| Frontend   | React, React Router, Vite  |
| Backend    | Node.js, Express.js        |
| Database   | MongoDB + Mongoose         |
| Auth       | JWT + Cookies              |

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/mern-blog.git
cd mern-blog
```

### 2. Setup Backend

```bash
cd backend
npm install
```
Create a .env file in backend/:
```bash
PORT=8000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
```
Start backend server:
```
npm run dev
```

### 3. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```
Sample Signup Payload
```bash
{
  "username": "user123",
  "fullName": "User",
  "email": "user@example.com",
  "password": "userpassword"
}
```
