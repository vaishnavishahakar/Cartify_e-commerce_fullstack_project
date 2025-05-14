import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import ProductCard from "../components/ProductCard";
import ImgHeader from "./e-commerce-header.png";
import IcoCart from "./../assets/shopping-cart.png";
import { Link } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const loadProducts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/products?limit=100&search=`
      );
      setProducts(response.data.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div>
      <img
        src={ImgHeader}
        alt="header"
        className="h-96 object-cover object-center block mx-auto"
      />
      <div className="flex justify-center py-10">
        <input
          type="text"
          placeholder="Search products"
          className="w-2/3 p-2 border border-gray-300 rounded-md text-2xl active:outline-none focus:outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="flex flex-wrap justify-center">
        {products.map((product) => {
          return <ProductCard key={product._id} {...product} />;
        })}
      </div>

      <Link to="/user/cart">
        <img
          src={IcoCart}
          alt="Shopping Cart"
          className="fixed top-10 right-10 w-14 h-14 cursor-pointer"
        />
      </Link>
      <Toaster />
    </div>
  );
}

export default Home;
