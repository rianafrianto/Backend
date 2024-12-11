const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const itemRoutes = require('./routes/itemRoutes.js');
const userRoutes = require('./routes/userRoutes.js');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/items', itemRoutes);
app.use('/api/auth', userRoutes);

app.get("/", (req, res) => {
  res.send("API is working!");
});

// Database Connection
sequelize.sync()
  .then(() => console.log('Database connected successfully.'))
  .catch((error) => console.error('Database connection failed:', error));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;