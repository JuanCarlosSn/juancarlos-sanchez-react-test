import React from "react";

/**
 * Propiedades del componente DetailHeader.
 */
interface DetailHeaderProps {
  title: string; // Título a mostrar en el encabezado
  onBack: () => void; // Función a ejecutar al hacer clic en el botón "Atrás"
  onEdit: () => void; // Función a ejecutar al hacer clic en el botón "Editar"
  onDelete: () => void; // Función a ejecutar al hacer clic en el botón "Eliminar"
}

/**
 * Componente DetailHeader.
 * Muestra un encabezado con un título y botones para navegar hacia atrás, editar y eliminar.
 * @param title - El título a mostrar en el encabezado.
 * @param onBack - Función a ejecutar al hacer clic en el botón "Atrás".
 * @param onEdit - Función a ejecutar al hacer clic en el botón "Editar".
 * @param onDelete - Función a ejecutar al hacer clic en el botón "Eliminar".
 */
const DetailHeader: React.FC<DetailHeaderProps> = ({
  title,
  onBack,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="d-flex justify-content-between align-items-center mb-4">
      <div className="d-flex align-items-center mb-3 header">
        <button
          onClick={onBack}
          className="btn btn-outline-secondary me-3 btn-back"
        >
          <i className="bi bi-arrow-left"></i> Atrás
        </button>
        <h1>{title}</h1>
      </div>
      <div>
        <button
          className="btn btn-primary add-button me-2"
          onClick={onEdit}
        >
          <i className="bi bi-pencil"></i> Editar
        </button>
        <button
          className="btn btn-primary add-button"
          onClick={onDelete}
        >
          <i className="bi bi-trash"></i> Eliminar
        </button>
      </div>
    </div>
  );
};

export default DetailHeader;