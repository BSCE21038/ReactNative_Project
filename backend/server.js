// server.js
require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const path    = require('path');
const pool    = require('./config/db');

const categoriesRouter = require('./routes/categories');
const eventsRouter     = require('./routes/events');
const favoritesRouter = require('./routes/favorites');
const registerRouter  = require('./routes/register');
const registrationsRouter = require('./routes/registrations');
const attendeesRouter = require('./routes/attendees');
const userRouter = require('./routes/users');
const ordersRouter = require('./routes/orders');

const app = express();
app.use(cors());
app.use(express.json());

// serve your images folder statically
// now any file in ./public/images can be fetched at http://<host>:3000/images/<filename>
app.use('/images', express.static(path.join(__dirname, 'public/images')));


app.get('/api/health', (req, res) => res.json({ status: 'OK' }));
app.get('/api/db-test', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT NOW() AS now');
    res.json({ time: rows[0].now });
  } catch (err) {
    res.status(500).json({ error: 'DB connection failed' });
  }
});

// mount our new routers
app.use('/api/categories', categoriesRouter);
app.use('/api/events',     eventsRouter);
app.use('/api/favorites',  favoritesRouter);
app.use('/api/register',   registerRouter);
app.use('/api/attendees',  attendeesRouter);
app.use('/api/users', userRouter);
app.use('/api/registrations',   registrationsRouter);
app.use('/api/orders', ordersRouter);  // GET /api/orders/:userId

const PORT = process.env.PORT || 3000;
// bind to 0.0.0.0 so other devices can reach you
app.listen(PORT, '0.0.0.0', () => 
  console.log(`🚀 Server listening on http://0.0.0.0:${PORT}`)
);
