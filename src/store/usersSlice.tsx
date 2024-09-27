import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./index";
import { User } from "../typesUser";
import predefinedUsers from "../utils/users";

/**
 * Estado inicial del slice de usuarios, cargado desde el localStorage si está disponible.
 */
const initialState: User[] = JSON.parse(localStorage.getItem("users") || "[]");

/**
 * Slice de Redux para manejar el estado de los usuarios.
 */
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
     /**
     * Acción para agregar un nuevo usuario.
     * @param state - El estado actual de los usuarios.
     * @param action - Acción que contiene el usuario a agregar.
     */
    addUser: (state, action: PayloadAction<User>) => {
      state.push(action.payload);
      localStorage.setItem("users", JSON.stringify(state)); // Actualizar localStorage
    },
    /**
     * Acción para actualizar un usuario existente.
     * @param state - El estado actual de los usuarios.
     * @param action - Acción que contiene el usuario actualizado.
     */
    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.findIndex(user => user.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
        localStorage.setItem("users", JSON.stringify(state)); // Actualizar localStorage
      }
    },
    /**
     * Acción para eliminar un usuario por su ID.
     * @param state - El estado actual de los usuarios.
     * @param action - Acción que contiene el ID del usuario a eliminar.
     * @returns El nuevo estado de la lista de usuarios sin el usuario eliminado.
     */
    deleteUser: (state, action: PayloadAction<number>) => {
      const newState = state.filter((user) => user.id !== action.payload);
      localStorage.setItem("users", JSON.stringify(newState)); // Actualizar localStorage
      return newState;
    },
    /**
     * Acción para cargar usuarios predefinidos.
     * Si la lista de usuarios está vacía, se cargan los usuarios predefinidos.
     * @param state - El estado actual de los usuarios.
     */
    loadPredefinedUsers: (state) => {
      if (state.length === 0) {
        state.push(...predefinedUsers);
        localStorage.setItem("users", JSON.stringify(state)); // Guardar en localStorage
      }
    },
  },
});

/**
 * Exportar las acciones generadas por el slice.
 */
export const { addUser, updateUser, deleteUser, loadPredefinedUsers } = usersSlice.actions;

/**
 * Selector para obtener un usuario por su ID.
 * @param state - Estado global de Redux.
 * @param id - ID del usuario a buscar.
 * @returns El usuario que coincide con el ID, o undefined si no existe.
 */
export const selectUserById = (state: RootState, id: number) =>
  state.users.find((user) => user.id === id);

/**
 * Exportar el reducer del slice de usuarios.
 */
export default usersSlice.reducer;