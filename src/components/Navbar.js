import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../redux/authSlice";
import { clearProducts } from "../redux/productSlice";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const email = useSelector((state) => state.auth.email);
  const token = useSelector((state) => state.auth.token);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearProducts());
    navigate("/login", { replace: true });
  };

  return (
    <nav className="navbar">
      <Link className="brand" to={token ? "/products" : "/login"}>
        Seller Dashboard
      </Link>

      {token ? (
        <div className="nav-right">
          <span>{email}</span>
          <Link to="/products">Products</Link>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div className="nav-right">
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;