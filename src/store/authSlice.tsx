import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authenticateUser } from '../utils/auth';

/**
 * Interfaz para definir el estado de autenticación.
 */
interface AuthState {
  isAuthenticated: boolean; // Indica si el usuario está autenticado
}

/**
 * Estado inicial de autenticación.
 */
const initialState: AuthState = {
  isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
};

/**
 * Slice de Redux para manejar el estado de autenticación.
 */
const authSlice = createSlice({
  name: 'auth', // Nombre del slice
  initialState, // Estado inicial
  reducers: {
    /**
     * Acción para iniciar sesión.
     * @param state - El estado actual de autenticación.
     * @param action - La acción que contiene el nombre de usuario y la contraseña.
     */
    login(state, action: PayloadAction<{ username: string; password: string }>) {
      const { username, password } = action.payload;
      if (authenticateUser(username, password)) {
        state.isAuthenticated = true;
        localStorage.setItem('isAuthenticated', 'true');
      } else {
        state.isAuthenticated = false;
      }
    },
    /**
     * Acción para cerrar sesión.
     * @param state - El estado actual de autenticación.
     */
    logout(state) {
      state.isAuthenticated = false;
      localStorage.removeItem('isAuthenticated');
    },
  },
});

// Exportar las acciones generadas por el slice
export const { login, logout } = authSlice.actions;

// Exportar el reducer del slice
export default authSlice.reducer;