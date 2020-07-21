require('dotenv').config();
const express = require('express');
const connectDB = require('./db');

const app = express();

// Connect to database
connectDB();

app.use(express.json());

// Routes
app.use('/', require('./routes/redirect'));
app.use('/api', require('./routes/shorten'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🎉 Server running on port ${PORT} 🎉`);
});