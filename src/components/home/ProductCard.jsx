import React from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../api";

function ProductCard({ product }) {
  return (
    <div className="card h-100 shadow-sm border-0 mt-5">
      <img
        src={`${BASE_URL}${product.image}`}
        className="card-img-top"
        alt={product.name}
        style={{ height: "220px", objectFit: "cover", borderTopLeftRadius: "0.5rem", borderTopRightRadius: "0.5rem" }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title text-truncate">{product.name}</h5>
        <p className="card-text text-muted mb-2">₹{product.price}</p>
        <Link
          to={`/product/${product.slug}`}
          className="btn btn-primary mt-auto rounded-pill"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
