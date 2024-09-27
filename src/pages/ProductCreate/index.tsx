import React, { useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { addProduct } from "../../store/productsSlice";
import { setAlertMessage } from "../../store/alertSlice";
import { useNavigate } from "react-router-dom";

/**
 * Componente ProductCreate.
 * Permite a los usuarios crear un nuevo producto proporcionando un formulario para ingresar los detalles del producto.
 */
const ProductCreate: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Estados para los campos de entrada del formulario
  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  /**
   * Maneja el envío del formulario de creación de producto.
   * Valida y envía los datos del producto al servidor.
   * @param e - El evento de envío del formulario.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Almacenar la URL de la imagen en el almacenamiento local
    localStorage.setItem("productImageUrl", imageUrl);

    // Objeto para guardar en el estado
    const newProduct = {
      id: Date.now(), // Generar un ID único
      title,
      price,
      description,
      image: imageUrl,
      category,
      rating: {
        rate: 0,
        count: 0,
      },
    };

    // Objeto para enviar al servidor
    const newProductWithoutRating = {
      title: newProduct.title,
      price: newProduct.price,
      description: newProduct.description,
      image: newProduct.image,
      category: newProduct.category,
    };

    try {
      const response = await fetch("https://fakestoreapi.com/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProductWithoutRating),
      });

      if (!response.ok) {
        throw new Error("Error al agregar el producto");
      }

      const data = await response.json();
      //console.log("Producto agregado:", data);

      dispatch(addProduct(newProduct));
      dispatch(setAlertMessage("Producto agregado exitosamente"));
      navigate("/products");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  /**
   * Navega a la página anterior.
   */
  const handleBack = () => {
    navigate(-1); // Navegar a la página anterior
  };

  return (
    <div className="container mt-5 product-create-container">
      <div className="d-flex align-items-center mb-3 header">
        <button
          onClick={handleBack}
          className="btn btn-outline-secondary me-3 btn-back"
        >
          <i className="bi bi-arrow-left"></i> Atrás
        </button>
        <h2>Agregar Producto</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Título</label>
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
            min={0}
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
            maxLength={1000}
          />
        </div>

        <div className="form-group">
          <label>URL de la Imagen</label>
          <input
            type="url"
            className="form-control"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
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
          Crear Producto
        </button>
      </form>
    </div>
  );
};

export default ProductCreate;