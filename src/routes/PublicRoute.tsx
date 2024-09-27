import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../store";

/**
 * Componente PublicRoute.
 * Protege las rutas públicas.
 * Si el usuario está autenticado, redirige a la página de productos.
 * Si el usuario no está autenticado, renderiza el componente hijo.
 */
const PublicRoute = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  return isAuthenticated ? <Navigate to="/products" /> : <Outlet />;
};

export default PublicRoute;
