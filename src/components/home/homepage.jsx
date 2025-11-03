import React, { useEffect, useState } from "react";
import api from "../../api";
import CardContainer from "./CardContainer";
import PlaceholderContainer from "../ui/placeholderContainer";
import { Error } from "../ui/Eror";
import { randomValue } from "../../GenerateCartCode";
import SearchFilter from "./SearchFillter";
import { getImageUrl } from "../../api"; // Import getImageUrl from api

const Homepage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("cart_code")) {
      localStorage.setItem("cart_code", randomValue);
    }
  }, []);

  // Fixed useEffect - removed infinite loop and added proper error handling
  useEffect(() => {
    setLoading(true);
    setError(""); // Clear previous errors
    
    api.get("/products/")
      .then((res) => {
        // Process products with proper image URLs
        const processedProducts = res.data.map(product => ({
          ...product,
          image_url: getImageUrl(product.image_url || product.image)
        }));
        
        setProducts(processedProducts);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Products API error:", err);
        // Only show error if it's not an auth issue (401)
        if (err.response?.status !== 401) {
          setError("Error loading products. Please try again later.");
        } else {
          // For 401 errors, just log but don't show error to user
          console.log("Authentication required for products API");
        }
        setLoading(false);
      });
  }, []); // Empty dependency array - runs only once

  const handleFilteredResults = (filteredData) => {
    setProducts(filteredData);
  };

  return (
    <>
      <div className="mt-5 pt-5">
        <SearchFilter onResults={handleFilteredResults} />
        {error && <Error error={error} />}
        {loading ? (
          <PlaceholderContainer />
        ) : (
          products.length > 0 && <CardContainer products={products} />
        )}
        {/* Show message when no products but not loading */}
        {!loading && products.length === 0 && !error && (
          <div className="text-center text-muted py-5">
            <p>No products found.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Homepage;