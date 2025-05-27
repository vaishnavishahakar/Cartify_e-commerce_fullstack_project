import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import Button from "../components/Button";
import Input from "../components/Input";
import axios from "axios";
import { getJwtToken } from "../utils/Common";

function Cart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMode, setPaymentMode] = useState("COD");
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  const loadCart = () => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  };

  const removeItemFromCart = (productId) => {
    const indexOfProduct = cart.findIndex(
      (product) => product.productId === productId
    );

    if (indexOfProduct > -1) {
      cart.splice(indexOfProduct, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      loadCart();
    }

    toast.success("Product removed from cart");
  };

  useEffect(() => {
    let totalVal = 0;

    cart.forEach((product) => {
      totalVal += product.price * product.quantity;
    });

    setTotal(totalVal);
  }, [cart]);

  useEffect(() => {
    loadCart();
  }, []);

  const CheckoutDialog = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-8 rounded-lg w-[400px] shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-2xl font-bold text-center mb-5 text-gray-800">Checkout</h1>

        <Input
          label="Name"
          placeholder="Enter your name"
          val={name}
          onChange={(val) => setName(val)}
          className="border rounded-md px-4 py-2 w-full focus:outline-none"
        />

        <Input
          label="Address"
          placeholder="Enter your address"
          val={address}
          onChange={(val) => setAddress(val)}
          className="border rounded-md px-4 py-2 w-full focus:outline-none"
        />

        <Input
          label="Phone"
          placeholder="Enter your phone number"
          val={phone}
          onChange={(val) => setPhone(val)}
          className="border rounded-md px-4 py-2 w-full focus:outline-none"
        />

        <label className="block text-lg mt-4 font-semibold text-gray-700">Payment Mode</label>
        <select
          value={paymentMode}
          onChange={(e) => setPaymentMode(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none text-lg"
        >
          <option value="COD">Cash on Delivery</option>
          <option value="UPI">UPI</option>
        </select>

        <div className="flex justify-center mt-8">
          <Button
            label="Complete Order"
            onClick={() => {
              setIsCheckoutOpen(false);
              setIsPaymentOpen(true);
            }}
            variant="primary"
          />
        </div>
      </div>
    </div>
  );
};



  const placeOrder = async () => {
    try {
      const jwtToken = getJwtToken();

      if (!jwtToken) {
        toast.error("You need to log in before placing an order.");
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
        return;
      }

      const orderBody = {
        products: cart.map((product) => ({
          productId: product?.productId,
          quantity: product?.quantity,
          price: product?.price,
        })),
        deliveryAddress: address,
        paymentMode: paymentMode,
        phone: phone,
      };

      await axios.post(
        `${process.env.REACT_APP_API_URL}/orders`,
        orderBody,
        {
          headers: {
            Authorization: jwtToken,
          },
        }
      );

      toast.success("Order Placed Successfully");
      toast.success("Payment Successful");

      localStorage.removeItem("cart");
      setTimeout(() => {
        window.location.href = "/user/orders";
      }, 2000);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to place order. Please try again."
      );
    }
  };

  const PaymentDialog = ({ isPaymentOpen, onClose }) => {
  if (!isPaymentOpen) return null;

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-8 rounded-lg w-[400px] shadow-lg flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-2xl font-bold text-center mb-5 text-gray-800">Complete Your Payment</h1>

        <div className="flex justify-center mt-5">
          <Button
            label="Payment"
            onClick={placeOrder}
            variant="primary"
            className="px-5 py-2 text-lg"
          />
        </div>
      </div>
    </div>
  );
};


  return (
  <div>
    <h1 className="text-5xl font-extrabold text-center py-10 text-blue-600">
      🛒 My Cart
    </h1>

    {cart.length === 0 ? (
      // Show message when cart is empty
      <div className="flex justify-center items-center h-60">
        <p className="text-gray-500 text-xl font-semibold">Your cart is empty. Add items to proceed!</p>
      </div>
    ) : (
      <>
        <div className="flex flex-col flex-wrap justify-center items-center">
          {cart.map(({ image, name, price, productId, quantity }) => {
            const totalVal = price * quantity;

            return (
              <div
                className="bg-white shadow-lg rounded-lg overflow-hidden m-5 px-10 py-5 w-full md:w-2/3 relative flex"
                key={productId}
              >
                <img src={image} alt={name} className="h-40 mr-5 object-contain object-center" />
                <div>
                  <h1 className="text-lg font-bold">{name}</h1>
                  <p className="text-lg font-bold">Price: <span className="font-light">{new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(price)}</span></p>
                  <p className="text-lg font-bold">Quantity: <span className="font-light">{quantity}</span></p>
                  <p className="text-lg font-bold">Total: <span className="font-light">{new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(totalVal)}</span></p>
                </div>

                <button
                  className="absolute top-5 right-5 bg-red-500 text-sm px-3 py-1 text-white rounded-lg"
                  onClick={() => removeItemFromCart(productId)}
                >
                  X
                </button>
              </div>
            );
          })}
        </div>

        {/* Show total and checkout button only when cart has items */}
        <div className="flex justify-center items-center">
          <span className="text-2xl font-extrabold mr-10 mb-10">Total: {new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(total)}</span>
          <button className="bg-blue-500 mb-10 text-white px-5 py-2 rounded-lg" onClick={() => setIsCheckoutOpen(true)}>
            Checkout
          </button>
        </div>
      </>
    )}


    <CheckoutDialog
      isOpen={isCheckoutOpen}
      onClose={() => {
        setIsCheckoutOpen(false);
      }}
    />

    <PaymentDialog
      isPaymentOpen={isPaymentOpen}
      onClose={() => {
        setIsPaymentOpen(false);
      }}
    />

    <Toaster />
  </div>
);

}

export default Cart;
