import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

function ViewProduct() {
  const { id } = useParams();

  const products = useSelector(
    (state) => state.products.items
  );

  const product = products.find(
    (item) => String(item.id) === String(id)
  );

  if (!product) {
    return (
      <div className="content-container">
        <h2>Product not found</h2>
        <p>
          The product may not be available in the Redux store.
        </p>
        <Link to="/products">Back to Products</Link>
      </div>
    );
  }

  return (
    <div className="content-container">
      <div className="details-card">
        <h2>{product.name}</h2>

        <p>
          <strong>Product ID:</strong> {product.id}
        </p>

        <p>
          <strong>Description:</strong> {product.description}
        </p>

        <p>
          <strong>Price:</strong> ₹{product.price}
        </p>

        <p>
          <strong>Quantity:</strong> {product.quantity}
        </p>

        <Link className="view-button" to="/products">
          Back to Products
        </Link>
      </div>
    </div>
  );
}

export default ViewProduct;