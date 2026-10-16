import { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import {
  setProducts,
  setProductStatus,
  setProductError,
} from "../redux/productSlice";

const API = "https://worksheet-product.mashupstack.com";

function ProductList() {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);

  const products = useSelector(
    (state) => state.products.items
  );

  const status = useSelector(
    (state) => state.products.status
  );

  const error = useSelector(
    (state) => state.products.error
  );

  useEffect(() => {
    if (!token || status !== "idle") {
      return;
    }

    const fetchProducts = async () => {
      dispatch(setProductStatus("loading"));

      try {
        const response = await axios.get(`${API}/product`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Support either an array response or { products: [...] }.
        const data = response.data;
        const productData = Array.isArray(data)
          ? data
          : data.products;

        if (!Array.isArray(productData)) {
          throw new Error("Unexpected product API response.");
        }

        dispatch(setProducts(productData));
      } catch (error) {
        dispatch(
          setProductError(
            error.response?.data?.message ||
            error.message ||
            "Failed to fetch products."
          )
        );
      }
    };

    fetchProducts();
  }, [token, status, dispatch]);

  if (status === "loading") {
    return <p className="center-message">Loading products...</p>;
  }

  if (status === "failed") {
    return (
      <div className="page-container">
        <p className="error-message">{error}</p>
        <button
          onClick={() => dispatch(setProductStatus("idle"))}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="content-container">
      <h2>Product List</h2>

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="product-list">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <div>
                <h3>{product.name}</h3>
                <p>Price: ₹{product.price}</p>
                <p>Quantity: {product.quantity}</p>
              </div>

              <Link
                className="view-button"
                to={`/product/${product.id}`}
              >
                View
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;