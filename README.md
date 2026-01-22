# Anthony Pirolli Jr

A personal portfolio/website built with React and Vite, featuring a Node.js backend.

## Project Structure

```
├── src/                # React frontend source
├── public/             # Static assets
├── backend/            # Node.js/Express backend
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   └── docker-compose.yml
├── index.html
└── vite.config.js
```

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn
- Docker (optional, for backend)

### Frontend

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Backend

```bash
cd backend

# Install dependencies
npm install

# Start server
npm start

# Or use Docker
docker-compose up
```

## Tech Stack

- **Frontend:** React, Vite
- **Backend:** Node.js, Express
- **Containerization:** Docker

## License

MIT
