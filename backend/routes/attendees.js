// backend/routes/attendees.js
const express = require('express');
const pool    = require('../config/db');
const router  = express.Router();

/**
 * GET /api/attendees/:registrationId
 * → fetch all attendee entries for a registration
 */
router.get('/:registrationId', async (req, res) => {
  const { registrationId } = req.params;
  try {
    const [rows] = await pool.query(
      `SELECT 
         id,
         name,
         contact,
         registration_number AS registrationNumber
       FROM attendees
       WHERE registration_id = ?`,
      [registrationId]
    );
    res.json(rows);
  } catch (err) {
    console.error('Error fetching attendees:', err);
    res.status(500).json({ error: 'Failed to load attendees' });
  }
});

/**
 * POST /api/attendees
 * {
 *   registrationId,
 *   attendees: [ { name, contact }, … ]
 * }
 * → insert one row per attendee, generating a registration_number
 */
router.post('/', async (req, res) => {
  const { registrationId, attendees } = req.body;
  if (!registrationId || !Array.isArray(attendees)) {
    return res.status(400).json({ error: 'registrationId and attendees array required' });
  }

  try {
    const conn = await pool.getConnection();
    await conn.beginTransaction();

    for (const at of attendees) {
      const regNum = `${Date.now()}-${Math.floor(Math.random()*10000)}`;
      await conn.query(
        `INSERT INTO attendees 
           (registration_id, name, contact, registration_number)
         VALUES (?, ?, ?, ?)`,
        [registrationId, at.name, at.contact, regNum]
      );
    }

    await conn.commit();
    conn.release();
    res.json({ added: true });
  } catch (err) {
    console.error('Error inserting attendees:', err);
    res.status(500).json({ error: 'Failed to add attendees' });
  }
});

module.exports = router;
