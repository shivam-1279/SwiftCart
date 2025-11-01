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
      console.log('=== 🎯 API RESPONSE DEBUG ===');
      res.data.forEach((product, index) => {
        console.log(`📦 Product ${index + 1}: ${product.name}`);
        console.log('   Raw image field:', product.image);
        console.log('   Raw image_url field:', product.image_url);
        
        // Test what getImageUrl will return
        const testUrl = getImageUrl(product.image_url || product.image);
        console.log('   Final URL:', testUrl);
      });
      console.log('=== END DEBUG ===');

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