import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import productsReducer from './productsSlice';
import alertReducer from "./alertSlice";
import usersSlice from './usersSlice';

/**
 * Configura la store central de Redux utilizando @reduxjs/toolkit.
 * Aquí se combinan múltiples reducers para manejar diferentes partes del estado global.
 */
export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersSlice,
    products: productsReducer,
    alert: alertReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;