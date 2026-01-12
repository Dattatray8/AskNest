# AskNest (QuerySphere)

A private institutional Q&A platform that enables students and teachers to collaborate on academic questions with AI assistance, real-time chat, and verified answers.

## Overview

AskNest is a full-stack web application designed for educational institutions to provide a secure, spam-free environment where students can ask questions, receive peer and AI-generated answers, and get teacher verification. The platform features real-time communication, content moderation, and role-based access control.

## Features

### Core Functionality
- **Question & Answer System**: Students can post questions with text, images, or videos
- **Real-time Chat**: Socket.IO-powered instant messaging for doubt resolution
- **AI-Powered Assistance**: Google Gemini AI integration for instant answers (triggered with `@ai`)
- **Teacher Verification**: Teachers can verify and accept student answers
- **Voice Input**: Speech-to-text functionality for asking questions
- **Media Upload**: Support for image and video attachments via Cloudinary

### User Roles
- **Students**: Ask questions, provide answers, chat with peers
- **Teachers**: Verify answers, review student applications, moderate content
- **Admins**: Full platform management, user management, spam control

### Security & Moderation
- **Spam Control**: Advanced flagging and moderation system
- **Rate Limiting**: Request throttling to prevent abuse
- **User Bans**: Temporary and permanent ban system with countdown timers
- **Report System**: Users can report inappropriate content
- **Email Verification**: SendGrid integration for OTP-based password reset

### Additional Features
- **Search Functionality**: Find questions and answers across the platform
- **User Profiles**: Comprehensive profiles with activity tracking
- **Theme Support**: Multiple theme options with DaisyUI
- **Responsive Design**: Mobile-friendly interface with TailwindCSS
- **Redis Caching**: Performance optimization with Redis
- **Guest Search Limiting**: Restricted access for unauthenticated users

## Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Redux Toolkit** - State management
- **React Router DOM** - Client-side routing
- **TailwindCSS** - Utility-first CSS framework
- **DaisyUI** - Component library for TailwindCSS
- **Socket.IO Client** - Real-time communication
- **Axios** - HTTP client
- **React Hot Toast** - Toast notifications
- **React Markdown** - Markdown rendering

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database (via Mongoose)
- **Socket.IO** - Real-time bidirectional communication
- **Redis** - Caching and session management
- **Cloudinary** - Media storage and CDN
- **Google Gemini AI** - AI-powered responses
- **SendGrid** - Email service
- **JWT** - Authentication tokens
- **Bcryptjs** - Password hashing
- **Multer** - File upload handling

## Project Structure

```
AskNest/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── redux/         # Redux store and slices
│   │   ├── routes/        # Route configuration
│   │   ├── config/        # Configuration files
│   │   ├── context/       # React Context providers
│   │   └── utils/         # Utility functions
│   ├── public/            # Static assets
│   └── package.json
│
└── server/                # Node.js backend application
    ├── config/           # Configuration files (db, cloudinary, mail, redis, token)
    ├── controllers/      # Route controllers
    ├── middlewares/      # Express middlewares (auth, file upload, rate limiting)
    ├── models/           # MongoDB models
    ├── routes/           # API routes
    ├── helpers/          # Helper functions
    ├── socket.js         # Socket.IO configuration
    ├── index.js          # Application entry point
    └── package.json
```

## Prerequisites

Before running the application, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **MongoDB** (running locally or MongoDB Atlas connection)
- **Redis** (for caching and session management)
- **npm** or **yarn** package manager

## Environment Variables

### Server Environment Variables

Create a `.env` file in the `server/` directory with the following variables:

```env
# Server Configuration
PORT=8000

# Database
MONGODB_URL=your_mongodb_connection_string

# JWT
JWT_SECRET=your_jwt_secret_key

# AI Service
GEMINI_API_KEY=your_google_gemini_api_key

# Email Service (SendGrid)
SENDGRID_API_KEY=your_sendgrid_api_key
EMAIL=your_verified_sender_email@example.com

# Cloudinary (Media Storage)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Redis
REDIS_URL=redis://localhost:6379
# Or for Redis Cloud: redis://default:password@host:port
```

### Client Environment Variables

Create a `.env` file in the `client/` directory with the following variable:

```env
VITE_BACKEND_URL=http://localhost:8000
# Or your production backend URL
```

## Installation

1. **Clone the repository** (if applicable) or navigate to the project directory

2. **Install server dependencies**:
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**:
   ```bash
   cd ../client
   npm install
   ```

## Running the Application

### Development Mode

1. **Start the backend server**:
   ```bash
   cd server
   npm run dev
   ```
   The server will run on `http://localhost:8000` (or your configured PORT)

2. **Start the frontend development server** (in a new terminal):
   ```bash
   cd client
   npm run dev
   ```
   The client will run on `http://localhost:5173`

### Production Build

1. **Build the frontend**:
   ```bash
   cd client
   npm run build
   ```

2. **Preview the production build**:
   ```bash
   npm run preview
   ```

## API Endpoints

### Authentication
- `POST /api/v1/auth/signup` - User registration
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/logout` - User logout
- `POST /api/v1/auth/forgot-password` - Request password reset OTP
- `POST /api/v1/auth/reset-password` - Reset password with OTP

### Questions
- `GET /api/v1/questions` - Get all questions
- `POST /api/v1/questions` - Create a new question
- `GET /api/v1/questions/:id` - Get a specific question
- `PUT /api/v1/questions/:id` - Update a question
- `DELETE /api/v1/questions/:id` - Delete a question

### Answers
- `GET /api/v1/answers` - Get all answers
- `POST /api/v1/answers` - Create a new answer
- `PUT /api/v1/answers/:id/accept` - Accept an answer (teacher only)

### Chat/Messages
- `GET /api/v1/chat` - Get chat conversations
- `GET /api/v1/chat/:chatId/messages` - Get messages for a chat
- `POST /api/v1/chat/messages` - Send a message

### Student
- `GET /api/v1/student/answered/accepted/:studentId` - Get accepted answers by student
- `GET /api/v1/student/questions` - Get student's questions

### Teacher
- `GET /api/v1/teacher/applications` - Get teacher applications (admin only)
- `POST /api/v1/teacher/apply` - Apply to become a teacher

### Admin
- `GET /api/v1/admin/users` - Get all users
- `PUT /api/v1/admin/users/:id/ban` - Ban a user
- `GET /api/v1/admin/reports` - Get all reports

## Socket.IO Events

### Client to Server
- `setup` - Initialize socket connection with user ID
- `join-chat` - Join a chat room
- `typing` - User is typing
- `stop-typing` - User stopped typing
- `new-message` - Send a new message

### Server to Client
- `connected` - Socket connection established
- `message-received` - Receive a new message
- `typing-started` - Another user started typing
- `typing-stopped` - Another user stopped typing

## Development Guidelines

### Code Style
- The project uses ESLint for code linting
- Follow React best practices and hooks rules
- Use functional components with hooks
- Maintain consistent naming conventions

### Git Workflow
- Use meaningful commit messages
- Create feature branches for new functionality
- Test thoroughly before committing

### Security Considerations
- Never commit `.env` files
- Use strong JWT secrets in production
- Implement proper CORS configuration
- Validate all user inputs
- Use rate limiting to prevent abuse

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check `MONGODB_URL` in server `.env` file
   - Verify network connectivity

2. **Redis Connection Error**
   - Ensure Redis server is running
   - Check `REDIS_URL` in server `.env` file
   - For local development: `redis-server`

3. **Cloudinary Upload Fails**
   - Verify Cloudinary credentials in `.env`
   - Check file size limits
   - Ensure valid file formats

4. **Socket.IO Connection Issues**
   - Verify CORS configuration in server
   - Check that both client and server are running
   - Ensure correct `VITE_BACKEND_URL` in client `.env`

5. **Email Not Sending**
   - Verify SendGrid API key
   - Ensure sender email is verified in SendGrid
   - Check email service quotas

## License

This is a private/internal project. All rights reserved.

## Support

For internal support or questions, please contact the development team or refer to internal documentation.

---

**Note**: This is an internal institutional project. Do not share credentials or API keys publicly.

