# ✅ Todo App

A modern, fast, and beautiful todo application with multiple lists support, built with React and Firebase.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)
![Firebase](https://img.shields.io/badge/Firebase-Auth%20%2B%20Firestore-FFCA28?logo=firebase)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite)

## 🚀 Live Demo

[https://todo-app-omega-seven-19.vercel.app/](https://todo-app-omega-seven-19.vercel.app/)

## ✨ Features

- 📋 **Multiple Lists** - Organize tasks into different lists with folder-style UI
- 📝 **Task Management** - Create, edit, and delete tasks
- ✅ **Mark as Completed** - Track completed tasks with timestamps
- 🔍 **Smart Filters** - Filter by All / Active / Completed
- 🗑️ **Bulk Actions** - Clear all completed tasks at once
- 🔐 **Flexible Authentication** - Google sign-in or Guest mode
- ☁️ **Cloud Sync** - Automatic sync with Firebase (authenticated users)
- 💾 **Local Storage** - Offline support for guest mode
- 🎨 **Dark/Light Theme** - Seamless theme switching
- 🎬 **Smooth Animations** - Motion-powered transitions
- 📱 **Mobile Optimized** - Touch-friendly with optimized hover states
- ⚡ **Optimistic UI** - Instant updates with background sync

## 🛠️ Tech Stack

- **Frontend:** React 19, TypeScript
- **Styling:** Custom CSS with CSS Variables
- **Animations:** Motion (Framer Motion)
- **Auth:** Firebase Authentication
- **Database:** Firebase Firestore
- **Local Storage:** Browser localStorage API
- **Build Tool:** Vite 7
- **Deployment:** Vercel

## 📁 Project Structure

```
src/
├── assets/ # Images, fonts, and animations
│ ├── fonts/
│ └── Lottie-logo-dark.json
├── components/ # React components
│ ├── CreateTodo.tsx/.css
│ ├── Filters.tsx/.css
│ ├── Footer.tsx/.css
│ ├── Header.tsx/.css
│ ├── ListsView.tsx/.css
│ ├── Login.tsx/.css
│ ├── ThemeSwitcher.tsx/.css
│ ├── Todo.tsx/.css
│ ├── Todos.tsx/.css
│ └── Toolbar.tsx/.css
├── hooks/ # Custom React hooks
│ ├── useAuth.ts
│ └── useTheme.ts
├── services/ # Backend services
│ ├── firebase.ts
│ ├── firestore.ts
│ ├── localstorage.ts
│ └── jsonbin.ts
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


