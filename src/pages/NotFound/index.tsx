import React from "react";

/**
 * Componente NotFound.
 * Este componente se muestra cuando una ruta no coincide con ninguna de las rutas definidas.
 * Muestra un mensaje de error 404 indicando que la página no existe.
 */
const NotFound: React.FC = () => {
  return (
    <div className="NotFound">
      <header className="NotFound-header">
        <h1 className="display-1">404</h1>
        <p className="lead">
          Lo siento, esta página no existe.
        </p>
        <a
          className="btn btn-primary btn-red"
          href="/"
        >
          Volver al inicio
        </a>
      </header>
    </div>
  );
}

export default NotFound;
