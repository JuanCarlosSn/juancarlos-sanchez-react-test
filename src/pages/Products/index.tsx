import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setAlertMessage, clearAlertMessage } from "../../store/alertSlice";
import { useNavigate } from "react-router-dom";
import {
  fetchProducts,
  loadProductsFromLocalStorage,
  deleteProduct,
} from "../../store/productsSlice";
import DeleteConfirmationDialog from "./components/DeleteConfirmationDialog";
import ProductTable from "./components/ProductTable";
import MainHeader from "../../components/MainHeader";
import { Skeleton, Alert, Snackbar } from "@mui/material";

const Products: React.FC = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.products);
  const status = useAppSelector((state) => state.products.status);
  const error = useAppSelector((state) => state.products.error);
  const alertMessage = useAppSelector((state) => state.alert.message);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(3);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortField, setSortField] = useState<"id" | "title" | "price">("id");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [open, setOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);

  // Cargar productos desde localStorage al montar el componente
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products") || "[]");
    if (storedProducts.length > 0) {
      dispatch(loadProductsFromLocalStorage(storedProducts));
    } else {
      dispatch(fetchProducts());
    }
  }, [dispatch]);

  // Mostrar el Snackbar cuando hay un mensaje de alerta
  useEffect(() => {
    if (alertMessage) {
      setSnackbarOpen(true);
      const timer = setTimeout(() => {
        dispatch(clearAlertMessage());
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [alertMessage, dispatch]);

  // Filtrar productos por nombre
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Ordenar productos
  const sortedProducts = filteredProducts.sort((a, b) => {
    const fieldA = sortField === "price" ? a.price : a[sortField];
    const fieldB = sortField === "price" ? b.price : b[sortField];

    if (sortOrder === "asc") {
      return fieldA > fieldB ? 1 : -1;
    } else {
      return fieldA < fieldB ? 1 : -1;
    }
  });

  // Calcular la paginación
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Manejar la ordenación
  const handleSort = (field: "id" | "title" | "price") => {
    const newSortOrder =
      sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(newSortOrder);
  };

  // Redirigir a ProductCreate
  const handleAddProduct = () => {
    navigate("/products/create");
  };

  // Redirigir a ProductDetail
  const handleProductClick = (id: number) => {
    navigate(`/products/${id}`);
  };

  // Redirigir a ProductEdit
  const handleEditProduct = (id: number) => {
    navigate(`/products/edit/${id}`);
  };

  // Manejar la apertura del diálogo de confirmación de eliminación
  const handleClickOpen = (id: number) => {
    setSelectedProductId(id);
    setOpen(true);
  };

  // Manejar el cierre del diálogo de confirmación de eliminación
  const handleClose = () => {
    setOpen(false);
    setSelectedProductId(null);
  };

  // Manejar la eliminación del producto
  // Solo podrá eliminarse los productos que se encuentren en el servidor
const handleDelete = async () => {
  if (selectedProductId !== null) {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${selectedProductId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el producto');
      }

      dispatch(deleteProduct(selectedProductId));
      setOpen(false);
      setSelectedProductId(null);
      dispatch(setAlertMessage("Producto eliminado exitosamente"));
    } catch (error) {
      console.error('Error:', error);
      dispatch(setAlertMessage("Error al eliminar el producto"));
    }
  }
};

  return (
    <div className="container mt-5 products-container">
      <MainHeader title="Productos" buttonLabel="Agregar" onButtonClick={handleAddProduct} />
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
      {status === "succeeded" && (
        <>
          <input
            type="text"
            className="form-control mb-4"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <ProductTable
            products={sortedProducts}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            totalPages={totalPages}
            sortField={sortField}
            sortOrder={sortOrder}
            onSort={handleSort}
            onPageChange={handlePageChange}
            onProductClick={handleProductClick}
            onEditProduct={handleEditProduct}
            onDeleteProduct={handleClickOpen}
          />
        </>
      )}

      <DeleteConfirmationDialog
        open={open}
        onClose={handleClose}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default Products;