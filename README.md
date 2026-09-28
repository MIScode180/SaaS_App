# 🤖 AI Learning Platform

> **Personalized 1-on-1 AI learning sessions designed to make learning interactive, focused, and accessible.**

An AI-powered learning platform built with **Next.js, TypeScript, Clerk, Supabase, Vapi, and modern UI components**.

The platform allows users to create personalized learning sessions with an AI tutor, explore different subjects, track their learning history, save useful sessions, and continue learning through an interactive conversational experience.

## 🌐 Live Demo

**[Visit AI Learning Platform](https://saa-s-app-12mx.vercel.app/)**

---

## ✨ Features

### 🎓 1-on-1 AI Learning

Interact with an AI tutor through personalized learning sessions instead of following a static course structure.

### 🧠 Personalized Sessions

Create learning sessions based on:

* Subject
* Topic
* Learning preferences
* Session requirements

### 🎙️ Real-Time AI Conversation

Use an interactive voice-based AI experience to communicate with the AI tutor and learn through conversation.

### 📚 Learning Library

Browse available learning subjects and discover sessions based on different areas of knowledge.

### 🕘 Session History

Keep track of previously completed learning sessions and return to your previous learning activity.

### 🔖 Bookmarks

Save important or useful learning sessions for quick access later.

### 🔐 Secure Authentication

User authentication is handled through **Clerk**, providing secure account management and protected application experiences.

### 📱 Responsive Interface

Designed to work across:

* Desktop
* Tablet
* Mobile

### ⚡ Modern UI

Built with reusable components and a clean interface focused on reducing distractions while learning.

---

## 🖥️ Application Flow

```text
User
 │
 ▼
Authentication
 │
 ▼
Learning Library
 │
 ▼
Choose Subject / Topic
 │
 ▼
Create Learning Session
 │
 ▼
1-on-1 AI Tutor
 │
 ▼
Session Completed
 │
 ├── Session History
 │
 └── Bookmark
```

---

## 🛠️ Tech Stack

### Frontend

* **Next.js**
* **TypeScript**
* **React**
* **Tailwind CSS**
* **shadcn/ui**

### Authentication

* **Clerk**

### Database

* **Supabase**
* PostgreSQL

### AI / Voice

* **Vapi**

### Forms & Validation

* **React Hook Form**
* **Zod**

### Development

* **ESLint**
* **Git**
* **GitHub**

### Deployment

* **Vercel**

---

## 🏗️ Architecture

The application follows a modern Next.js architecture where the frontend, authentication, database, and AI services work together.

```text
                    ┌──────────────────┐
                    │      User        │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │     Next.js      │
                    │   App Router     │
                    └────────┬─────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
              ▼              ▼              ▼
        ┌──────────┐   ┌──────────┐   ┌──────────┐
        │  Clerk   │   │ Supabase │   │   Vapi   │
        │   Auth   │   │ Database │   │ AI Voice │
        └──────────┘   └──────────┘   └──────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ Learning Data &  │
                    │ Session History  │
                    └──────────────────┘
```

---

## 📁 Project Structure

```text
├── app/
│   ├── (auth)/
│   ├── (root)/
│   ├── api/
│   ├── globals.css
│   └── layout.tsx
│
├── components/
│   ├── ui/
│   ├── Navbar.tsx
│   ├── LibraryCard.tsx
│   ├── LibraryList.tsx
│   └── ...
│
├── lib/
│   ├── actions/
│   ├── supabase/
│   ├── vapi/
│   └── utils.ts
│
├── public/
│   └── ...
│
├── types/
│   └── ...
│
├── .env.local
├── next.config.ts
├── package.json
└── README.md
```

---

## 🔐 Environment Variables

Create a `.env.local` file in the project root.

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

NEXT_PUBLIC_VAPI_WEB_TOKEN=
NEXT_PUBLIC_VAPI_WORKFLOW_ID=
```

> Never commit your `.env.local` file or expose private API keys in your repository.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Navigate to the project

```bash
cd your-project-name
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create:

```text
.env.local
```

Add the required Clerk, Supabase, and Vapi credentials.

### 5. Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## 🗄️ Database

Supabase is used as the application's database layer.

The platform stores learning-related information such as:

* User information
* Learning libraries
* Learning sessions
* Session history
* Bookmarked sessions

Database access is organized through reusable server-side actions and Supabase utilities.

---

## 🔒 Authentication & Security

Authentication is implemented using Clerk.

The application uses authenticated user information to associate learning activity with the correct account.

Sensitive environment variables are kept outside the source code and configured through environment variables during development and deployment.

---

## 🧠 Technical Highlights

This project demonstrates practical experience with:

* Next.js App Router
* TypeScript
* Server-side actions
* Authentication
* Database integration
* AI/voice API integration
* Form validation
* Reusable React components
* Responsive UI development
* Protected user experiences
* Environment configuration
* Vercel deployment

---

## 📈 Future Improvements

Potential improvements include:

* 📊 Learning progress analytics
* 🎯 Personalized learning recommendations
* 🏆 Learning achievements and streaks
* 📈 AI-generated progress reports
* 📝 AI-generated quizzes
* 📚 More learning subjects
* 🌍 Multi-language learning
* 💳 Subscription and billing
* 👥 Collaborative learning
* 📱 PWA/mobile experience

---

## 🎯 Why I Built This

Traditional learning platforms often rely heavily on predefined courses and passive content.

This project explores a more interactive approach where learners can communicate directly with an AI tutor and create focused learning sessions around the topics they want to understand.

The goal is to combine **modern web development, AI interaction, authentication, and data-driven learning experiences** into a single production-style SaaS application.

---

## 👨‍💻 Developer

**IS / MIScode180**

Frontend Developer focused on building modern, scalable, and high-performance web applications using:

**React • Next.js • TypeScript • JavaScript • Tailwind CSS**

### 🔗 Links

* 🌐 Live Application: https://saa-s-app-12mx.vercel.app/
* 💻 GitHub: https://github.com/MIScode180

---

## ⭐ If you find this project interesting

Feel free to explore the project, review the implementation, and connect with me for collaboration or frontend development opportunities.
