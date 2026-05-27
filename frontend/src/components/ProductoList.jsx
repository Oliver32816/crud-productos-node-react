export default function ProductoList({ productos, onEditar, onEliminar }) {
  if (!productos.length) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem', color: '#6c757d' }}>
        <p style={{ fontSize: '1.1rem' }}>📭 No hay productos registrados. Crea el primero usando el formulario.</p>
      </div>
    );
  }

  return (
    <div>
      <h3 style={{ color: '#495057', marginBottom: '1rem' }}>📊 LISTADO DE REGISTROS</h3>
      <div style={{ overflowX: 'auto', borderRadius: '8px', border: '1px solid #dee2e6' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white' }}>
          <thead>
            <tr style={{ backgroundColor: '#3498db', color: 'white', textAlign: 'left' }}>
              <th style={{ padding: '1rem', border: '1px solid #2980b9' }}>ID</th>
              <th style={{ padding: '1rem', border: '1px solid #2980b9' }}>Nombre</th>
              <th style={{ padding: '1rem', border: '1px solid #2980b9' }}>Precio</th>
              <th style={{ padding: '1rem', border: '1px solid #2980b9' }}>Categoría</th>
              <th style={{ padding: '1rem', border: '1px solid #2980b9' }}>Stock</th>
              <th style={{ padding: '1rem', border: '1px solid #2980b9' }}>Fecha</th>
              <th style={{ padding: '1rem', border: '1px solid #2980b9', textAlign: 'center' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map(p => (
              <tr key={p.id} style={{ borderBottom: '1px solid #ddd', transition: 'background 0.2s' }} onMouseOver={e => e.currentTarget.style.background = '#f1f8ff'} onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
                <td style={{ padding: '0.8rem', border: '1px solid #ddd' }}>{p.id}</td>
                <td style={{ padding: '0.8rem', border: '1px solid #ddd', fontWeight: '500' }}>{p.nombre}</td>
                <td style={{ padding: '0.8rem', border: '1px solid #ddd' }}>${p.precio.toFixed(2)}</td>
                <td style={{ padding: '0.8rem', border: '1px solid #ddd' }}>
                  <span style={{
                    backgroundColor: '#17a2b8',
                    color: 'white',
                    padding: '0.25rem 0.6rem',
                    borderRadius: '20px',
                    fontSize: '0.8rem'
                  }}>
                    {p.categoria}
                  </span>
                </td>
                <td style={{ padding: '0.8rem', border: '1px solid #ddd', textAlign: 'center' }}>{p.stock}</td>
                <td style={{ padding: '0.8rem', border: '1px solid #ddd', fontSize: '0.9rem', color: '#666' }}>{p.createdAt}</td>
                <td style={{ padding: '0.8rem', border: '1px solid #ddd', textAlign: 'center' }}>
                  <button
                    onClick={() => onEditar(p)}
                    style={{
                      backgroundColor: '#ffc107',
                      color: '#212529',
                      border: 'none',
                      padding: '0.4rem 0.8rem',
                      borderRadius: '4px',
                      marginRight: '0.4rem',
                      cursor: 'pointer',
                      fontWeight: '500'
                    }}
                  >
                    ✏️ Editar
                  </button>
                  <button
                    onClick={() => onEliminar(p.id)}
                    style={{
                      backgroundColor: '#dc3545',
                      color: 'white',
                      border: 'none',
                      padding: '0.4rem 0.8rem',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontWeight: '500'
                    }}
                  >
                    🗑️ Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}