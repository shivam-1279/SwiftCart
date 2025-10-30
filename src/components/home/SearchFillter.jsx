import { useState, useEffect } from "react";
import api from "../../api"; // your axios instance

const SearchFilter = ({ onResults }) => {
  const title = "Discover the Best Products",
  subtitle = "Find amazing deals on electronics, clothing, and more",
  ctaText = "Shop Now",
  ctaLink = "#",
  backgroundImage = "https://cdn.shopify.com/s/files/1/0070/7032/articles/Header_32797302-c39f-49b9-9778-8e4ccd073571.png?v=1758555216"

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [categories] = useState([
    "Electronics",
    "Clothing",
    "Groceries",
    "Books",
    "Furniture",
  ]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    const params = {};

    if (search) params.search = search;
    if (category) params.category = category;
    if (minPrice) params.min_price = minPrice;
    if (maxPrice) params.max_price = maxPrice;

    api
      .get("/products/", { params })
      .then((res) => {
        onResults(res.data);
      })
      .catch((err) => {
        console.error("Filter error:", err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchProducts();
  };

  const handleReset = () => {
    setSearch("");
    setCategory("");
    setMinPrice("");
    setMaxPrice("");
    fetchProducts();
  };

  return (
    <div className="container my-4">
            <section
      className="hero-banner d-flex align-items-center justify-content-center text-center text-white"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "500px",
        position: "relative",
      }}
    >
      {/* Overlay */}
      <div
        className="overlay"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      ></div>

      {/* Content */}
      <div className="content position-relative px-3">
        <h1 className="display-4 fw-bold">{title}</h1>
        <p className="lead mb-4">{subtitle}</p>
        <a href={ctaLink} className="btn btn-primary btn-lg">
          {ctaText}
        </a>
      </div>
    </section>

      <form
        onSubmit={handleSubmit}
        className="border rounded p-3 bg-light shadow-sm"
      >
        <h5 className="mb-3 fw-bold">Search & Filter</h5>

        <div className="row g-3 align-items-center">
          {/* Search Input */}
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Category Dropdown */}
          <div className="col-md-3">
            <select
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Min Price */}
          <div className="col-md-2">
            <input
              type="number"
              className="form-control"
              placeholder="Min ₹"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </div>

          {/* Max Price */}
          <div className="col-md-2">
            <input
              type="number"
              className="form-control"
              placeholder="Max ₹"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>

          {/* Buttons */}
          <div className="col-md-1 d-flex gap-2">
            <button type="submit" className="btn btn-primary w-100">
              🔍
            </button>
          </div>
          <div className="col-md-12 mt-2">
            <button
              type="button"
              onClick={handleReset}
              className="btn btn-outline-secondary w-100"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchFilter;
