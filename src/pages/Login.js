import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { loginSuccess } from "../redux/authSlice";

const API = "https://worksheet-product.mashupstack.com";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(
    location.state?.message || ""
  );
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const response = await axios.post(`${API}/login`, {
        email: email,
        password: password,
      });

      const token = response.data.token;

      if (!token) {
        setMessage("Login response did not contain a token.");
        return;
      }

      dispatch(
        loginSuccess({
          email: response.data.email || email,
          token: token,
        })
      );

      navigate("/products", { replace: true });
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        "Login failed. Check your email and password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <form className="form-card" onSubmit={handleLogin}>
        <h2>Seller Login</h2>

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        {message && <p className="error-message">{message}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p>
          New seller? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;