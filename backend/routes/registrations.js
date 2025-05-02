// backend/routes/registrations.js
const express = require('express');
const pool    = require('../config/db');
const router  = express.Router();

/**
 * GET /api/register/:userId
 * → fetch all “cart” entries for this user
 */
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const [rows] = await pool.query(
      `SELECT 
         r.id            AS registrationId,
         r.event_id      AS eventId,
         r.quantity,
         e.title,
         e.date,
         e.location,
         e.image_url     AS imageUrl,
         e.price,
         c.name          AS category
       FROM registrations r
       JOIN events      e ON r.event_id   = e.id
       JOIN categories  c ON e.category_id = c.id
       WHERE r.user_id = ?`,
      [userId]
    );
    res.json(rows);
  } catch (err) {
    console.error('Error fetching registrations:', err);
    res.status(500).json({ error: 'Failed to load registrations' });
  }
});

/**
 * POST /api/register
 * { userId, eventId, quantity }
 * → insert or update the “cart” entry
 */
router.post('/', async (req, res) => {
  const { userId, eventId, quantity } = req.body;
  if (!userId || !eventId || !quantity) {
    return res.status(400).json({ error: 'userId, eventId and quantity are required' });
  }

  try {
    // check if exists
    const [[existing]] = await pool.query(
      'SELECT id FROM registrations WHERE user_id = ? AND event_id = ?',
      [userId, eventId]
    );

    if (existing) {
      // update quantity
      await pool.query(
        'UPDATE registrations SET quantity = ? WHERE id = ?',
        [quantity, existing.id]
      );
      return res.json({ updated: true });
    } else {
      // insert new
      await pool.query(
        'INSERT INTO registrations (user_id, event_id, quantity) VALUES (?, ?, ?)',
        [userId, eventId, quantity]
      );
      return res.json({ added: true });
    }
  } catch (err) {
    console.error('Error saving registration:', err);
    res.status(500).json({ error: 'Failed to save registration' });
  }
});

module.exports = router;
