// ProductCard.jsx - ENHANCED DEBUGGING
import React from "react";
import { Link } from "react-router-dom";
import { getImageUrl, PLACEHOLDER_IMAGE } from "../../api";

function ProductCard({ product }) {
  
  const imageSrc = getImageUrl(product.image_url || product.image);
  return (
    <div className="card h-100 shadow-sm border-0 mt-5">
      <img
        src={imageSrc}
        className="card-img-top"
        alt={product.name}
        onError={(e) => {
          e.target.src = PLACEHOLDER_IMAGE;
        }}
        onLoad={(e) => {
        }}
        style={{ 
          height: "220px", 
          objectFit: "cover", 
          borderTopLeftRadius: "0.5rem", 
          borderTopRightRadius: "0.5rem" 
        }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title text-truncate">{product.name}</h5>
        <p className="card-text text-muted mb-2">${product.price}</p>
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