require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');

const app = express();

// Connect to database
connectDB();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// Routes
app.use('/', require('./routes/index'));
app.use('/api', require('./routes/api'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🎉 Server running on port ${PORT} 🎉`);
});