import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

import { useSelector } from "react-redux";

import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProductList from "./pages/ProductList";
import ViewProduct from "./pages/ViewProduct";

function ProtectedRoute() {
  const token = useSelector((state) => state.auth.token);

  return token ? <Outlet /> : <Navigate to="/login" replace />;
}

function App() {
  const token = useSelector((state) => state.auth.token);

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <Navigate
              to={token ? "/products" : "/login"}
              replace
            />
          }
        />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:id" element={<ViewProduct />} />
        </Route>

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;