# Whisper Stone

A modern real-time broadcast chat application built with React, Node.js, and Socket.io.

## <img src="https://cdn-icons-png.flaticon.com/512/3159/3159594.png" width="20" height="20" alt="Live Demo"> Live Demo

**✨ [Try Whisper Stone Live](https://whisperstone-y4u0u.sevalla.app/)**

> Experience the app in action! No installation required - just click and start chatting.

## 📺 Demo Video

<div align="center">

https://github.com/user-attachments/assets/4377990b-3483-4541-86d2-f17ac20c7189

_🎥 Watch Wishper Stone in action

</div>

<!-- Replace with actual demo video -->

## <img src="https://cdn-icons-png.flaticon.com/512/1006/1006555.png" width="20" height="20" alt="Features"> Features

- **Real-time messaging** - Instant message delivery with Socket.io
- **User authentication** - Secure JWT-based authentication
- **Live user presence** - See who's online in real-time
- **Profile management** - Update your profile information
- **Account deletion** - Securely delete your account and data
- **Message history** - Persistent chat history

## <img src="https://cdn-icons-png.flaticon.com/512/2721/2721297.png" width="20" height="20" alt="Tech Stack"> Tech Stack

### Frontend

- **React** - Modern UI library with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **Zustand** - State management
- **React Hook Form** - Performant form handling
- **React Hot Toast** - Beautiful notifications
- **Shadcn** - UI library
- **Socket.io Client** - Real-time communication

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Socket.io** - Real-time bidirectional communication
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Token authentication

## <img src="https://cdn-icons-png.flaticon.com/512/3159/3159310.png" width="20" height="20" alt="Getting Started"> Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** database (local or cloud)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/prasunTimalsina/Whisperstone-.git
   cd Whisperstone-
   ```

2. **Install backend dependencies**

   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

### Environment Setup

1. **Backend Environment**

   Create `backend/.env` file:

   ```env
   NODE_ENV=development
   PORT=3000

   JWT_SECRET=your_super_secret_jwt_key_here
   CLIENT_URL=http://localhost:5173

   MONGODB_URI=mongodb://localhost:27017/whisperstone
   # OR for MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/whisperstone

   MONGO_PASS=your_mongo_password_here
   ```

### Running the Application

1. **Start the backend server**

   ```bash
   cd backend
   #for development with auto-reload
   npm run dev
   ```

2. **Start the frontend development server**

   ```bash
   cd frontend
   npm run dev
   ```

3. **Open your browser**
   ```
   Frontend: http://localhost:5173
   Backend API: http://localhost:3000
   ```

## <img src="https://cdn-icons-png.flaticon.com/512/1055/1055687.png" width="20" height="20" alt="API Documentation"> API Documentation

### Authentication Endpoints

| Method | Endpoint           | Description       |
| ------ | ------------------ | ----------------- |
| `POST` | `/api/auth/signup` | Register new user |
| `POST` | `/api/auth/login`  | User login        |
| `POST` | `/api/auth/logout` | User logout       |
| `GET`  | `/api/auth/get-me` | Get current user  |

### User Endpoints

| Method   | Endpoint           | Description         |
| -------- | ------------------ | ------------------- |
| `GET`    | `/api/user/all`    | Get all users       |
| `PUT`    | `/api/user/update` | Update user profile |
| `DELETE` | `/api/user/delete` | Delete user account |

### Message Endpoints

| Method | Endpoint                  | Description      |
| ------ | ------------------------- | ---------------- |
| `GET`  | `/api/messages/all-chats` | Get all messages |
| `POST` | `/api/messages/send`      | Send new message |

### Socket Events

| Event         | Description                 |
| ------------- | --------------------------- |
| `connect`     | User connects to socket     |
| `disconnect`  | User disconnects            |
| `onlineUsers` | Broadcast online users list |
| `newMessage`  | Real-time message delivery  |

## <img src="https://cdn-icons-png.flaticon.com/512/4230/4230573.png" width="20" height="20" alt="Scripts"> Available Scripts

### Backend Scripts

```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
```

### Frontend Scripts

```bash
npm run dev        # Start Vite development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

<div align="center">
  <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" width="16" height="16" alt="GitHub"> Made with  by <a href="https://github.com/prasunTimalsina"> Prasun Timalsina</a>
</div>
