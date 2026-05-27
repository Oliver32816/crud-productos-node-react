const sqlite3 = require('sqlite3').verbose();
const path = require('path');
require('dotenv').config();

// Ruta corregida para que funcione en Render y local
const dbPath = path.resolve(__dirname, '../productos.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error('❌ Error BD:', err.message);
  else console.log('✅ Conectado a la base de datos SQLite');
});

db.exec(`
  CREATE TABLE IF NOT EXISTS productos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    precio REAL NOT NULL,
    categoria TEXT NOT NULL,
    stock INTEGER NOT NULL DEFAULT 0,
    createdAt TEXT DEFAULT (datetime('now'))
  )
`);

module.exports = db;