import React, { useState } from "react";
import { useAppDispatch } from '../../store/hooks';
import { login } from "../../store/authSlice";
import { fetchProducts } from '../../store/productsSlice';
import { useNavigate } from "react-router-dom";
import { authenticateUser } from "../../utils/auth";

/**
 * Componente de inicio de sesión.
 * Permite a los usuarios iniciar sesión validando su correo electrónico y contraseña.
 */
const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Estados para los campos de entrada y errores
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [usernameError, setUsernameError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");

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
   * Maneja el envío del formulario de inicio de sesión.
   * Valida los campos de entrada y autentica al usuario.
   * @param e - El evento de envío del formulario.
   */
  const handleLogin = (e: React.FormEvent) => {
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

    // Verificar si el usuario existe
    if (authenticateUser(username, password)) {
      localStorage.setItem('isAuthenticated', 'true');
      dispatch(login({ username, password }));
      dispatch(fetchProducts()); // Despachar la acción para obtener los productos
      navigate('/products');
    } else {
      setUsernameError("Nombre de usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2>Iniciar sesión</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
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
            />
            {confirmPasswordError && (
              <p className="text-danger">{confirmPasswordError}</p>
            )}
          </div>

          <button type="submit" className="btn-custom-primary">
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;