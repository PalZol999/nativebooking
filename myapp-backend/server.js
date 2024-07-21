const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const cors = require('cors'); // Import cors package

const app = express();
app.use(bodyParser.json());
const port = 3000;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'booking',
  password: 'alma',
  port: 5432,
});

app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

// Routes for register
app.post('/register', async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  if (!first_name || !last_name || !email || !password) {
    return res.status(400).send({ error: 'All fields are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *',
      [first_name, last_name, email, hashedPassword]
    );
    res.status(201).send(result.rows[0]);
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).send({ error: 'Internal server error' });
  }
});

// Routes for login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const userQuery = 'SELECT * FROM users WHERE email = $1';
    const userResult = await pool.query(userQuery, [email]);

    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = userResult.rows[0];
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    const { first_name, last_name } = user;
    res.status(200).json({
      message: 'Login successful',
      user: { first_name, last_name }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Endpoint to check if booking already exists
app.post('/api/checkBooking', async (req, res) => {
  const { first_name, last_name, appointment_date } = req.body;

  if (!first_name || !last_name || !appointment_date) {
    return res.status(400).send({ error: 'All fields are required' });
  }

  try {
    const checkQuery = `
      SELECT * FROM signed_in
      WHERE first_name = $1 AND last_name = $2 AND appointment_date = $3
    `;
    const values = [first_name, last_name, appointment_date];
    const result = await pool.query(checkQuery, values);

    res.json({ exists: result.rows.length > 0 });
  } catch (err) {
    console.error('Error checking booking:', err.message);
    res.status(500).send('Server error');
  }
});

// Signing in for a chosen date
app.post('/api/signin', async (req, res) => {
  const { first_name, last_name, appointment_date } = req.body;

  if (!first_name || !last_name || !appointment_date) {
    return res.status(400).send({ error: 'All fields are required' });
  }

  try {
    const insertQuery = `
      INSERT INTO signed_in(first_name, last_name, appointment_date)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    const values = [first_name, last_name, appointment_date];
    const result = await pool.query(insertQuery, values);

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error inserting into signed_in:', err.message);
    res.status(500).send('Server error');
  }
});

// Get all bookings for a user
app.get('/api/bookings', async (req, res) => {
  const { first_name, last_name } = req.query;

  if (!first_name || !last_name) {
    return res.status(400).send({ error: 'First name and last name are required' });
  }

  try {
    const query = `
      SELECT * FROM signed_in
      WHERE first_name = $1 AND last_name = $2
    `;
    const values = [first_name, last_name];
    const result = await pool.query(query, values);

    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching bookings:', err.message);
    res.status(500).send('Server error');
  }
});

// Cancel a booking
app.delete('/api/bookings', async (req, res) => {
  const { first_name, last_name, appointment_date } = req.body;

  if (!first_name || !last_name || !appointment_date) {
    return res.status(400).send({ error: 'All fields are required' });
  }

  try {
    const deleteQuery = `
      DELETE FROM signed_in
      WHERE first_name = $1 AND last_name = $2 AND appointment_date = $3
    `;
    const values = [first_name, last_name, appointment_date];
    await pool.query(deleteQuery, values);

    res.status(200).send({ message: 'Booking cancelled successfully' });
  } catch (err) {
    console.error('Error cancelling booking:', err.message);
    res.status(500).send('Server error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
