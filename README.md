# ScholarHub

ScholarHub is a premium, iOS-style academic dashboard designed for students who value focus and productivity. It provides a calm, aesthetic environment to manage tasks, track academic progress, and get AI-powered study assistance.

## ✨ Features

- **iOS-Inspired UI**: A beautiful, "Forest" themed interface with frosted glass effects, smooth motion animations, and premium typography.
- **Academic Task Management**: Organize your coursework with priority levels and real-time syncing via Firebase.
- **AI Academic Assistant**: Integrated Gemini-powered chat assistant to help with STEM and Humanities questions.
- **Google Authentication**: Secure sign-in using Firebase Auth and Google OAuth.
- **Dynamic Profile**: Personalized academic profile tracking your Major, University, GPA, and graduation year.
- **Focus Mode**: A dedicated workspace to minimize distractions during deep work sessions.

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion (`motion/react`)
- **Backend (Server)**: Express.ts (Proxy for Gemini API and Static serving)
- **Database & Auth**: Firebase Firestore & Firebase Authentication
- **AI**: Google Gemini API (@google/genai)

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- A Firebase project
- A Google Gemini API Key

### Configuration

1. **Environment Variables**: Create a `.env` file (or set in your platform settings) with the following:
   ```env
   GEMINI_API_KEY=your_gemini_key
   ```
2. **Firebase Config**: Ensure `firebase-applet-config.json` is present in the root with your Firebase credentials.

### Installation & Development

```bash
# Install dependencies
npm install

# Start development server (Port 3000)
npm run dev
```

### Production Build

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 📱 Project Structure

- `src/components`: Reusable UI components (TopBar, BottomNav, SVGIcon, etc.)
- `src/pages`: Main view components (Home, Tasks, Profile, AI Help, etc.)
- `src/lib`: Logic for Firebase and utilities.
- `server.ts`: Express backend for Gemini API and production serving.
- `firestore.rules`: Security rules for database protection.

## 📄 License

MIT
