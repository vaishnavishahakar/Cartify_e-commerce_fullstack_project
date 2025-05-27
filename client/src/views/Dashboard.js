import React, { useState, useEffect } from "react";
import { getCurrentUser, logout } from "../utils/Common";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import {
  Mail as MailIcon,
  IdCard as NameIcon,
  KeySquare as RoleIcon,
  LogOut as LogOutIcon,
  Truck as TruckIcon,
} from "lucide-react";

const UserDetailRow = ({ icon, value }) => {
  return (
    <p className="flex items-center mb-4 text-xl">
      {icon} <span className="ms-4">{value}</span>
    </p>
  );
};

function Dashboard() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
  });

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

  return (
    <div>
      <h1 className="text-center py-6 text-3xl font-extrabold text-gray-800">Dashboard</h1>

      <div className="bg-white w-[500px] mx-auto px-8 py-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 mt-10">
        {/* Order Links */}
        <div className="flex justify-around mb-6">
          <Link to="/user/orders" className="text-center text-md bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
            <TruckIcon className="mx-auto inline" size={24} /> <span className="ms-2">My Orders</span>
          </Link>
        </div>

        {/* User Details */}
        <div className="flex flex-col gap-4">
          <UserDetailRow icon={<NameIcon className="text-blue-500" />} value={user?.name} />
          <UserDetailRow icon={<MailIcon className="text-blue-500" />} value={user?.email} />
          <UserDetailRow icon={<RoleIcon className="text-blue-500" />} value={user?.role} />
        </div>

        {/* Logout Button */}
        <button
          type="button"
          className="mx-auto block bg-red-500 text-white font-semibold px-5 py-2 mt-6 rounded-lg hover:bg-red-600 transition-all"
          onClick={() => {
            toast.success("Logged out successfully");
            logout();
          }}
        >
          Logout <LogOutIcon className="inline ms-2" />
        </button>
      </div>

      <Toaster />
    </div>
  );
}


export default Dashboard;
