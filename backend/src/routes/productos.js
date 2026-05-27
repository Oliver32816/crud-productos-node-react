const express = require('express');
const router = express.Router();
const db = require('../database');

// GET todos
router.get('/', (req, res) => {
  db.all('SELECT * FROM productos ORDER BY id DESC', [], (err, filas) => {
    if (err) return res.status(500).json({ error: 'Error al obtener' });
    res.json(filas);
  });
});

// GET uno solo
router.get('/:id', (req, res) => {
  db.get('SELECT * FROM productos WHERE id = ?', [req.params.id], (err, fila) => {
    if (err) return res.status(500).json({ error: 'Error al buscar' });
    if (!fila) return res.status(404).json({ error: 'No encontrado' });
    res.json(fila);
  });
});

// POST crear
router.post('/', (req, res) => {
  const { nombre, precio, categoria, stock } = req.body;
  if (!nombre || !precio || !categoria) 
    return res.status(400).json({ error: 'Faltan campos' });

  const sql = 'INSERT INTO productos (nombre, precio, categoria, stock) VALUES (?, ?, ?, ?)';
  db.run(sql, [nombre, precio, categoria, stock || 0], function(err) {
    if (err) return res.status(500).json({ error: 'Error al crear' });
    db.get('SELECT * FROM productos WHERE id = ?', [this.lastID], (err, nuevo) => {
      res.status(201).json(nuevo);
    });
  });
});

// PUT actualizar
router.put('/:id', (req, res) => {
  const { nombre, precio, categoria, stock } = req.body;
  const sql = 'UPDATE productos SET nombre=?, precio=?, categoria=?, stock=? WHERE id=?';
  db.run(sql, [nombre, precio, categoria, stock, req.params.id], function(err) {
    if (err) return res.status(500).json({ error: 'Error al actualizar' });
    if (this.changes === 0) return res.status(404).json({ error: 'No encontrado' });
    db.get('SELECT * FROM productos WHERE id = ?', [req.params.id], (err, prod) => {
      res.json(prod);
    });
  });
});

// DELETE eliminar
router.delete('/:id', (req, res) => {
  db.run('DELETE FROM productos WHERE id = ?', [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: 'Error al eliminar' });
    if (this.changes === 0) return res.status(404).json({ error: 'No encontrado' });
    res.json({ mensaje: 'Eliminado', id: req.params.id });
  });
});

module.exports = router;