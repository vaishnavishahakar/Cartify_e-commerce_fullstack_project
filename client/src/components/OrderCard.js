import React from "react";
import { getReadableTimestamp } from "../utils/Common";
import { Copy as CopyIcon } from "lucide-react";
import toast from "react-hot-toast";

function OrderCard({ order, onClick }) {
  const { _id, status, products, createdAt, totalBill, deliveryAddress } = order;

  const formatPrice = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount).replace("₹", "₹ ");
  };

  const copyOrderId = () => {
    navigator.clipboard.writeText(_id);
    toast.success("Order ID copied!");
  };

  return (
    <div
      className="border p-6 m-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 cursor-pointer relative"
      onClick={onClick}
    >
      {/* Order ID & Copy Option */}
      <div className="flex justify-between items-center mb-3">
        <p className="text-gray-700 flex items-center">
          <span className="font-semibold">Order ID: </span> {_id}
          <button
            className="ml-3 text-blue-500 hover:text-blue-700 transition"
            onClick={(e) => {
              e.stopPropagation();
              copyOrderId();
            }}
          >
            <CopyIcon size={18} />
          </button>
        </p>
        <p className="text-sm text-gray-500">{getReadableTimestamp(createdAt)}</p>
      </div>

      {/* Products */}
      <p className="text-lg font-bold mt-3">
        {products.map((product) => (product.productId?.name || "Unknown Product")).join(", ")}
      </p>

      {/* Total Amount */}
      <p className="text-lg text-green-600 mt-2">
        <span className="font-semibold text-black">Total Amount:</span> {formatPrice(totalBill)}
      </p>

      {/* Address */}
      <p className="text-gray-600 mt-2"><span className="font-semibold">Delivery Address:</span> {deliveryAddress}</p>

      {/* Status */}
      <p className="text-gray-600 mt-2"><span className="font-semibold">Status:</span> {status}</p>
    </div>
  );
}

export default OrderCard;
