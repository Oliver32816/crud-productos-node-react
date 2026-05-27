import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductoForm from './src/components/ProductoForm';
import ProductoList from './src/components/ProductoList';

const API = import.meta.env.VITE_API_URL;

export default function App() {
  const [productos, setProductos] = useState([]);
  const [editar, setEditar] = useState(null);
  const [mensaje, setMensaje] = useState(null);

  useEffect(() => cargar(), []);

  const cargar = async () => {
    try {
      const { data } = await axios.get(`${API}/productos`);
      setProductos(data);
    } catch {
      notificar('❌ Error al conectar con el servidor', 'error');
    }
  };

  const guardar = async (datos) => {
    try {
      editar 
        ? await axios.put(`${API}/productos/${editar.id}`, datos)
        : await axios.post(`${API}/productos`, datos);
      notificar('✅ Operación realizada correctamente');
      setEditar(null);
      cargar();
    } catch {
      notificar('❌ Error en la operación', 'error');
    }
  };

  const eliminar = async (id) => {
    if (!confirm('¿Seguro que deseas eliminar este registro?')) return;
    try {
      await axios.delete(`${API}/productos/${id}`);
      notificar('🗑️ Registro eliminado');
      cargar();
    } catch {
      notificar('❌ No se pudo eliminar', 'error');
    }
  };

  const notificar = (texto, tipo = 'ok') => {
    setMensaje({ texto, tipo });
    setTimeout(() => setMensaje(null), 3000);
  };

  return (
    <div style={{
      maxWidth: '1100px',
      margin: '2rem auto',
      padding: '2rem',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
    }}>
      <h1 style={{
        textAlign: 'center',
        color: '#2c3e50',
        borderBottom: '2px solid #3498db',
        paddingBottom: '1rem'
      }}>📋 GESTIÓN DE PRODUCTOS - CRUD COMPLETO</h1>

      {mensaje && (
        <div style={{
          padding: '1rem',
          margin: '1rem 0',
          borderRadius: '6px',
          backgroundColor: mensaje.tipo === 'ok' ? '#d4edda' : '#f8d7da',
          color: mensaje.tipo === 'ok' ? '#155724' : '#721c24',
          textAlign: 'center',
          fontWeight: '500'
        }}>
          {mensaje.texto}
        </div>
      )}

      <ProductoForm 
        onGuardar={guardar} 
        productoEditar={editar} 
        onCancelar={() => setEditar(null)} 
      />

      <hr style={{ margin: '2rem 0', border: '1px solid #eee' }} />

      <ProductoList 
        productos={productos} 
        onEditar={setEditar} 
        onEliminar={eliminar} 
      />
    </div>
  );
}