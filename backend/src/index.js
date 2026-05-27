const express = require('express');
const cors = require('cors');
require('dotenv').config();

const productosRouter = require('./routes/productos');
const app = express();

// ✅ CONFIGURACIÓN DE PUERTO CORRECTA PARA RENDER
const PORT = process.env.PORT || 3001;
const HOST = '0.0.0.0'; // 👈 ESTO ES LO QUE FALTABA PARA QUE FUNCIONE EN LA NUBE

// ✅ CORS CONFIGURACIÓN PERFECTA
const FRONTEND_URL = process.env.FRONTEND_URL || 'https://crud-productos-node-react.vercel.app';

app.use(cors({
  origin: [FRONTEND_URL, 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// ✅ RUTA PRINCIPAL (para que NO salga "No se puede OBTENER /")
app.get('/', (req, res) => {
  res.json({ mensaje: '✅ Servidor CRUD funcionando correctamente', estado: 'activo' });
});

// Rutas de la API
app.use('/api/productos', productosRouter);

// Iniciar servidor
app.listen(PORT, HOST, () => { // 👈 Aquí usamos el HOST correcto
  console.log(`✅ Servidor corriendo correctamente`);
  console.log(`🔗 URL: https://crud-productos-node-react.onrender.com`);
  console.log(`🚪 Puerto: ${PORT}`);
});