// backend/routes/categories.js
const express = require('express');
const pool = require('../config/db');
const router = express.Router();

// GET /api/categories
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, name FROM categories ORDER BY name');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching categories:', err);
    res.status(500).json({ error: 'Failed to load categories' });
  }
});

module.exports = router;
