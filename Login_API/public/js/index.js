// app.js or index.js
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const authRoutes = require('./routes/auth');

const app = express();
const port = 3000;

// Create MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'your_mysql_username',
  password: 'your_mysql_password',
  database: 'your_database_name',
  connectionLimit: 10, // Adjust this based on your requirements
});

// Make the MySQL connection pool available in the request object
app.use((req, res, next) => {
  req.pool = pool;
  next();
});

app.use(bodyParser.json());

// Use the auth routes
app.use('/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
