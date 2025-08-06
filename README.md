<h1>TPN Connect Website</h1>
<img alt="Website Preview" src="public/assets/images/welcome.svg" />

# Matx React AI Assistant

This project is a **React-based web application** based on the [The Pallet Network (TPN) Website](https://www.tpnconnect.com/Account/LogOn?ReturnUrl=%2f) with additional features, including an **AI Assistant** powered by Google's Generative Language API.

---

## 🚀 Features
- A Cleaner, Simpler, and Interactive Admin Dashboard
- Depot-to-Depot Communication Chatbox
- AI Chatbot Assistance
- Authentication system

---

## 📦 Prerequisites
Before running the project, make sure you have:
- [Node.js](https://nodejs.org/) (v18 or above recommended)
- [Yarn](https://yarnpkg.com/) installed
- Google Generative Language API key (if you want AI Assistant to work)

---

## 🔧 Installation

### 1. 1️⃣ Clone the repository
```bash
git clone https://github.com/sanafatima24/TPNConnect_Website_Prototype_With_ChatAI.git
cd TPNConnect_Website_Prototype_With_ChatAI
```

### 2. 📥 Install dependencies
```bash
yarn install
```

### 3. ⚙️ Configuration
Set up environment variables
- In the .env file: Replace YOUR_API_KEY in VITE_API_GENERATIVE_LANGUAGE_CLIENT=YOUR_API_KEY with your actual API key from Google Cloud Console.

### 4. ▶️ Running the project
```bash
yarn dev
```
This will start the development server. Open your browser at: http://localhost:5173

### 5. 🐞 Troubleshooting
- Dependency errors
Clear node_modules and reinstall:
```bash
# Windows (CMD)
rmdir /s /q node_modules

# macOS/Linux
rm -rf node_modules

yarn install
```
- Vite cache issues
```bash
# Windows
rmdir /s /q node_modules\.vite

# macOS/Linux
rm -rf node_modules/.vite
```

### 6. 💡 Credits
Matx React Admin Template (https://github.com/uilibrary/matx-react)
Material UI
Google Generative Language API


