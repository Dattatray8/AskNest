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