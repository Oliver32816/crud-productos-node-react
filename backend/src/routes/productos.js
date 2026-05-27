const express = require('express');
const router = express.Router();
const db = require('../database');

// 📥 OBTENER TODOS
router.get('/', async (req, res) => {
  try {
    const resultado = await db.query('SELECT * FROM productos ORDER BY id DESC');
    res.json(resultado.rows);
  } catch (err) {
    res.status(500).json({ error: '❌ Error al obtener los productos' });
  }
});

// 🔍 OBTENER UNO SOLO
router.get('/:id', async (req, res) => {
  try {
    const resultado = await db.query('SELECT * FROM productos WHERE id = $1', [req.params.id]);
    if (resultado.rows.length === 0) return res.status(404).json({ error: '🔍 No encontrado' });
    res.json(resultado.rows[0]);
  } catch (err) {
    res.status(500).json({ error: '❌ Error al buscar' });
  }
});

// ✏️ CREAR NUEVO
router.post('/', async (req, res) => {
  const { nombre, precio, categoria, stock } = req.body;
  if (!nombre || !precio || !categoria) {
    return res.status(400).json({ error: '⚠️ Faltan campos obligatorios' });
  }

  try {
    const resultado = await db.query(
      'INSERT INTO productos (nombre, precio, categoria, stock) VALUES ($1, $2, $3, $4) RETURNING *',
      [nombre, precio, categoria, stock || 0]
    );
    res.status(201).json(resultado.rows[0]);
  } catch (err) {
    res.status(500).json({ error: '❌ Error al crear: ' + err.message });
  }
});

// ♻️ ACTUALIZAR
router.put('/:id', async (req, res) => {
  const { nombre, precio, categoria, stock } = req.body;
  try {
    const resultado = await db.query(
      'UPDATE productos SET nombre=$1, precio=$2, categoria=$3, stock=$4 WHERE id=$5 RETURNING *',
      [nombre, precio, categoria, stock, req.params.id]
    );
    if (resultado.rows.length === 0) return res.status(404).json({ error: '🔍 No encontrado para actualizar' });
    res.json(resultado.rows[0]);
  } catch (err) {
    res.status(500).json({ error: '❌ Error al actualizar' });
  }
});

// 🗑️ ELIMINAR
router.delete('/:id', async (req, res) => {
  try {
    const resultado = await db.query('DELETE FROM productos WHERE id = $1 RETURNING *', [req.params.id]);
    if (resultado.rows.length === 0) return res.status(404).json({ error: '🔍 No encontrado para eliminar' });
    res.json({ mensaje: '🗑️ Eliminado correctamente', id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: '❌ Error al eliminar' });
  }
});

module.exports = router;