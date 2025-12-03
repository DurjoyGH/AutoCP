# AutoCP - Automated Competitive Programming Assistant

An AI-powered platform for generating competitive programming problems, solutions, and test cases.

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone git@github.com:DurjoyGH/AutoCP.git
cd AutoCP
```

### 2. Backend Setup

#### Install Dependencies
```bash
cd backend
npm install
```

#### Configure Environment Variables
Create a `.env` file in the `backend` folder:
```env
PORT=3000
CORS_ORIGIN=http://localhost:5173
DB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRATION=7d
EMAIL=your_email@gmail.com
EMAIL_PASSWORD=your_email_app_password
GEMINI_API_KEY=your_gemini_api_key
GEMINI_API_KEY_TEST_CASE_VALIDATION=your_gemini_api_key
GEMINI_API_KEY_TEST_CASE_GENERATOR=your_gemini_api_key
HUGGINGFACE_API_KEY=your_huggingface_api_key
```

#### Run Backend
```bash
npm run start
```

### 3. Frontend Setup

#### Install Dependencies
```bash
cd frontend
npm install
```

#### Configure Environment Variables
Create a `.env` file in the `frontend` folder:
```env
VITE_API_URL=http://localhost:3000
```

#### Run Frontend
```bash
npm run dev
```

## 🌐 Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000

## 📦 Tech Stack

- **Frontend**: React, Vite, TailwindCSS
- **Backend**: Node.js, Express, MongoDB
- **AI Integration**: Google Gemini, Hugging Face

## 🔑 Features

- AI-powered problem generation
- Automated solution generation
- Test case generation with validation
- User authentication and profiles
- Problem history and favorites

---

Made with ❤️ for competitive programmers
