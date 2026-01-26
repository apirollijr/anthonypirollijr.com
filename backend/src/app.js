const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const userRoutes = require('./routes/userRoutes');
const websiteRoutes = require('./routes/websiteRoutes');
const contactRoutes = require('./routes/contactRoutes');

app.use('/api/users', userRoutes);
app.use('/api/websites', websiteRoutes);
app.use('/api/contact', contactRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handler
app.use((err, req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

module.exports = app;
