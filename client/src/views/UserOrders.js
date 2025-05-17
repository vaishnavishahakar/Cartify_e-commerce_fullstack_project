import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import OrderCard from "../components/OrderCard";
import { getCurrentUser, getReadableTimestamp, api } from "../utils/Common";

function UserOrders() {
  const [user, setUser] = useState({});
  const [orders, setOrders] = useState([]);

  const loadUserOrders = async () => {
  if (!user?._id) {
    toast.error("User not found");
    return;
  }

  try {
    const response = await api.get(`/orders/user/${user._id}`, {
        headers: {
    Authorization: getJwtToken(),
  },
      withCredentials: true, 
    });

    setOrders(response.data?.data || []);
  } catch (error) {
    console.error("Load orders error:", error);
    toast.error(error.response?.data?.message || "Failed to load orders");
  }
};


  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setUser(user);
    } else {
      toast.error("Please login to access this page");
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    }
  }, []);

  useEffect(() => {
    if (user && user._id) {
      console.log("User found:", user);
      loadUserOrders();
    }
  }, [user]);

  useEffect(() => {
    if (orders.length > 0) {
      toast.success("Orders loaded successfully");
    } else {
      toast.error("No orders found");
    }
  }, [orders]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState({});

  const OrderViewDialog = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const {
      _id,
      products,
      totalBill,
      deliveryAddress,
      phone,
      paymentMode,
      status,
      createdAt,
    } = selectedOrder;

    return (
      <div
        className="min-h-screen bg-gray-400 fixed top-0 left-0 w-full bg-opacity-75 z-50 flex justify-center items-center"
        onClick={onClose}
      >
        <div
          className="bg-white w-1/2 min-h-96 rounded-lg px-10 py-5 relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="text-red-500 absolute top-2 right-4"
            onClick={onClose}
          >
            Close
          </button>

          <h1 className="text-2xl font-bold mb-7">Order Details</h1>

          <p>Order ID: {_id}</p>
          <p>Ordered On: {getReadableTimestamp(createdAt)}</p>
          <p>Payment Mode: {paymentMode}</p>
          <p>Delivery Address: {deliveryAddress}</p>
          <p>Phone: {phone}</p>
          <p>Status: {status}</p>

            {products.map((product) => {
              const { productId, quantity, price } = product;
              const { name, images } = productId;

              return (
              <div className="flex items-center mt-3 space-x-10 pt-2 pb-2 pl-2 mb-4 shadow-md border border-gray-200 rounded-md">
                <img src={images[0]} alt={name} className="w-20 h-20" />
                  <div>
                  <p>{name}</p>
                  <p>
                      ₹{price} x {quantity}
                    </p>
                  </div>
                </div>
              );
            })}

          <p className="text-lg font-bold mt-3 border-t-2 pt-4">
            Bill Amount: ₹{totalBill}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="relative p-6">
      {/* Current User Display - Positioned at Top Right */}
      <div className="absolute top-4 right-6 bg-gray-100 px-4 py-2 rounded-md shadow-md text-lg">
        <p className="font-semibold text-gray-700">{user.name}</p>
        <p className="text-gray-500">{user.email}</p>
      </div>

      <h1 className="text-2xl font-bold mb-6 text-center">My Orders</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {orders.map((order) => (
          <OrderCard
            key={order._id}
            order={order}
            onClick={() => {
              setSelectedOrder(order);
              setIsDialogOpen(true);
            }}
          />
        ))}
      </div>

      <OrderViewDialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setSelectedOrder({});
        }}
      />
    </div>
  );
}

export default UserOrders;
