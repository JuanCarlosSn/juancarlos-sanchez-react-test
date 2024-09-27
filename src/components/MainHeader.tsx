import React from "react";

/**
 * Propiedades del componente MainHeader.
 */
interface MainHeaderProps {
  title: string; // Título a mostrar en el encabezado
  buttonLabel: string; // Etiqueta del botón
  onButtonClick: () => void; // Función a ejecutar al hacer clic en el botón
}

/**
 * Componente MainHeader.
 * Muestra un encabezado con un título y un botón de acción.
 * @param title - El título a mostrar en el encabezado.
 * @param buttonLabel - La etiqueta del botón.
 * @param onButtonClick - Función a ejecutar al hacer clic en el botón.
 */

const MainHeader: React.FC<MainHeaderProps> = ({ title, buttonLabel, onButtonClick }) => {
  return (
    <div className="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h1>{title}</h1>
      </div>
      <button className="btn btn-primary add-button" onClick={onButtonClick}>
        <i className="bi bi-plus"></i> {buttonLabel}
      </button>
    </div>
  );
};

export default MainHeader;