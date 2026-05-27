const sqlite3 = require('sqlite3').verbose();
const path = require('path');
require('dotenv').config();

const dbPath = process.env.DB_PATH || './productos.db';
const db = new sqlite3.Database(path.resolve(dbPath), (err) => {
  if (err) console.error('❌ Error al conectar BD:', err.message);
  else console.log('✅ Conectado a la base de datos SQLite');
});

// Crear tabla si no existe
db.run(`
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