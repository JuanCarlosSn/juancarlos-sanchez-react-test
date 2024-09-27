// src/components/Header.tsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store/authSlice';
import { clearProducts } from '../store/productsSlice';

/**
 * Componente Header.
 * Muestra un encabezado con enlaces de navegación y un botón para cerrar sesión.
 */
const Header: React.FC = () => {
  const dispatch = useDispatch();

  /**
   * Maneja el cierre de sesión del usuario.
   * Despacha las acciones de logout y clearProducts.
   */
  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearProducts());
  };

  return (
    <header className="header bg-light py-3">
      <nav className="container d-flex justify-content-between align-items-center">
        <div className="nav-center d-flex">
          <Link to="/products" className="nav-link mx-2">Productos</Link>
          <Link to="/users" className="nav-link mx-2">Usuarios</Link>
        </div>
        <div className="nav-right">
          <button onClick={handleLogout} className="btn btn-danger">Cerrar sesión</button>
        </div>
      </nav>
    </header>
  );
};

export default Header;