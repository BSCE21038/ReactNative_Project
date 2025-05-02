// backend/routes/events.js
const express = require('express');
const pool    = require('../config/db');
const router  = express.Router();

/**
 * GET /api/events
 * Optional query: ?category=ART
 * → List all events, optionally filtered by category name.
 */
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    let sql = `
      SELECT 
        e.id,
        e.title,
        e.description,
        e.date,
        e.city,
        e.location,
        e.image_url    AS imageUrl,
        e.price,
        e.total_seats  AS totalSeats,
        e.available_seats AS availableSeats,
        c.id           AS categoryId,
        c.name         AS categoryName,
        u.id           AS createdBy,
        u.name         AS createdByName
      FROM events e
      JOIN categories c ON e.category_id = c.id
      JOIN users      u ON e.created_by   = u.id
    `;
    const params = [];
    if (category) {
      sql += ` WHERE c.name = ?`;
      params.push(category);
    }
    sql += ` ORDER BY e.date`;
    const [rows] = await pool.query(sql, params);
    res.json(rows);
  } catch (err) {
    console.error('GET /api/events error', err);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

/**
 * GET /api/events/:id
 * → Get detailed info for one event.
 */
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query(
      `
      SELECT 
        e.*,
        e.image_url    AS imageUrl,
        e.price,
        e.total_seats  AS totalSeats,
        e.available_seats AS availableSeats,
        c.id           AS categoryId,
        c.name         AS categoryName,
        u.id           AS createdBy,
        u.name         AS createdByName
      FROM events e
      JOIN categories c ON e.category_id = c.id
      JOIN users      u ON e.created_by   = u.id
      WHERE e.id = ?
      `,
      [req.params.id]
    );
    if (!rows.length) return res.status(404).json({ error: 'Event not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error('GET /api/events/:id error', err);
    res.status(500).json({ error: 'Failed to fetch event' });
  }
});

module.exports = router;
