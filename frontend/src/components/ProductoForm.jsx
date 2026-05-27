import { useState, useEffect } from 'react';

const vacio = { nombre: '', precio: '', categoria: '', stock: '' };

export default function ProductoForm({ onGuardar, productoEditar, onCancelar }) {
  const [form, setForm] = useState(vacio);

  useEffect(() => {
    if (productoEditar) {
      setForm(productoEditar);
    } else {
      setForm(vacio);
    }
  }, [productoEditar]);

  const cambiar = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const enviar = (e) => {
    e.preventDefault();
    if (!form.nombre || !form.precio || !form.categoria) {
      alert('⚠️ Los campos Nombre, Precio y Categoría son obligatorios');
      return;
    }
    onGuardar({
      ...form,
      precio: parseFloat(form.precio),
      stock: parseInt(form.stock) || 0
    });
  };

  return (
    <div style={{
      backgroundColor: '#f8f9fa',
      padding: '1.5rem',
      borderRadius: '8px',
      border: '1px solid #dee2e6'
    }}>
      <h3 style={{ color: '#495057', marginTop: 0, marginBottom: '1.5rem' }}>
        {productoEditar ? '✏️ EDITAR PRODUCTO' : '🆕 NUEVO PRODUCTO'}
      </h3>

      <form onSubmit={enviar} style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '1rem',
        alignItems: 'end'
      }}>
        <div>
          <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#495057', display: 'block', marginBottom: '0.3rem' }}>Nombre *</label>
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={cambiar}
            required
            style={{ width: '100%', padding: '0.5rem', border: '1px solid #ced4da', borderRadius: '4px', fontSize: '1rem' }}
          />
        </div>

        <div>
          <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#495057', display: 'block', marginBottom: '0.3rem' }}>Precio ($) *</label>
          <input
            type="number"
            step="0.01"
            name="precio"
            value={form.precio}
            onChange={cambiar}
            required
            style={{ width: '100%', padding: '0.5rem', border: '1px solid #ced4da', borderRadius: '4px', fontSize: '1rem' }}
          />
        </div>

        <div>
          <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#495057', display: 'block', marginBottom: '0.3rem' }}>Categoría *</label>
          <select
            name="categoria"
            value={form.categoria}
            onChange={cambiar}
            required
            style={{ width: '100%', padding: '0.5rem', border: '1px solid #ced4da', borderRadius: '4px', fontSize: '1rem' }}
          >
            <option value="">Seleccionar...</option>
            <option>Electrónica</option>
            <option>Periféricos</option>
            <option>Software</option>
            <option>Accesorios</option>
            <option>Hogar</option>
          </select>
        </div>

        <div>
          <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#495057', display: 'block', marginBottom: '0.3rem' }}>Stock</label>
          <input
            type="number"
            name="stock"
            value={form.stock}
            onChange={cambiar}
            min="0"
            style={{ width: '100%', padding: '0.5rem', border: '1px solid #ced4da', borderRadius: '4px', fontSize: '1rem' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            type="submit"
            style={{
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1.2rem',
              borderRadius: '4px',
              fontWeight: '600',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            Guardar
          </button>
          {productoEditar && (
            <button
              type="button"
              onClick={onCancelar}
              style={{
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1.2rem',
                borderRadius: '4px',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
}