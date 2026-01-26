require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./src/app');

const PORT = process.env.PORT || 3000;
const mongoDBURL =
  process.env.MONGODB_URL || 'mongodb://localhost:27017/anthonypirollijr';

// Connect to MongoDB
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('Connected to MongoDB');

    // Start server after DB connection
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });
