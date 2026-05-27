const express = require('express');
const router = express.Router();
const db = require('../database');

// 📥 Obtener todos
router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM productos ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener: ' + err.message });
  }
});

// ➕ Crear nuevo
router.post('/', async (req, res) => {
  const { nombre, precio, categoria, stock } = req.body;
  
  if (!nombre || !precio || !categoria) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  try {
    const { rows } = await db.query(
      `INSERT INTO productos (nombre, precio, categoria, stock)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [nombre, precio, categoria, stock || 0]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al guardar: ' + err.message });
  }
});

// ✏️ Actualizar
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, precio, categoria, stock } = req.body;

  try {
    const { rows } = await db.query(
      `UPDATE productos 
       SET nombre=$1, precio=$2, categoria=$3, stock=$4 
       WHERE id=$5 
       RETURNING *`,
      [nombre, precio, categoria, stock, id]
    );
    
    if (rows.length === 0) return res.status(404).json({ error: 'No encontrado' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar: ' + err.message });
  }
});

// 🗑️ Eliminar
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await db.query('DELETE FROM productos WHERE id = $1 RETURNING *', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'No encontrado' });
    res.json({ mensaje: 'Eliminado', dato: rows[0] });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar: ' + err.message });
  }
});

module.exports = router;