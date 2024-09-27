import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { updateProduct, selectProductById } from "../../store/productsSlice";
import { setAlertMessage } from "../../store/alertSlice";
import { useNavigate, useParams } from "react-router-dom";

/**
 * Componente ProductEdit.
 * Permite a los usuarios editar un producto existente proporcionando un formulario para actualizar los detalles del producto.
 */
const ProductEdit: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); // Obtener el ID de la URL
  const product = useAppSelector((state) => selectProductById(state, Number(id)));

  // Estados para los campos de entrada del formulario
  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  // Efecto para cargar los datos del producto en los campos del formulario
  useEffect(() => {
    if (product) {
      setTitle(product.title);
      setPrice(product.price);
      setDescription(product.description);
      setImage(product.image);
      setCategory(product.category);
    }
  }, [product]);

  /**
   * Maneja el envío del formulario de edición de producto.
   * Valida y envía los datos actualizados del producto al servidor.
   * @param e - El evento de envío del formulario.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!product) {
      // Manejar el caso en que el producto no se encuentra
      console.error("Producto no encontrado");
      return;
    }

    // Objeto para guardar en el estado
    const updatedProduct = {
      id: product.id,
      title,
      price,
      description,
      image,
      category,
      rating: {
        rate: product.rating.rate,
        count: product.rating.count,
      }
    };

    // Objeto para enviar al servidor
    const updatedProductWithoutRating = {
      title: updatedProduct.title,
      price: updatedProduct.price,
      description: updatedProduct.description,
      image: updatedProduct.image,
      category: updatedProduct.category,
    };

    // Solo podrá editarse los productos que se encuentren en el servidor
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${product.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedProductWithoutRating)
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el producto');
      }

      const data = await response.json();
      //console.log('Producto actualizado:', data);

      dispatch(updateProduct(updatedProduct));
      dispatch(setAlertMessage("Producto editado exitosamente"));
      navigate("/products");
    } catch (error) {
      console.error('Error:', error);
    }
  };

  /**
   * Navega a la página anterior.
   */
  const handleBack = () => {
    navigate(-1); // Navegar a la página anterior
  };

  return (
    <div className="container mt-5 product-edit-container">
      <div className="d-flex align-items-center mb-3 header">
        <button onClick={handleBack} className="btn btn-outline-secondary me-3 btn-back">
          <i className="bi bi-arrow-left"></i> Atrás
        </button>
        <h2>Editar Producto</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            minLength={1}
            maxLength={255}
          />
        </div>

        <div className="form-group">
          <label>Precio</label>
          <input
            type="number"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
          />
        </div>

        <div className="form-group">
          <label>Descripción</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            minLength={1}
            maxLength={255}
          />
        </div>

        <div className="form-group">
          <label>Imagen (URL)</label>
          <input
            type="text"
            className="form-control"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
            minLength={1}
            maxLength={255}
          />
        </div>

        <div className="form-group">
          <label>Categoría</label>
          <input
            type="text"
            className="form-control"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            minLength={1}
            maxLength={255}
          />
        </div>

        <button type="submit" className="btn btn-primary btn-custom-primary">
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default ProductEdit;