💬 Simple Social Chat App

A real-time group chat app built with ⚛️ React, 🟩 Node.js/Express, ⚡ Socket.io, 🔥 Firebase Cloud Messaging (FCM), and ☁️ Cloudinary.
It features instant text & image sharing, smart notifications, and a sleek responsive UI — all powered by the MERN stack + Cloud services.

---

## 🌟 Features

- ✅ Live Chat — Real-time messaging powered by Socket.io
- 🖋️ Text Messages — Clean and responsive chat bubbles
- 🖼️ Image Uploads — Preview, download, and delete (up to 5 MB) 
- 🔔 Push Notifications — Firebase Cloud Messaging (FCM) integration
- ☁️ Cloud Storage — Secure image hosting with Cloudinary
- 🗑️ Message Deletion — Remove your own texts or images anytime
- 👋 User Logout — Simple session handling
- 📱 Responsive UI — Built with Tailwind CSS for all devices
- 🕒 Hover Details — Timestamp + delete icon shown on hover

---

## 🔗 Live Links

- 🌐 Frontend: [https://your-netlify-url.netlify.app](http://firemern.netlify.app/)
- ⚙️ Backend API: [https://your-render-backend-url.onrender.com](https://mern-social-chatapp-backend.onrender.com)

---

## 🖥️ Demo Screenshots

**1️⃣ Dashboard/Home Page**  
<img src="./public/screenshots/Dashboard.png" width="500"/>

**2️⃣ Chat Interface(user1)**  
<img src="./public/screenshots/user1.png" width="500"/>

**3️⃣ Chat Interface(user2)**  
<img src="./public/screenshots/user2.png" width="500"/>

**4️⃣ Real-Time Updates**  
<img src="./public/screenshots/real-time.png" width="500"/>

---

## 🛠️ Tech Stack

### ⚛️ **Frontend**
- ⚡ [**React**](https://react.dev/) – Dynamic and reactive user interface  
- 🚀 [**Vite**](https://vitejs.dev/) – Lightning-fast build tool for modern frontend development  
- 🎨 [**Tailwind CSS**](https://tailwindcss.com/) – Utility-first CSS framework for clean responsive design  
- 🌐 [**Axios**](https://axios-http.com/) – Simplified HTTP requests for API communication  
- 🔔 [**Firebase Cloud Messaging (FCM)**](https://firebase.google.com/docs/cloud-messaging) – Real-time web push notifications  
- 🌍 [**Netlify**](https://www.netlify.com/) – Fast and reliable frontend deployment platform  

---

### 🧠 **Backend**
- 🟩 [**Node.js**](https://nodejs.org/) – JavaScript runtime for building scalable backend services  
- ⚙️ [**Express.js**](https://expressjs.com/) – Minimal and efficient web framework for backend APIs  
- 💬 [**Socket.io**](https://socket.io/) – Real-time, bidirectional communication between clients and server  
- 🗄️ [**MongoDB Atlas**](https://www.mongodb.com/atlas) – Cloud NoSQL database for message and user storage  
- 🧩 [**Mongoose**](https://mongoosejs.com/) – Elegant ODM (Object Data Modeling) for MongoDB  
- ☁️ [**Cloudinary**](https://cloudinary.com/) – Cloud-based image storage and optimization  
- 🔥 [**Firebase Admin SDK**](https://firebase.google.com/docs/admin/setup) – Server-side handling for push notifications  
- 🛜 [**Render**](https://render.com/) – Scalable cloud hosting for backend services  
- 🔐 [**dotenv**](https://www.npmjs.com/package/dotenv) – Secure environment variable management  
- 🔁 [**CORS**](https://www.npmjs.com/package/cors) – Enables secure cross-origin resource sharing  

---

⚡ How It Works
💬 Real-time Messaging

Socket.io connects all users instantly.

Every message is broadcast live across clients.

🖼️ Image Uploads

Upload images ≤ 5 MB → sent to /api/upload.

Stored securely on Cloudinary → returned as an image URL.

Displayed instantly in chat.

🔔 Firebase Cloud Messaging

FCM initialized in both client & server.

Sends push notifications to all connected users (except sender).

Invalid tokens are auto-cleaned.

🗑️ Message Deletion & Metadata

Delete your messages (text/image).

Hover shows timestamp ⏰ + delete icon 🗑️.

📱 Responsive Design

Tailwind CSS makes the layout fluid across mobile & desktop.

Images and text scale beautifully with smooth animations.

---

## Getting Started

### Prerequisites

- Node.js v18+  
- MongoDB database (local or cloud)  
- Cloudinary account  
- Firebase project with service account

---

### Setup Backend

### 1. Clone the Repository
       git clone https://github.com/your-username/social-app.git
       cd notes-app

---

 ## 👨‍💻 Connect with Me  

<p align="center">  
  <a href="https://www.linkedin.com/in/yashwantbhole/" target="_blank">
    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/>
  </a>
  <a href="mailto:yashwantbhole2004@gmail.com">
    <img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Gmail"/>
  </a>
  <a href="https://github.com/YashwantBhole" target="_blank">
    <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/>
  </a>
  <a href="https://www.instagram.com/yashwant_bhole_07" target="_blank">
    <img src="https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white" alt="Instagram"/>
  </a>
</p>