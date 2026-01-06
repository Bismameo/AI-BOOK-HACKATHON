
const express = require('express');
const { Pool } = require('pg');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

console.log('Attempting to connect to the database...');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
  console.log('Successfully connected to the database.');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});


// Create messages table if it doesn't exist
const createTable = async () => {
  console.log('Attempting to create messages table...');
  const query = `
    CREATE TABLE IF NOT EXISTS messages (
      id SERIAL PRIMARY KEY,
      text VARCHAR(255) NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;
  try {
    await pool.query(query);
    console.log('Messages table created successfully (if it did not exist).');
  } catch (err) {
    console.error('Error creating messages table:', err);
  }
};

createTable();


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  console.log('Received chat message:', message);

  if (!message) {
    console.log('Message is required');
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    console.log('Inserting message into the database...');
    // Insert the new message
    const insertQuery = 'INSERT INTO messages (text) VALUES ($1) RETURNING *';
    const insertResult = await pool.query(insertQuery, [message]);
    console.log('Message inserted successfully:', insertResult.rows[0]);

    // Fetch all messages
    console.log('Fetching all messages from the database...');
    const selectQuery = 'SELECT * FROM messages ORDER BY created_at ASC';
    const selectResult = await pool.query(selectQuery);
    console.log('Fetched all messages successfully.');

    res.json(selectResult.rows);
  } catch (err) {
    console.error('Error handling chat message:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.listen(port, () => {
  console.log(`Backend server listening on port ${port}`)
})
