# Anthony Pirolli Jr

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A modern, responsive personal portfolio website showcasing my projects, skills, and experience as a full-stack developer.

🌐 **Live Site:** [anthonypirollijr.com](https://anthonypirollijr.com)

---

## ✨ Features

- **📱 Responsive Design** - Looks great on all devices
- **🌙 Dark Theme** - Easy on the eyes
- **⚡ Fast Performance** - Built with Vite for lightning-fast loads
- **🔐 Admin Dashboard** - Manage websites and view contact submissions
- **📧 Contact Form** - Integrated with backend API
- **🐙 GitHub Integration** - Fetches repos directly from GitHub API
- **🔍 SEO Optimized** - React Helmet for meta tags

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React 19 | UI Framework |
| React Router | Navigation |
| Vite | Build Tool |
| React Helmet | SEO |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js | Runtime |
| Express | Web Framework |
| MongoDB | Database |
| Mongoose | ODM |
| JWT | Authentication |

### DevOps
| Technology | Purpose |
|------------|---------|
| Docker | Containerization |
| ESLint | Linting |
| Prettier | Formatting |

---

## 📁 Project Structure

```
anthonypirollijr/
├── client/                 # React frontend
│   ├── assets/             # Images, fonts, etc.
│   ├── components/         # Reusable components
│   ├── layouts/            # Page layouts
│   ├── pages/              # Page components
│   │   ├── admin/          # Admin dashboard pages
│   │   └── public/         # Public-facing pages
│   ├── services/           # API services
│   ├── App.jsx             # Main app component
│   ├── App.css             # Global styles
│   └── main.jsx            # Entry point
├── backend/                # Node.js/Express API
│   ├── src/
│   │   ├── config/         # Configuration
│   │   ├── controllers/    # Route handlers
│   │   ├── middleware/     # Auth, etc.
│   │   ├── models/         # Mongoose models
│   │   ├── routes/         # API routes
│   │   └── scripts/        # Utility scripts
│   ├── server.js           # Server entry point
│   └── docker-compose.yml  # Docker config
├── public/                 # Static assets
├── index.html              # HTML template
├── vite.config.js          # Vite configuration
└── package.json            # Dependencies
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** or **yarn**
- **MongoDB** (local or Atlas)
- **Docker** (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/apirollijr/anthonypirollijr.com.git
   cd anthonypirollijr.com
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

4. **Set up environment variables**
   ```bash
   # In /backend, create a .env file
   cp .env.example .env
   # Edit with your values:
   # MONGODB_URL=mongodb://localhost:27017/anthonypirollijr
   # JWT_SECRET=your-secret-key
   # PORT=3000
   ```

5. **Start MongoDB** (if using Docker)
   ```bash
   cd backend
   docker-compose up -d
   ```

6. **Seed admin user** (optional)
   ```bash
   cd backend
   node src/scripts/seedAdmin.js
   ```

### Development

**Start the frontend:**
```bash
npm run dev
```

**Start the backend:**
```bash
cd backend
npm start
```

The frontend runs on `http://localhost:5173` and the backend on `http://localhost:3000`.

### Production Build

```bash
# Build frontend
npm run build

# Preview production build
npm run preview
```

---

## 📄 API Endpoints

### Public
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/websites` | Get all websites |
| GET | `/api/websites/:id` | Get single website |
| POST | `/api/contact` | Submit contact form |

### Protected (Admin)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/users/login` | Admin login |
| POST | `/api/websites` | Create website |
| PUT | `/api/websites/:id` | Update website |
| DELETE | `/api/websites/:id` | Delete website |
| GET | `/api/contact` | Get all contacts |

---

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run format` | Format with Prettier |

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📬 Contact

**Anthony Pirolli Jr**

- Website: [anthonypirollijr.com](https://anthonypirollijr.com)
- GitHub: [@apirollijr](https://github.com/apirollijr)
- LinkedIn: [Anthony Pirolli Jr](https://linkedin.com/in/anthonypirollijr)

---

Made with ❤️ and ☕
