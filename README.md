# Simple Social Chat App

A real-time social Group chat application built with **React**, **Node.js/Express**, **Socket.io**, **Firebase Cloud Messaging (FCM)**, and **Cloudinary** for image uploads. This project demonstrates a full-stack chat system with real-time messaging, image uploads, notifications, and responsive UI.

---

## Features

- Real-time chat using **Socket.io**
- Text messages with responsive UI
- Image upload (max 5MB) with preview, download, and delete
- Firebase Cloud Messaging (FCM) for push notifications
- Cloudinary integration for image storage
- Message deletion for users
- Logout functionality
- Minimal and responsive design using **Tailwind CSS**
- Hover-based message metadata (timestamp, delete icon)

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React, Tailwind CSS |
| Backend | Node.js, Express |
| Database | MongoDB (Mongoose) |
| Real-time | Socket.io |
| Notifications | Firebase Cloud Messaging (FCM) |
| File Uploads | Cloudinary |
| Deployment | (Optional) Render, Vercel, or Heroku |

---

How it Works
💬 Real-time Messaging

Socket.io establishes a WebSocket connection between client and server.

When a user sends a message, it is broadcast to all connected clients in real-time.

🖼️ Image Upload

Users can upload images (max 5MB).

Images are sent to the /api/upload endpoint.

Cloudinary stores images and returns a secure URL.

The URL is saved in the message object and broadcast to clients.

🔔 Firebase Cloud Messaging (FCM)

FCM is initialized on the frontend and backend.

When a new message is sent, all other users with a saved FCM token receive a push notification.

The server handles token validation and removes invalid tokens automatically.

🗑️ Message Deletion & Metadata

Users can delete their own messages.

Each message displays timestamp and sender info on hover.

Messages and images are deleted from both client and server.

📱 Responsive UI

Tailwind CSS handles responsiveness for desktop and mobile.

Messages align properly on all screen sizes.

Images scale automatically, and metadata is minimal to keep UI clean.

## Screenshots


---

## Getting Started

### Prerequisites

- Node.js v18+  
- MongoDB database (local or cloud)  
- Cloudinary account  
- Firebase project with service account

---

### Setup Backend

1. Clone the repository:

```bash
git clone https://github.com/your-username/social-chat.git
cd social-chat/backend
