import React from "react";

/**
 * Interfaz para definir las propiedades de una columna en la tabla.
 */
interface Column {
  key: string; // Clave única para identificar la columna
  label: string; // Etiqueta a mostrar en el encabezado de la columna
  sortable?: boolean; // Indica si la columna es ordenable
  render?: (item: any) => React.ReactNode; // Función para renderizar el contenido de la columna
}

/**
 * Interfaz para definir las propiedades del componente Table.
 */
interface TableProps {
  columns: Column[]; // Array de columnas a mostrar en la tabla
  data: any[]; // Array de datos a mostrar en la tabla
  sortField: string; // Campo por el cual se está ordenando actualmente
  sortOrder: "asc" | "desc"; // Orden de la ordenación (ascendente o descendente)
  onSort: (field: string) => void; // Función a ejecutar al ordenar una columna
  onRowClick?: (id: number) => void; // Función a ejecutar al hacer clic en una fila
  renderActions?: (item: any) => React.ReactNode; // Función para renderizar acciones en una columna adicional
}

/**
 * Componente Table.
 * Muestra una tabla con funcionalidades de ordenación y acciones personalizadas.
 * @param columns - Array de columnas a mostrar en la tabla.
 * @param data - Array de datos a mostrar en la tabla.
 * @param sortField - Campo por el cual se está ordenando actualmente.
 * @param sortOrder - Orden de la ordenación (ascendente o descendente).
 * @param onSort - Función a ejecutar al ordenar una columna.
 * @param onRowClick - Función a ejecutar al hacer clic en una fila.
 * @param renderActions - Función para renderizar acciones en una columna adicional.
 */
const Table: React.FC<TableProps> = ({
  columns,
  data,
  sortField,
  sortOrder,
  onSort,
  onRowClick,
  renderActions,
}) => {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          {columns.map((column) => (
            <th
              key={column.key}
              onClick={() => column.sortable && onSort(column.key)}
              style={{ cursor: column.sortable ? "pointer" : "default" }}
            >
              {column.label}{" "}
              {column.sortable && sortField === column.key && (
                <span>
                  {sortOrder === "asc" ? (
                    <i className="bi bi-arrow-up"></i>
                  ) : (
                    <i className="bi bi-arrow-down"></i>
                  )}
                </span>
              )}
            </th>
          ))}
          {renderActions && <th>Acciones</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id} onClick={() => onRowClick && onRowClick(item.id)}>
            {columns.map((column) => (
              <td key={column.key}>
                {column.render ? column.render(item) : item[column.key]}
              </td>
            ))}
            {renderActions && <td>{renderActions(item)}</td>}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;