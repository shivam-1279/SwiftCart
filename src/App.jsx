import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/ui/Footer";
import Navbar from "./components/ui/NavBar";
import ProductCard from "./components/home/ProductCard";
import NotFound from "./components/ui/NotFound";
import "./App.css";
import Homepage from "./components/home/homepage";
import Productpage from "./components/products/Productpage";
import { useState } from "react";
import api from "./api";
import CartPage from "./components/cart/CartPage"; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CheckoutPage from "./components/checkout/CheckoutPage";
import LoginPage from "./components/user/LoginPage";
import Register from "./components/user/Register"; // Add this import
import ProtectedRoute from "./components/ui/ProtectedRoute";
import UserPage from "./components/user/UserPage";
import OrderHistory from "./components/user/OrderHistory"; // Add this import

function App() {
  const [numCartItems, setNumberCartItems] = useState(0);
  const cart_code = localStorage.getItem("cart_code");

  // Function to fetch cart stats
  const fetchCartStats = () => {
    if (cart_code) {
      api.get(`get_cart_stats/?cart_code=${cart_code}`)
        .then(res => {
          console.log("Cart stats:", res.data);
          setNumberCartItems(res.data.num_items || 0);
        })
        .catch(err => {
          console.log("Error fetching cart stats:", err.message);
          setNumberCartItems(0);
        });
    }
  };

  useEffect(() => {
    fetchCartStats();
  }, [cart_code]);

  return (
    <>
      {/* Navbar always visible */}
      <Navbar numCartItems={numCartItems} />

      {/* Page content changes based on route */}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} /> {/* Add register route */}
          <Route path="/profile" element={<ProtectedRoute><UserPage /></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute><OrderHistory /></ProtectedRoute>} /> {/* Add orders route */}
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
          <Route path="/product/:slug" element={
              <Productpage 
                setNumberCartItems={setNumberCartItems} 
                fetchCartStats={fetchCartStats}
              />
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <ToastContainer />
      {/* Footer always visible */}
      <Footer />
    </>
  );
}

export default App;