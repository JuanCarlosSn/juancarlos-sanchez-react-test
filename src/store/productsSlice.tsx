import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./index";


/**
 * Interfaz que define la estructura de un producto.
 */
interface Product {
  id: number; // ID único del producto
  title: string; // Título del producto
  price: number; // Precio del producto
  description: string; // Descripción del producto
  image: string; // URL de la imagen del producto
  category: string; // Categoría del producto
  rating: {
    rate: number; // Calificación promedio del producto
    count: number; // Número de calificaciones recibidas
  };
}

/**
 * Estado de Redux para la gestión de productos.
 */
interface ProductsState {
  products: Product[]; // Lista de productos
  status: "idle" | "loading" | "succeeded" | "failed"; // Estado de la solicitud
  error: string | null; // Mensaje de error, si lo hay
}

/**
 * Estado inicial de la lista de productos, cargado desde el localStorage si está disponible.
 */
const initialState: ProductsState = {
  products: JSON.parse(localStorage.getItem("products") || "[]"),
  status: "idle",
  error: null,
};

/**
 * AsyncThunk para la obtención de productos desde una API externa.
 * Al finalizar, almacena los productos en el localStorage.
 */
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    localStorage.setItem("products", JSON.stringify(data)); // Actualizar localStorage
    return data;
  }
);

/**
 * Slice de Redux para manejar el estado de los productos.
 */
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    /**
     * Acción para limpiar la lista de productos y resetear el estado.
     */
    clearProducts: (state) => {
      state.products = [];
      state.status = "idle";
      state.error = null;
      localStorage.setItem("products", JSON.stringify(state.products)); // Actualizar localStorage
    },
    /**
     * Acción para cargar productos desde el localStorage.
     */
    loadProductsFromLocalStorage: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
      state.status = "succeeded";
    },
    /**
     * Acción para agregar un nuevo producto a la lista.
     * @param action - Producto que se añadirá a la lista.
     */
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
      localStorage.setItem("products", JSON.stringify(state.products)); // Actualizar localStorage
    },
     /**
     * Acción para actualizar un producto existente.
     * @param action - Producto actualizado.
     */
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex(
        (product) => product.id === action.payload.id
      );
      if (index !== -1) {
        state.products[index] = action.payload;
        localStorage.setItem("products", JSON.stringify(state.products)); // Actualizar localStorage
      }
    },
    /**
     * Acción para eliminar un producto por ID.
     * @param action - ID del producto que se eliminará.
     */
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
      localStorage.setItem("products", JSON.stringify(state.products)); // Actualizar localStorage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch products";
      });
  },
});

/**
 * Exportar las acciones generadas por el slice.
 */
export const {
  clearProducts,
  loadProductsFromLocalStorage,
  addProduct,
  updateProduct,
  deleteProduct,
} = productsSlice.actions;

/**
 * Selector para obtener un producto por su ID.
 * @param state - Estado global de Redux.
 * @param productId - ID del producto a buscar.
 * @returns El producto que coincide con el ID, o undefined si no existe.
 */
export const selectProductById = (state: RootState, productId: number) =>
  state.products.products.find((product) => product.id === productId);


/**
 * Exportar el reducer del slice de productos.
 */
export default productsSlice.reducer;
