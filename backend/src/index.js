const express = require('express');
const cors = require('cors');
require('dotenv').config();

const productosRouter = require('./routes/productos');
const app = express();

// ⚙️ CONFIGURACIÓN
const PORT = process.env.PORT || 3001;
const HOST = '0.0.0.0';
const FRONTEND_URL = 'https://crud-productos-node-react.vercel.app';

// 🛡️ SEGURIDAD Y CONEXIÓN CRUZADA
app.use(cors({
  origin: [FRONTEND_URL, 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// 📄 RUTA DE PRUEBA
app.get('/', (req, res) => {
  res.json({ mensaje: '✅ Servidor CRUD funcionando con Base de Datos Permanente', estado: 'activo' });
});

// 📦 RUTAS DE LA API
app.use('/api/productos', productosRouter);

// 🚀 INICIAR SERVIDOR
app.listen(PORT, HOST, () => {
  console.log(`✅ Servidor corriendo en puerto: ${PORT}`);
  console.log(`🔗 Conectado a: ${FRONTEND_URL}`);
});