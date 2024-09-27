import React, { useEffect } from 'react';
import { useAppDispatch } from '../store/hooks';
import { loadPredefinedUsers } from '../store/usersSlice';

/**
 * Componente LoadUsers.
 * Carga una lista de usuarios predefinidos al montar el componente.
 */
const LoadUsers: React.FC = () => {
  const dispatch = useAppDispatch();

  /**
   * Efecto que se ejecuta al montar el componente.
   * Despacha la acción loadPredefinedUsers para cargar usuarios predefinidos.
   */
  useEffect(() => {
    dispatch(loadPredefinedUsers());
  }, [dispatch]);

  return null;
};

export default LoadUsers;