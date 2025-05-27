import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import ProductCard from "../components/ProductCard";
import { useSearchParams } from "react-router-dom";

// Import banners
import Banner0 from "../assets/Banner.gif";
// import Banner1 from "../assets/banner-1.png";
import Banner2 from "../assets/banner-2.png";
import Banner3 from "../assets/banner-3.png";
import Banner4 from "../assets/banner-4.gif";
import Banner5 from "../assets/banner-5.png";
import Banner6 from "../assets/banner-6.jpg";
import Banner7 from "../assets/banner-7.png";

function Home() {
  const [products, setProducts] = useState([]);
  // const [search, setSearch] = useState("");
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const [isLoading, setIsLoading] = useState(false); // Added loading state
  const [currentSlide, setCurrentSlide] = useState(0);

  const banners = [
    { type: "image", src: Banner2 },
    // { type: "image", src: Banner1 },
    { type: "gif", src: Banner0 },
    { type: "gif", src: Banner4 },
    { type: "image", src: Banner3 },
    { type: "image", src: Banner5 },
    { type: "image", src: Banner6 },
    { type: "image", src: Banner7 },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 4000); // Change slide every 4 seconds
    return () => clearInterval(interval); // Cleanup
  }, [banners.length]);

  const loadProducts = async () => {
    setIsLoading(true); // Show loading state
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/products?limit=100&search=${search}`
      );
      setProducts(response.data.data);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false); // Hide loading state
    }
  };

  useEffect(() => {
    loadProducts();
  }, [search]);

  return (
    <div>
      {/* Custom Banner Slider */}
      <div className="relative w-full h-[250px] md:h-[350px] lg:h-[400px] overflow-hidden">
        {banners.map((banner, index) => (
          <div
            key={index}
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {banner.type === "image" || banner.type === "gif" ? (
              <img
                src={banner.src}
                alt={`Banner ${index}`}
                className="max-w-full max-h-full object-cover"
              />
            ) : (
              <video
                src={banner.src}
                className="max-w-full max-h-full object-cover"
                autoPlay
                loop
                muted
              />
            )}
          </div>
        ))}
      </div>

      {/* Product List or Loading */}
      {isLoading ? (
        <div className="flex justify-center items-center h-60">
          <p className="text-gray-500 text-xl font-semibold">
            Loading products...
          </p>
        </div>
      ) : products.length === 0 ? (
        <div className="flex justify-center items-center h-60">
          <p className="text-gray-500 text-xl font-semibold">
            No Products Found
          </p>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center">
          {products.map((product) => (
            <ProductCard key={product._id} {...product} />
          ))}
        </div>
      )}

      <Toaster />
    </div>
  );
}

export default Home;
