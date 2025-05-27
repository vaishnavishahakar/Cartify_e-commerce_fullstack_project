import React, { useState, useEffect } from "react";
import {
  ChevronLeft as LeftArrow,
  Minus as MinusIcon,
  Plus as PlusIcon,
  ChevronRight as RightArrow,
} from "lucide-react";
import { shortText } from "../utils/Common";
import Button from "./Button";
import toast from "react-hot-toast";

function ProductCard({
  _id,
  name,
  price,
  currentPrice,
  shortDescription,
  longDescription,
  images,
  tags,
  category,
}) {
  const [currentImage, setCurrentImage] = useState(images[0]);
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Load cart data and check if the product exists
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);

    const productInCart = storedCart.find((item) => item.productId === _id);
    if (productInCart) {
      setQuantity(productInCart.quantity);
    }
  }, [_id]);

  const formatPrice = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const handleDecrease = () => {
    setQuantity((prev) => Math.max(prev - 1, 1));
  };

  const handleIncrease = () => {
    setQuantity((prev) => Math.min(prev + 1, 5));
  };

  const handleAddToCart = () => {
    let updatedCart = [...cart];
    const existingProductIndex = updatedCart.findIndex((item) => item.productId === _id);

    if (existingProductIndex > -1) {
      updatedCart[existingProductIndex].quantity = quantity;
    } else {
      updatedCart.push({
        productId: _id,
        name,
        image: currentImage,
        quantity,
        price: currentPrice,
      });
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success("Product added to cart!");
  };

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden m-5 px-10 py-5 max-w-[400px] relative flex items-center">
      <LeftArrow
        size={20}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
        onClick={() => setCurrentImage(images[(images.indexOf(currentImage) - 1 + images.length) % images.length])}
      />

      <div className="flex flex-col items-center w-full">
        <span className="absolute top-0 right-0 bg-gray-500 text-white px-2 py-1 rounded-bl-lg text-sm">
          {category}
        </span>
        <div className="relative h-48 flex justify-center items-center">
          <img src={currentImage} alt={name} className="w-full h-40 object-contain object-center" />
        </div>

        <h1 className="font-bold text-lg text-center mt-2">{shortText(name, 30)}</h1>
        <p className="text-sm text-gray-600 text-center">{shortText(shortDescription, 70)}</p>

        <p className="my-1 text-center">
          <span className="font-extrabold text-2xl">{formatPrice(currentPrice)}</span>
        </p>

        <p className="my-0 text-center">
          <span className="text-sm text-gray-500 line-through">{formatPrice(price)}</span>
        </p>

        <div className="flex justify-between items-center mt-5 w-full">
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-1">
            <MinusIcon className="cursor-pointer" onClick={handleDecrease} />
            <span className="mx-2 text-lg">{quantity}</span>
            <PlusIcon className="cursor-pointer" onClick={handleIncrease} />
          </div>

          <Button
            label="Add To Cart"
            variant="primary"
            className="px-5 py-2 font-semibold"
            onClick={handleAddToCart}
          />
        </div>
      </div>

      <RightArrow
        size={20}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
        onClick={() => setCurrentImage(images[(images.indexOf(currentImage) + 1) % images.length])}
      />
    </div>
  );
}

export default ProductCard;
