import React, { useEffect, useState } from "react";
import api from "../../api";
import CardContainer from "./CardContainer";
import PlaceholderContainer from "../ui/placeholderContainer";
import { Error } from "../ui/Eror";
import { randomValue } from "../../GenerateCartCode";
import SearchFilter from "./SearchFillter";
import { getImageUrl } from "../../api";

const Homepage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("cart_code")) {
      localStorage.setItem("cart_code", randomValue);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    setError("");
    
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
        
        // COMPLETELY IGNORE 401 ERRORS - DON'T SET ERROR STATE
        if (err.response?.status === 401) {
          console.log("Products API requires authentication, but continuing silently");
          // Set empty products array instead of showing error
          setProducts([]);
        } else {
          // Only show error for other types of failures
          setError("Error loading products. Please try again later.");
        }
        
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
        {error && <Error error={error} />}
        {loading ? (
          <PlaceholderContainer />
        ) : (
          products.length > 0 && <CardContainer products={products} />
        )}
        {/* Show message when no products but not loading and no error */}
        {!loading && products.length === 0 && !error && (
          <div className="text-center text-muted py-5">
            <p>No products available at the moment.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Homepage;