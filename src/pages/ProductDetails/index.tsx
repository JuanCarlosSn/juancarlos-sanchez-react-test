import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { selectProductById, deleteProduct, loadProductsFromLocalStorage, fetchProducts } from "../../store/productsSlice";
import DeleteConfirmationDialog from "./components/DeleteConfirmationDialog";
import DetailHeader from "../../components/DetailHeader";
import { Box, Rating, Skeleton } from "@mui/material";

/**
 * Componente ProductDetail.
 * Muestra los detalles de un producto específico, permitiendo la edición y eliminación del mismo.
 */
const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const product = useAppSelector((state) => selectProductById(state, parseInt(id!)));
  const status = useAppSelector((state) => state.products.status);
  const error = useAppSelector((state) => state.products.error);

  const [open, setOpen] = useState(false);

  /**
   * Cargar productos desde localStorage al montar el componente.
   */
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products") || "[]");
    if (storedProducts.length > 0) {
      dispatch(loadProductsFromLocalStorage(storedProducts));
    } else {
      dispatch(fetchProducts());
    }
  }, [dispatch]);

  /**
   * Manejar la eliminación del producto.
   * Solo podrá eliminarse los productos que se encuentren en el servidor.
   */
  const handleDelete = async () => {
    if (id) {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Error al eliminar el producto');
        }

        dispatch(deleteProduct(parseInt(id)));
        navigate("/products");
      } catch (error) {
        console.error('Error:', error);
        // Aquí puedes agregar un mensaje de error para el usuario si lo deseas
      }
    }
  };

  /**
   * Manejar el cierre del diálogo de confirmación de eliminación.
   */
  const handleClose = () => {
    setOpen(false);
  };

  /**
   * Manejar la apertura del diálogo de confirmación de eliminación.
   */
  const handleOpen = () => {
    setOpen(true);
  };

  /**
   * Navegar a la página anterior.
   */
  const handleBack = () => {
    navigate(-1);
  };

  /**
   * Navegar a la página de edición del producto.
   */
  const handleEdit = () => {
    if (id) {
      navigate(`/products/edit/${id}`);
    }
  };

  return (
    <div className="container mt-5">
      {status === "loading" && (
        <div>
          <Skeleton variant="text" width={300} height={40} />
          <Skeleton variant="rectangular" width="100%" height={200} />
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" width="80%" />
          <Skeleton variant="text" width="50%" />
        </div>
      )}
      {status === "failed" && <p>Error: {error}</p>}
      {status === "succeeded" && product && (
        <div className="container mt-5 product-detail-container">
          <DetailHeader
            title={product.title}
            onBack={handleBack}
            onEdit={handleEdit}
            onDelete={handleOpen}
          />
          <div className="row">
            <div className="col-md-4">
              <img src={product.image} alt={product.title} className="img-fluid" />
            </div>
            <div className="col-md-8">
              <h3>Detalles del Producto</h3>
              <p>
                <strong>Precio:</strong> ${product.price}
              </p>
              <p>
                <strong>Descripción:</strong> {product.description}
              </p>
              <p>
                <strong>Categoría:</strong> {product.category}
              </p>
              <p>
                <strong>Calificación:</strong>
              </p>
              <div className="rating">
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Rating
                    name="read-only"
                    value={product.rating.rate}
                    precision={0.5}
                    readOnly
                  />
                  <p>
                    {product.rating.rate} estrellas de {product.rating.count}{" "}
                    opiniones
                  </p>
                </Box>
              </div>
            </div>
          </div>

          <DeleteConfirmationDialog
            open={open}
            onClose={handleClose}
            onConfirm={handleDelete}
          />
        </div>
      )}
      {status === "succeeded" && !product && (
        <p>Producto no encontrado.</p>
      )}
    </div>
  );
};

export default ProductDetail;