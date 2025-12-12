# ✅ Todo App

A modern, fast, and beautiful todo application built with React and Firebase.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)
![Firebase](https://img.shields.io/badge/Firebase-Auth%20%2B%20Firestore-FFCA28?logo=firebase)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite)

## 🚀 Live Demo

[https://todo-app-omega-seven-19.vercel.app/](https://todo-app-omega-seven-19.vercel.app/)

## ✨ Features

- 📝 Create, edit, and delete tasks
- ✅ Mark tasks as completed
- 🔍 Filter by All / Active / Completed
- 🗑️ Clear all completed tasks
- 🔐 Google authentication
- ☁️ Cloud sync with Firebase
- 🎬 Smooth animations with Motion
- 📱 Responsive design
- ⚡ Optimistic UI updates

## 🛠️ Tech Stack

- **Frontend:** React 19, TypeScript
- **Styling:** CSS (custom)
- **Animations:** Motion (Framer Motion)
- **Auth:** Firebase Authentication
- **Database:** Firebase Firestore
- **Build Tool:** Vite
- **Deployment:** Vercel

## 📦 Installation

1. Clone the repository:
git clone https://github.com/San-code1/todo-app.git
cd todo-app2. Install dependencies:
npm install3. Create a `.env` file in the root directory:
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id4. Start the development server:
npm run dev## 🔧 Firebase Setup

1. Create a project at [Firebase Console](https://console.firebase.google.com)
2. Enable **Authentication** → Sign-in method → Google
3. Create **Firestore Database** in test mode
4. Add your Vercel domain to **Authorized domains** in Authentication settings

## 📁 Project Structure

```
src/
├── assets/          # Images and fonts
├── components/      # React components
│   ├── CreateTodo/
│   ├── Filters/
│   ├── Footer/
│   ├── Header/
│   ├── Login/
│   ├── Todo/
│   ├── Todos/
│   └── Toolbar/
├── hooks/           # Custom React hooks
│   └── useAuth.ts
├── services/        # Firebase services
│   ├── firebase.ts
│   └── firestore.ts
├── App.tsx
├── consts.ts
├── types.ts
└── main.tsx
```

## 🚀 Deployment

The app is configured for automatic deployment on Vercel.

1. Push to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

# 🙏 Acknowledgments

This project was created as part of the React course by [Midudev](https://github.com/midudev). Thanks for the amazing content!

## 📄 License

MIT

---
---

Made by [Javi Sánchez](https://github.com/San-code1)
```


