const express = require('express');
const cors = require('cors');
require('dotenv').config();

const productosRouter = require('./routes/productos');
const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));
app.use(express.json());

// Rutas
app.use('/api/productos', productosRouter);
app.get('/health', (req, res) => {
  res.json({ status: 'ok', mensaje: 'Servidor funcionando correctamente' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en: http://localhost:${PORT}`);
});