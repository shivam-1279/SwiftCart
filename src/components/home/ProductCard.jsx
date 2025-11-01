// ProductCard.jsx - ENHANCED DEBUGGING
import React from "react";
import { Link } from "react-router-dom";
import { getImageUrl, PLACEHOLDER_IMAGE } from "../../api";

function ProductCard({ product }) {
  // ENHANCED DEBUG: Log everything about the product
  console.log('=== PRODUCT DEBUG INFO ===');
  console.log('Full product object:', JSON.stringify(product, null, 2));
  console.log('Product image field:', product.image);
  console.log('Product image_url field:', product.image_url);
  console.log('Type of product.image:', typeof product.image);
  console.log('Type of product.image_url:', typeof product.image_url);
  
  const imageSrc = getImageUrl(product.image_url || product.image);
  console.log('Final image URL:', imageSrc);
  console.log('=== END DEBUG ===');

  return (
    <div className="card h-100 shadow-sm border-0 mt-5">
      <img
        src={imageSrc}
        className="card-img-top"
        alt={product.name}
        onError={(e) => {
          console.log('❌ Image failed to load:', imageSrc);
          console.log('Using placeholder instead');
          e.target.src = PLACEHOLDER_IMAGE;
        }}
        onLoad={(e) => {
          console.log('✅ Image loaded successfully:', imageSrc);
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