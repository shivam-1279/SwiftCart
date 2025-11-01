// ProductCard.jsx - ADD DEBUG LOGGING
import React from "react";
import { Link } from "react-router-dom";
import { getImageUrl, PLACEHOLDER_IMAGE } from "../../api";

function ProductCard({ product }) {
  // DEBUG: Log what the API returns
  console.log('Product data:', product);
  console.log('Product image path:', product.image);
  console.log('Product image_url:', product.image_url);
  
  const imageSrc = getImageUrl(product.image_url || product.image);
  console.log('Final image URL:', imageSrc);

  return (
    <div className="card h-100 shadow-sm border-0 mt-5">
      <img
        src={imageSrc}
        className="card-img-top"
        alt={product.name}
        onError={(e) => {
          console.log('Image failed to load, using placeholder');
          e.target.src = PLACEHOLDER_IMAGE;
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