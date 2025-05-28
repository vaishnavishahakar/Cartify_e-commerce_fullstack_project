import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getCurrentUser, logout } from "../utils/Common";
import toast from "react-hot-toast";
import { ShoppingCart } from "lucide-react";

const Navbar = ({ onSearch }) => {
  const user = getCurrentUser();
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [search, setSearch] = useState(params.get("search") || "");
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    setSearch(params.get("search") || "");
  }, [location.search]);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const uniqueProducts = new Set(cart.map(item => item.productId));
      setCartCount(uniqueProducts.size);
    };

    updateCartCount();
    window.addEventListener("storage", updateCartCount);

    return () => {
      window.removeEventListener("storage", updateCartCount);
    };
  }, []);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    navigate(`/?search=${value}`);
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <nav className="bg-blue-500 text-white py-4 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link to="/" className="text-xl font-playwrite">Cartify</Link>

        {/* Search Input */}
        <div className="w-full sm:w-full md:w-[40%] mx-auto px-6">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full p-3 sm:p-2 rounded-full border border-white bg-transparent text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white transition-all duration-300 shadow-none hover:shadow-none text-lg sm:text-base"
            value={search}
            onChange={handleSearchChange}
          />
        </div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          <Link to="/" className="hover:text-blue-200 font-funnel text-lg">Home</Link>
          <Link to="/user/orders" className="hover:text-blue-200 font-funnel text-lg">Orders</Link>
          
          {/* Cart Icon */}
          <Link to="/user/cart" className="relative flex items-center">
            <ShoppingCart size={24} className="text-white hover:text-blue-200"/>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Auth Links */}
          {user ? (
            <div className="flex items-center space-x-2">
              <Link to="/dashboard" className="font-funnel text-sm">Welcome, {user.name || user.email || "User"}</Link>
              <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-3 rounded-md text-sm font-funnel">
                Logout
              </button>
            </div>
          ) : (
            <div className="space-x-2">
              <Link to="/login" className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-3 rounded-md text-sm">Login</Link>
              <Link to="/signup" className="bg-yellow-500 hover:bg-yellow-700 text-white font-semibold py-2 px-3 rounded-md text-sm">Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
