import React, { useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { addUser } from "../../store/usersSlice";
import { useNavigate } from "react-router-dom";

/**
 * Valida el formato del correo electrónico.
 * @param username - El correo electrónico a validar.
 * @returns `true` si el correo electrónico es válido, `false` en caso contrario.
 */
const validateUsername = (username: string) => {
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return regex.test(username);
};

/**
 * Valida el formato de la contraseña.
 * @param password - La contraseña a validar.
 * @returns `true` si la contraseña es válida, `false` en caso contrario.
 */
const validatePassword = (password: string) => {
  const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#.]).{6,12}$/;
  return regex.test(password);
};

/**
 * Componente UserCreate.
 * Permite a los usuarios crear un nuevo usuario proporcionando un formulario para ingresar los detalles del usuario.
 */
const UserCreate: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Estados para los campos de entrada del formulario
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  // Estados para los mensajes de error
  const [usernameError, setUsernameError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");

  /**
   * Maneja el envío del formulario de creación de usuario.
   * Valida los campos de entrada y despacha la acción para agregar un nuevo usuario.
   * @param e - El evento de envío del formulario.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validar el correo
    if (!validateUsername(username)) {
      setUsernameError("Formato de correo incorrecto");
      return;
    } else {
      setUsernameError("");
    }

    // Validar la contraseña
    if (!validatePassword(password)) {
      setPasswordError(
        "La contraseña debe tener entre 6 y 12 caracteres, una mayúscula, una minúscula, un número y un carácter especial."
      );
      return;
    } else {
      setPasswordError("");
    }

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      setConfirmPasswordError("Las contraseñas no coinciden");
      return;
    } else {
      setConfirmPasswordError("");
    }

    const newUser = {
      id: Date.now(), // Generar un ID único
      name,
      username,
      password,
    };

    dispatch(addUser(newUser));
    navigate("/users");
  };

  /**
   * Navega a la página anterior.
   */
  const handleBack = () => {
    navigate(-1); // Navegar a la página anterior
  };

  return (
    <div className="container mt-5 user-create-container">
      <div className="d-flex align-items-center mb-3 header">
        <button
          onClick={handleBack}
          className="btn btn-outline-secondary me-3 btn-back"
        >
          <i className="bi bi-arrow-left"></i> Atrás
        </button>
        <h2>Agregar Usuario</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            minLength={1}
            maxLength={255}
          />
        </div>

        <div className="form-group">
          <label>Correo electrónico</label>
          <input
            type="email"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength={1}
            maxLength={255}
          />
          {usernameError && <p className="text-danger">{usernameError}</p>}
        </div>

        <div className="form-group">
          <label>Contraseña</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            maxLength={12}
          />
          {passwordError && <p className="text-danger">{passwordError}</p>}
        </div>

        <div className="form-group">
          <label>Confirmar Contraseña</label>
          <input
            type="password"
            className="form-control"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={6}
            maxLength={12}
          />
          {confirmPasswordError && (
            <p className="text-danger">{confirmPasswordError}</p>
          )}
        </div>

        <button type="submit" className="btn btn-primary btn-custom-primary">
          Crear Usuario
        </button>
      </form>
    </div>
  );
};

export default UserCreate;