require('dotenv').config();
const express = require('express');
const connectDB = require('./db');

const app = express();

// Connect to database
connectDB();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Building URL shortener service!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🎉 Server running on port ${PORT} 🎉`);
});