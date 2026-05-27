const sqlite3 = require('sqlite3').verbose();
const path = require('path');
require('dotenv').config();

// Ruta para que funcione en Render y local
const dbPath = process.env.NODE_ENV === 'production' 
  ? path.join('/opt/render/project/src/backend', 'productos.db') 
  : path.resolve('./productos.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error('❌ Error BD:', err.message);
  else console.log('✅ Conectado a SQLite');
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