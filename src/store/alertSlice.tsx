import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/**
 * Interfaz para definir el estado de la alerta.
 */
interface AlertState {
  message: string | null; // Mensaje de la alerta, puede ser null si no hay alerta
}

/**
 * Estado inicial de la alerta.
 */
const initialState: AlertState = {
  message: null,
};

/**
 * Slice de Redux para manejar el estado de la alerta.
 */
const alertSlice = createSlice({
  name: "alert", // Nombre del slice
  initialState, // Estado inicial
  reducers: {
    /**
     * Acción para establecer el mensaje de la alerta.
     * @param state - El estado actual de la alerta.
     * @param action - La acción que contiene el nuevo mensaje de la alerta.
     */
    setAlertMessage(state, action: PayloadAction<string>) {
      state.message = action.payload;
    },
    /**
     * Acción para limpiar el mensaje de la alerta.
     * @param state - El estado actual de la alerta.
     */
    clearAlertMessage(state) {
      state.message = null;
    },
  },
});

// Exportar las acciones generadas por el slice
export const { setAlertMessage, clearAlertMessage } = alertSlice.actions;

// Exportar el reducer del slice
export default alertSlice.reducer;