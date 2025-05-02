// backend/routes/register.js
const express = require('express');
const pool    = require('../config/db');
const router  = express.Router();

/**
 * GET /api/register/:userId
 * → List all registrations (cart) for a user, with event info.
 */
router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const sql = `
      SELECT
        r.id           AS registrationId,
        r.event_id     AS eventId,
        r.quantity,
        e.title,
        e.date,
        e.city,
        e.location,
        e.image_url    AS imageUrl,
        c.name         AS category
      FROM registrations r
      JOIN events     e ON r.event_id = e.id
      JOIN categories c ON e.category_id = c.id
      WHERE r.user_id = ?
    `;
    const [rows] = await pool.query(sql, [userId]);
    res.json(rows);
  } catch (err) {
    console.error('Error fetching registrations:', err);
    res.status(500).json({ error: 'Failed to load registrations' });
  }
});

/**
 * POST /api/register
 * {
 *   userId: number,
 *   eventId: number,
 *   attendees: [ { name: string, contact: string }, … ]
 * }
 * → Creates or updates a registration and its attendees.
 */
router.post('/', async (req, res) => {
  const { userId, eventId, attendees } = req.body;
  const quantity = Array.isArray(attendees) ? attendees.length : 0;

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    // upsert registration row
    const [[ existing ]] = await conn.query(
      'SELECT id FROM registrations WHERE user_id = ? AND event_id = ?',
      [userId, eventId]
    );

    let registrationId;
    if (existing) {
      registrationId = existing.id;
      await conn.query(
        'UPDATE registrations SET quantity = ?, created_at = CURRENT_TIMESTAMP WHERE id = ?',
        [quantity, registrationId]
      );
      // clear old attendees
      await conn.query('DELETE FROM attendees WHERE registration_id = ?', [registrationId]);
    } else {
      const [result] = await conn.query(
        'INSERT INTO registrations (user_id, event_id, quantity) VALUES (?, ?, ?)',
        [userId, eventId, quantity]
      );
      registrationId = result.insertId;
    }

    // insert new attendees
    for (let i = 0; i < attendees.length; i++) {
      const { name, contact } = attendees[i];
      const registrationNumber = `${Date.now()}-${i}`;
      await conn.query(
        `INSERT INTO attendees 
           (registration_id, name, contact, registration_number) 
         VALUES (?, ?, ?, ?)`,
        [registrationId, name, contact, registrationNumber]
      );
    }

    // decrement available seats
    await conn.query(
      'UPDATE events SET available_seats = available_seats - ? WHERE id = ?',
      [quantity, eventId]
    );

    await conn.commit();
    res.json({ message: 'Registration successful', registrationId });
  } catch (err) {
    await conn.rollback();
    console.error('Registration failed:', err);
    res.status(500).json({ error: 'Registration failed' });
  } finally {
    conn.release();
  }
});

module.exports = router;
