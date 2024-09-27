import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "../pages/Login";
import Products from "../pages/Products";
import ProductCreate from "../pages/ProductCreate";
import ProductEdit from "../pages/ProductEdit";
import ProductDetails from "../pages/ProductDetails";
import Users from "../pages/Users";
import UsersCreate from "../pages/UserCreate";
import UsersEdit from "../pages/UserEdit";
import NotFound from "../pages/NotFound";

import Header from "../components/Header";

import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

/**
 * Componente AllRoutes.
 * Define todas las rutas de la aplicación, incluyendo rutas públicas, privadas y una ruta 404.
 */

const AllRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Redirigir la raíz a login si no está autenticado */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Rutas públicas */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Rutas protegidas */}
        <Route element={<PrivateRoute />}>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Products />
              </>
            }
          />
          <Route
            path="/products"
            element={
              <>
                <Header />
                <Products />
              </>
            }
          />
          <Route
            path="/products/:id"
            element={
              <>
                <Header />
                <ProductDetails />
              </>
            }
          />
          <Route
            path="/products/create"
            element={
              <>
                <Header />
                <ProductCreate />
              </>
            }
          />
          <Route
            path="/products/edit/:id"
            element={
              <>
                <Header />
                <ProductEdit />
              </>
            }
          />
          <Route
            path="/users"
            element={
              <>
                <Header />
                <Users />
              </>
            }
          />
          <Route
            path="/users/create"
            element={
              <>
                <Header />
                <UsersCreate />
              </>
            }
          />
          <Route
            path="/users/edit/:id"
            element={
              <>
                <Header />
                <UsersEdit />
              </>
            }
          />
        </Route>

        {/* Ruta 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AllRoutes;
