import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../store";

/**
 * Componente PrivateRoute.
 * Protege las rutas que requieren autenticación.
 * Si el usuario está autenticado, renderiza el componente hijo.
 * Si el usuario no está autenticado, redirige a la página de login.
 */
const PrivateRoute = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
