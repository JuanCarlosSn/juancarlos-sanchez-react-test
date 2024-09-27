import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setAlertMessage, clearAlertMessage } from "../../store/alertSlice";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "../../store/usersSlice";
import DeleteConfirmationDialog from "./components/DeleteConfirmationDialog";
import UserTable from "./components/UserTable";
import MainHeader from "../../components/MainHeader";
import { Alert, Snackbar } from "@mui/material";
import { User } from "../../typesUser"; // Importar el tipo User

/**
 * Componente Users.
 * Muestra una lista de usuarios con funcionalidades de búsqueda, ordenación, paginación y eliminación.
 */
const Users: React.FC = () => {
  const dispatch = useAppDispatch();
  const alertMessage = useAppSelector((state) => state.alert.message);
  const navigate = useNavigate();

  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(3);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortField, setSortField] = useState<"id" | "username" | "password" | "name">("id");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [open, setOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);

  /**
   * Cargar usuarios desde localStorage al montar el componente.
   */
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    setUsers(storedUsers);
  }, []);

  /**
   * Mostrar el Snackbar cuando hay un mensaje de alerta.
   */
  useEffect(() => {
    if (alertMessage) {
      setSnackbarOpen(true);
      const timer = setTimeout(() => {
        dispatch(clearAlertMessage());
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [alertMessage, dispatch]);

  /**
   * Filtrar usuarios por nombre de usuario.
   */
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /**
   * Ordenar usuarios.
   */
  const sortedUsers = filteredUsers.sort((a, b) => {
    const fieldA = a[sortField];
    const fieldB = b[sortField];

    if (sortOrder === "asc") {
      return fieldA > fieldB ? 1 : -1;
    } else {
      return fieldA < fieldB ? 1 : -1;
    }
  });

  /**
   * Calcular la paginación.
   */
  const totalPages = Math.ceil(sortedUsers.length / itemsPerPage);

  /**
   * Manejar el cambio de página.
   * @param page - El número de la página a la que se desea cambiar.
   */
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  /**
   * Manejar la ordenación.
   * @param field - El campo por el cual se desea ordenar.
   */
  const handleSort = (field: "id" | "username" | "password" | "name") => {
    const newSortOrder =
      sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(newSortOrder);
  };

  /**
   * Redirigir a la página de creación de usuario.
   */
  const handleAddUser = () => {
    navigate("/users/create");
  };

  /**
   * Redirigir a la página de detalles del usuario.
   * @param id - El ID del usuario.
   */
  const handleUserClick = (id: number) => {
    // Redirigir a la página de detalles del usuario si existiera
  };

  /**
   * Redirigir a la página de edición del usuario.
   * @param id - El ID del usuario.
   */
  const handleEditUser = (id: number) => {
    navigate(`/users/edit/${id}`);
  };

  /**
   * Manejar la apertura del diálogo de confirmación de eliminación.
   * @param id - El ID del usuario a eliminar.
   */
  const handleClickOpen = (id: number) => {
    setSelectedUserId(id);
    setOpen(true);
  };

  /**
   * Manejar el cierre del diálogo de confirmación de eliminación.
   */
  const handleClose = () => {
    setOpen(false);
    setSelectedUserId(null);
  };

  /**
   * Manejar la eliminación del usuario.
   */
  const handleDelete = () => {
    if (selectedUserId !== null) {
      dispatch(deleteUser(selectedUserId));
      setUsers(users.filter(user => user.id !== selectedUserId));
      setOpen(false);
      setSelectedUserId(null);
      dispatch(setAlertMessage("Usuario eliminado exitosamente"));
    }
  };

  return (
    <div className="container mt-5 users-container">
      <MainHeader title="Usuarios" buttonLabel="Agregar" onButtonClick={handleAddUser} />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={10000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success">
          {alertMessage}
        </Alert>
      </Snackbar>
      <>
        <input
          type="text"
          className="form-control mb-4"
          placeholder="Buscar usuarios..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <UserTable
          users={sortedUsers}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalPages={totalPages}
          sortField={sortField}
          sortOrder={sortOrder}
          onSort={handleSort}
          onPageChange={handlePageChange}
          onUserClick={handleUserClick}
          onEditUser={handleEditUser}
          onDeleteUser={handleClickOpen}
        />
      </>

      <DeleteConfirmationDialog
        open={open}
        onClose={handleClose}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default Users;