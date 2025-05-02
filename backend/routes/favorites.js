// backend/routes/favorites.js
const express = require('express');
const pool    = require('../config/db');
const router  = express.Router();

/**
 * GET /api/favorites/:userId
 * → return all events this user has favorited
 */
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const [rows] = await pool.query(
      `SELECT 
         f.event_id       AS id,
         e.title,
         e.date,
         e.location,
         e.image_url      AS imageUrl,
         c.name           AS categoryName
       FROM favorites f
       JOIN events     e ON f.event_id   = e.id
       JOIN categories c ON e.category_id = c.id
       WHERE f.user_id = ?`,
      [userId]
    );
    res.json(rows);
  } catch (err) {
    console.error('Error fetching favorites:', err);
    res.status(500).json({ error: 'Failed to load favorites' });
  }
});

/**
 * POST /api/favorites
 * { userId, eventId }
 * → toggle favorite: if exists delete, else insert
 */
router.post('/', async (req, res) => {
  const { userId, eventId } = req.body;
  if (!userId || !eventId) {
    return res.status(400).json({ error: 'userId and eventId required' });
  }

  try {
    // check existing
    const [[exists]] = await pool.query(
      'SELECT 1 FROM favorites WHERE user_id = ? AND event_id = ?',
      [userId, eventId]
    );

    if (exists) {
      // remove
      await pool.query(
        'DELETE FROM favorites WHERE user_id = ? AND event_id = ?',
        [userId, eventId]
      );
      return res.json({ removed: true });
    } else {
      // add
      await pool.query(
        'INSERT INTO favorites (user_id, event_id) VALUES (?, ?)',
        [userId, eventId]
      );
      return res.json({ added: true });
    }
  } catch (err) {
    console.error('Error toggling favorite:', err);
    res.status(500).json({ error: 'Failed to update favorite' });
  }
});

module.exports = router;
