import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductoForm from './components/ProductoForm';
import ProductoList from './components/ProductoList';

const API = import.meta.env.VITE_API_URL;

export default function App() {
  const [productos, setProductos] = useState([]);
  const [editar, setEditar] = useState(null);
  const [mensaje, setMensaje] = useState(null);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const res = await axios.get(`${API}/productos`);
        setProductos(res.data);
      } catch (err) {
        setMensaje({ texto: '❌ Error al conectar con el servidor', tipo: 'error' });
      }
    };
    cargarDatos();
  }, []);

  const guardar = async (datos) => {
    try {
      if (editar) {
        await axios.put(`${API}/productos/${editar.id}`, datos);
        setMensaje({ texto: '✅ Producto actualizado', tipo: 'ok' });
      } else {
        await axios.post(`${API}/productos`, datos);
        setMensaje({ texto: '✅ Producto creado', tipo: 'ok' });
      }
      setEditar(null);
      const res = await axios.get(`${API}/productos`);
      setProductos(res.data);
    } catch (err) {
      setMensaje({ texto: '❌ Error al guardar', tipo: 'error' });
    }
    setTimeout(() => setMensaje(null), 3000);
  };

  const eliminar = async (id) => {
    if (!confirm('¿Seguro que quieres eliminar?')) return;
    try {
      await axios.delete(`${API}/productos/${id}`);
      setMensaje({ texto: '🗑️ Producto eliminado', tipo: 'ok' });
      const res = await axios.get(`${API}/productos`);
      setProductos(res.data);
    } catch (err) {
      setMensaje({ texto: '❌ Error al eliminar', tipo: 'error' });
    }
    setTimeout(() => setMensaje(null), 3000);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f0f2f5',
      padding: '2rem 1rem',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        <header style={{
          backgroundColor: '#2c3e50',
          color: 'white',
          padding: '1.5rem',
          textAlign: 'center'
        }}>
          <h1 style={{ margin: 0, fontSize: '1.8rem' }}>📋 GESTIÓN DE PRODUCTOS - CRUD COMPLETO</h1>
        </header>

        {mensaje && (
          <div style={{
            margin: '1rem 2rem',
            padding: '1rem',
            borderRadius: '6px',
            backgroundColor: mensaje.tipo === 'ok' ? '#d4edda' : '#f8d7da',
            color: mensaje.tipo === 'ok' ? '#155724' : '#721c24',
            textAlign: 'center',
            fontWeight: '500'
          }}>
            {mensaje.texto}
          </div>
        )}

        <div style={{ padding: '2rem' }}>
          <ProductoForm 
            onGuardar={guardar} 
            productoEditar={editar} 
            onCancelar={() => setEditar(null)} 
          />

          <hr style={{ margin: '2rem 0', border: 'none', borderTop: '1px solid #ddd' }} />

          <ProductoList 
            productos={productos} 
            onEditar={setEditar} 
            onEliminar={eliminar} 
          />
        </div>
      </div>
    </div>
  );
}