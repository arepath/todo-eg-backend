const express = require('express');
const router = express.Router();
const db = require('../db_use');

router.get('/getTasks', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM tasks');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/addTask', async (req, res) => {
  const { nombre, descripcion, fecha } = req.body;
  if (!nombre || !descripcion || !fecha) {
    return res.status(400).json({ error: 'Parámetros incompletos' });
  }

  try {
    await db.query('INSERT INTO tasks (nombre, descripcion, fecha) VALUES (?, ?, ?)', [nombre, descripcion, fecha]);
    const [rows] = await db.query('SELECT * FROM tasks');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/deleteTask/:id', async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: 'Parámetros incompletos' });
  }

  try {
    await db.query('DELETE FROM tasks WHERE id = ?', [id]);
    const [rows] = await db.query('SELECT * FROM tasks');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;