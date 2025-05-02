// backend/routes/user.js
const express = require('express');
const pool    = require('../config/db');
const router  = express.Router();

/**
 * GET /api/user/:id
 * → Fetch a user’s profile (name, email, role, bio, profile_image).
 */
router.get('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const sql = `
      SELECT
        id,
        name,
        email,
        role,
        bio,
        profile_image AS profileImage,
        created_at AS createdAt
      FROM users
      WHERE id = ?
    `;
    const [rows] = await pool.query(sql, [userId]);
    if (!rows.length) return res.status(404).json({ error: 'User not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error('GET /api/user/:id error', err);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

/**
 * PUT /api/user/:id
 * {
 *   name?: string,
 *   password?: string,
 *   bio?: string,
 *   profileImage?: string
 * }
 * → Update profile fields.
 */
router.put('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, password, bio, profileImage } = req.body;

    // Build SET clause dynamically
    const fields = [];
    const params = [];
    if (name)         { fields.push('name = ?');            params.push(name); }
    if (password)     { fields.push('password = ?');        params.push(password); }
    if (typeof bio!=='undefined')    { fields.push('bio = ?');         params.push(bio); }
    if (profileImage) { fields.push('profile_image = ?'); params.push(profileImage); }

    if (!fields.length) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    const sql = `
      UPDATE users
      SET ${fields.join(', ')}
      WHERE id = ?
    `;
    params.push(userId);

    await pool.query(sql, params);
    res.json({ message: 'Profile updated' });
  } catch (err) {
    console.error('PUT /api/user/:id error', err);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

module.exports = router;
