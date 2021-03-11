const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

// Init Middlaware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => {
  res.send('API running');
});

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/category', require('./routes/api/category'));
app.use('/api/films', require('./routes/api/films'));
app.use('/api/my-films', require('./routes/api/myFilms'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on: ${PORT} `));
