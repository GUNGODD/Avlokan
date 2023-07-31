// models/user.js
const bcrypt = require('bcrypt');
const connection = require('../config/mysql');

const User = {};

// Create a new user account
User.create = async (username, email, password, role) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = 'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)';
    const params = [username, email, hashedPassword, role];

    return new Promise((resolve, reject) => {
      connection.query(sql, params, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.insertId);
        }
      });
    });
  } catch (error) {
    throw error;
  }
};

// Find a user by username
User.findByUsername = (username) => {
  const sql = 'SELECT * FROM users WHERE username = ?';
  const params = [username];

  return new Promise((resolve, reject) => {
    connection.query(sql, params, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result[0]);
      }
    });
  });
};

module.exports = User;
