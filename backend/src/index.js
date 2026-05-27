const express = require('express');
const cors = require('cors');
require('dotenv').config();

const productosRouter = require('./routes/productos');
const app = express();

const PORT = process.env.PORT || 3001;
const FRONTEND_URL = 'https://crud-productos-node-react.vercel.app';

// ✅ Configuración CORS PERFECTA
app.use(cors({
  origin: [FRONTEND_URL, 'http://localhost:5173'],
  credentials: true
}));

app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ mensaje: '✅ Servidor estable - Datos permanentes' });
});

// Rutas API
app.use('/api/productos', productosRouter);

// Levantar servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Servidor corriendo en puerto ${PORT}`);
});