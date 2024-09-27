import React from "react";
import { Tooltip, IconButton } from "@mui/material";
import Table from "../../../components/Table";

/**
 * Interfaz para definir las propiedades de un usuario.
 */
interface User {
  id: number; // Identificador único del usuario
  username: string; // Nombre de usuario
  password: string; // Contraseña del usuario
  name: string; // Nombre completo del usuario
}

/**
 * Interfaz para definir las propiedades del componente UserTable.
 */
interface UserTableProps {
  users: User[]; // Array de usuarios a mostrar en la tabla
  currentPage: number; // Página actual de la paginación
  itemsPerPage: number; // Número de elementos por página
  totalPages: number; // Número total de páginas
  sortField: "id" | "username" | "password" | "name"; // Campo por el cual se está ordenando actualmente
  sortOrder: "asc" | "desc"; // Orden de la ordenación (ascendente o descendente)
  onSort: (field: "id" | "username" | "password" | "name") => void; // Función a ejecutar al ordenar una columna
  onPageChange: (page: number) => void; // Función a ejecutar al cambiar de página
  onUserClick: (id: number) => void; // Función a ejecutar al hacer clic en un usuario
  onEditUser: (id: number) => void; // Función a ejecutar al editar un usuario
  onDeleteUser: (id: number) => void; // Función a ejecutar al eliminar un usuario
}

/**
 * Componente UserTable.
 * Muestra una tabla de usuarios con funcionalidades de ordenación, paginación y acciones de edición y eliminación.
 * @param users - Array de usuarios a mostrar en la tabla.
 * @param currentPage - Página actual de la paginación.
 * @param itemsPerPage - Número de elementos por página.
 * @param totalPages - Número total de páginas.
 * @param sortField - Campo por el cual se está ordenando actualmente.
 * @param sortOrder - Orden de la ordenación (ascendente o descendente).
 * @param onSort - Función a ejecutar al ordenar una columna.
 * @param onPageChange - Función a ejecutar al cambiar de página.
 * @param onUserClick - Función a ejecutar al hacer clic en un usuario.
 * @param onEditUser - Función a ejecutar al editar un usuario.
 * @param onDeleteUser - Función a ejecutar al eliminar un usuario.
 */
const UserTable: React.FC<UserTableProps> = ({
  users,
  currentPage,
  itemsPerPage,
  totalPages,
  sortField,
  sortOrder,
  onSort,
  onPageChange,
  onUserClick,
  onEditUser,
  onDeleteUser,
}) => {
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const columns = [
    { key: "id", label: "ID", sortable: true },
    { key: "username", label: "Correo electrónico", sortable: true },
    { key: "password", label: "Contraseña", sortable: true },
    { key: "name", label: "Nombre", sortable: true },
  ];

  const renderPagination = () => {
    const pageNumbers = [];
    let startPage = Math.max(currentPage - 2, 1);
    let endPage = Math.min(currentPage + 2, totalPages);

    if (currentPage <= 3) {
      endPage = Math.min(5, totalPages);
    } else if (currentPage + 2 >= totalPages) {
      startPage = Math.max(totalPages - 4, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <nav>
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <i className="bi bi-arrow-left"></i>
            </button>
          </li>
          {pageNumbers.map((number) => (
            <li
              key={number}
              className={`page-item ${currentPage === number ? "active" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => onPageChange(number)}
              >
                {number}
              </button>
            </li>
          ))}
          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <i className="bi bi-arrow-right"></i>
            </button>
          </li>
        </ul>
      </nav>
    );
  };

  return (
    <>
      <Table
        columns={columns}
        data={currentUsers}
        sortField={sortField}
        sortOrder={sortOrder}
        onSort={(field) => onSort(field as "id" | "username" | "password" | "name")}
        onRowClick={onUserClick}
        renderActions={(user: User) => (
          <>
            <Tooltip title="Editar usuario">
              <IconButton
                className="me-2"
                onClick={(e) => {
                  e.stopPropagation();
                  onEditUser(user.id);
                }}
              >
                <i className="bi bi-pencil icon-small"></i>
              </IconButton>
            </Tooltip>
            <Tooltip title="Eliminar usuario">
              <IconButton
                color="error"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteUser(user.id);
                }}
              >
                <i className="bi bi-trash icon-small"></i>
              </IconButton>
            </Tooltip>
          </>
        )}
      />
      {renderPagination()}
    </>
  );
};

export default UserTable;