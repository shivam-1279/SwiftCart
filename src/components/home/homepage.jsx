import React, { useEffect, useState } from "react";
import api from "../../api";
import CardContainer from "./CardContainer";
import PlaceholderContainer from "../ui/placeholderContainer";
// Remove Error import since we won't use it
import { randomValue } from "../../GenerateCartCode";
import SearchFilter from "./SearchFillter";
import { getImageUrl } from "../../api";

const Homepage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  // Remove error state entirely
  // const [error, setError] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("cart_code")) {
      localStorage.setItem("cart_code", randomValue);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    
    api.get("/products/")
      .then((res) => {
        const processedProducts = res.data.map(product => ({
          ...product,
          image_url: getImageUrl(product.image_url || product.image)
        }));
        
        setProducts(processedProducts);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Products API error:", err);
        // Don't set any error state - just log and continue
        setProducts([]); // Set empty array on error
        setLoading(false);
      });
  }, []);

  const handleFilteredResults = (filteredData) => {
    setProducts(filteredData);
  };

  return (
    <>
      <div className="mt-5 pt-5">
        <SearchFilter onResults={handleFilteredResults} />
        {/* Remove error display completely */}
        {loading ? (
          <PlaceholderContainer />
        ) : (
          products.length > 0 && <CardContainer products={products} />
        )}
        {!loading && products.length === 0 && (
          <div className="text-center text-muted py-5">
            <p>No products available at the moment.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Homepage;