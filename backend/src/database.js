const { Pool } = require('pg');
require('dotenv').config();

// ✅ TUS DATOS EXACTOS DE LA BASE DE DATOS
const pool = new Pool({
  host: 'dpg-d8bim099rddc73ccc66g-a',
  port: 5432,
  database: 'crud_db_productos',
  user: 'crud_db_productos_user',
  password: 'VadYnJKbWuAJOS9y1i6p7v9tHpm4qVzJ',
  ssl: {
    rejectUnauthorized: false
  }
});

// ✅ CREACIÓN DE TABLA SEGURA (SOLO SE CREA UNA VEZ)
const initDB = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS productos (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(255) NOT NULL,
        precio NUMERIC(10,2) NOT NULL,
        categoria VARCHAR(100) NOT NULL,
        stock INTEGER NOT NULL DEFAULT 0,
        createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Base de datos inicializada correctamente');
  } catch (err) {
    console.error('❌ Error BD:', err.message);
  } finally {
    client.release();
  }
};

initDB();

module.exports = pool;