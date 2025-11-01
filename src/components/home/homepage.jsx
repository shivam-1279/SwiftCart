import React, { useEffect, useState } from "react";
import api from "../../api";
import CardContainer from "./CardContainer";
import PlaceholderContainer from "../ui/placeholderContainer";
import { Error } from "../ui/Eror";
import { randomValue } from "../../GenerateCartCode";
import SearchFilter from "./SearchFillter";

const Homepage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("cart_code")) {
      localStorage.setItem("cart_code", randomValue);
    }
  }, []);

  // In your homepage.jsx - ADD DEBUG
useEffect(() => {
  setLoading(true);
  api
    .get("/products/")
    .then((res) => {
      res.data.forEach((product, index) => {
        
        // Test what getImageUrl will return
        const testUrl = getImageUrl(product.image_url || product.image);
      });

      setProducts(res.data);
      setLoading(false);  
      setError("");
    })
    .catch((err) => {
      setError("Error loading products");
      setLoading(false);
    });
}, []); // **FIX: Remove [products] to avoid infinite loop**

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
      </div>
    </>
  );
};

export default Homepage;