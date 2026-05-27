const { Pool } = require('pg');
require('dotenv').config();

// ✅ CONEXIÓN CON TUS DATOS DE RENDER (POSTGRES)
const pool = new Pool({
  host: 'dpg-d8bim099rddc73ccc66g-a',
  port: 5432,
  database: 'crud_db_productos',
  user: 'crud_db_productos_user',
  password: 'VadYnJKbWuAJOS9y1i6p7v9tHpm4qVzJ',
  ssl: {
    rejectUnauthorized: false // 🔑 Obligatorio para que funcione en Render
  }
});

// ✅ CREAR TABLA AUTOMÁTICAMENTE SI NO EXISTE
const crearTabla = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS productos (
        id SERIAL PRIMARY KEY,
        nombre TEXT NOT NULL,
        precio NUMERIC NOT NULL,
        categoria TEXT NOT NULL,
        stock INTEGER NOT NULL DEFAULT 0,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Base de Datos Conectada y Tabla Lista');
  } catch (err) {
    console.error('❌ Error al inicializar la BD:', err.message);
  } finally {
    client.release();
  }
};

crearTabla();

module.exports = pool;