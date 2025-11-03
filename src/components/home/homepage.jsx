import React, { useEffect, useState } from "react";
import api from "../../api";
import CardContainer from "./CardContainer";
import PlaceholderContainer from "../ui/placeholderContainer";
import { randomValue } from "../../GenerateCartCode";
import SearchFilter from "./SearchFillter";
import { getImageUrl } from "../../api";

const Homepage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Aggressive error removal on component mount
  useEffect(() => {
    const removeAllErrors = () => {
      // Method 1: Remove by class
      const errorElements = document.querySelectorAll('.alert.alert-danger');
      errorElements.forEach(el => el.remove());
      
      // Method 2: Remove by text content
      const allElements = document.querySelectorAll('*');
      allElements.forEach(el => {
        if (el.textContent === 'Error loading products') {
          el.remove();
        }
      });
      
      // Method 3: Remove parent containers that might contain the error
      const containers = document.querySelectorAll('.mt-5, .pt-5, [class*="container"], [class*="content"]');
      containers.forEach(container => {
        const errors = container.querySelectorAll('.alert.alert-danger');
        errors.forEach(error => error.remove());
      });
    };

    removeAllErrors();
    
    // Run multiple times to catch dynamically rendered errors
    const intervals = [10, 50, 100, 200, 500, 1000];
    intervals.forEach(timeout => {
      setTimeout(removeAllErrors, timeout);
    });
  }, []);

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
        setProducts([]);
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