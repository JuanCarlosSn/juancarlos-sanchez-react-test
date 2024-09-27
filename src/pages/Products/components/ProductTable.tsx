import React from "react";
import { Tooltip, IconButton } from "@mui/material";
import Table from "../../../components/Table";

/**
 * Interfaz para definir las propiedades de un producto.
 */
interface Product {
  id: number; // Identificador único del producto
  title: string; // Título del producto
  price: number; // Precio del producto
  image: string; // URL de la imagen del producto
}

/**
 * Interfaz para definir las propiedades del componente ProductTable.
 */
interface ProductTableProps {
  products: Product[]; // Array de productos a mostrar en la tabla
  currentPage: number; // Página actual de la paginación
  itemsPerPage: number; // Número de elementos por página
  totalPages: number; // Número total de páginas
  sortField: "id" | "title" | "price"; // Campo por el cual se está ordenando actualmente
  sortOrder: "asc" | "desc"; // Orden de la ordenación (ascendente o descendente)
  onSort: (field: "id" | "title" | "price") => void; // Función a ejecutar al ordenar una columna
  onPageChange: (page: number) => void; // Función a ejecutar al cambiar de página
  onProductClick: (id: number) => void; // Función a ejecutar al hacer clic en un producto
  onEditProduct: (id: number) => void; // Función a ejecutar al editar un producto
  onDeleteProduct: (id: number) => void; // Función a ejecutar al eliminar un producto
}

/**
 * Componente ProductTable.
 * Muestra una tabla de productos con funcionalidades de ordenación, paginación y acciones de edición y eliminación.
 * @param products - Array de productos a mostrar en la tabla.
 * @param currentPage - Página actual de la paginación.
 * @param itemsPerPage - Número de elementos por página.
 * @param totalPages - Número total de páginas.
 * @param sortField - Campo por el cual se está ordenando actualmente.
 * @param sortOrder - Orden de la ordenación (ascendente o descendente).
 * @param onSort - Función a ejecutar al ordenar una columna.
 * @param onPageChange - Función a ejecutar al cambiar de página.
 * @param onProductClick - Función a ejecutar al hacer clic en un producto.
 * @param onEditProduct - Función a ejecutar al editar un producto.
 * @param onDeleteProduct - Función a ejecutar al eliminar un producto.
 */
const ProductTable: React.FC<ProductTableProps> = ({
  products,
  currentPage,
  itemsPerPage,
  totalPages,
  sortField,
  sortOrder,
  onSort,
  onPageChange,
  onProductClick,
  onEditProduct,
  onDeleteProduct,
}) => {
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const columns = [
    { key: "id", label: "ID", sortable: true },
    { key: "title", label: "Nombre", sortable: true },
    {
      key: "price",
      label: "Precio",
      sortable: true,
      render: (product: Product) => `$${product.price}`,
    },
    {
      key: "image",
      label: "Imagen",
      render: (product: Product) => (
        <img
          src={product.image}
          alt={product.title}
          style={{ width: "50px" }}
        />
      ),
    },
  ];

  const renderPagination = () => {
    const pageNumbers = [];
    let startPage = Math.max(currentPage - 2, 1);
    let endPage = Math.min(currentPage + 2, totalPages);

    if (currentPage <= 3) {
      endPage = Math.min(5, totalPages);
    } else if (currentPage + 2 >= totalPages) {
      startPage = Math.max(totalPages - 4, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <nav>
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <i className="bi bi-arrow-left"></i>
            </button>
          </li>
          {pageNumbers.map((number) => (
            <li
              key={number}
              className={`page-item ${currentPage === number ? "active" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => onPageChange(number)}
              >
                {number}
              </button>
            </li>
          ))}
          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <i className="bi bi-arrow-right"></i>
            </button>
          </li>
        </ul>
      </nav>
    );
  };

  return (
    <>
      <Table
        columns={columns}
        data={currentProducts}
        sortField={sortField}
        sortOrder={sortOrder}
        onSort={(field) => onSort(field as "id" | "title" | "price")}
        onRowClick={onProductClick}
        renderActions={(product) => (
          <>
            <Tooltip title="Editar producto">
              <IconButton
                className="me-2"
                onClick={(e) => {
                  e.stopPropagation();
                  onEditProduct(product.id);
                }}
              >
                <i className="bi bi-pencil icon-small"></i>
              </IconButton>
            </Tooltip>
            <Tooltip title="Eliminar producto">
              <IconButton
                color="error"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteProduct(product.id);
                }}
              >
                <i className="bi bi-trash icon-small"></i>
              </IconButton>
            </Tooltip>
          </>
        )}
      />
      {renderPagination()}
    </>
  );
};

export default ProductTable;