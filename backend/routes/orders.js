// backend/routes/orders.js
const express = require('express');
const pool    = require('../config/db');
const router  = express.Router();

/**
 * POST /api/orders
 * {
 *   userId:        INT,
 *   paymentMethod: STRING
 * }
 * → Turn all current registrations into an order
 */
router.post('/', async (req, res) => {
  const { userId, paymentMethod } = req.body;
  if (!userId || !paymentMethod) {
    return res.status(400).json({ error: 'userId and paymentMethod are required' });
  }

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    // 1) Fetch cart items & their current price
    const [items] = await conn.query(
      `SELECT r.event_id AS eventId, r.quantity, e.price
       FROM registrations r
       JOIN events e ON r.event_id = e.id
       WHERE r.user_id = ?`,
      [userId]
    );
    if (!items.length) {
      await conn.rollback();
      return res.status(400).json({ error: 'No items in cart' });
    }

    // 2) Calculate total
    const total = items.reduce((sum, it) => sum + (it.price * it.quantity), 0);

    // 3) Insert into orders
    const [orderResult] = await conn.query(
      `INSERT INTO orders (user_id, total, payment_method)
       VALUES (?, ?, ?)`,
      [userId, total, paymentMethod]
    );
    const orderId = orderResult.insertId;

    // 4) Insert each item
    const insertItems = items.map(it => {
      return conn.query(
        `INSERT INTO order_items (order_id, event_id, quantity, price)
         VALUES (?, ?, ?, ?)`,
        [orderId, it.eventId, it.quantity, it.price]
      );
    });
    await Promise.all(insertItems);

    // 5) Clear registrations for this user
    await conn.query(
      `DELETE FROM registrations WHERE user_id = ?`,
      [userId]
    );

    await conn.commit();
    res.json({ orderId });
  } catch (err) {
    await conn.rollback();
    console.error('Error creating order:', err);
    res.status(500).json({ error: 'Failed to create order' });
  } finally {
    conn.release();
  }
});

/**
 * GET /api/orders/:userId
 * → List all past orders (with items) for this user
 */
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    // 1) fetch orders
    const [orders] = await pool.query(
      `SELECT id AS orderId, total, payment_method AS paymentMethod, created_at AS createdAt
       FROM orders
       WHERE user_id = ?
       ORDER BY created_at DESC`,
      [userId]
    );

    // 2) for each order, fetch items
    const detailed = await Promise.all(orders.map(async (o) => {
      const [items] = await pool.query(
        `SELECT oi.event_id AS eventId,
                e.title,
                oi.quantity,
                oi.price
         FROM order_items oi
         JOIN events e ON oi.event_id = e.id
         WHERE oi.order_id = ?`,
        [o.orderId]
      );
      return { ...o, items };
    }));

    res.json(detailed);
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ error: 'Failed to load orders' });
  }
});

module.exports = router;
