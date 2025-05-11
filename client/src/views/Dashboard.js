import React, { useState, useEffect } from "react";
import { getCurrentUser, logout } from "../utils/Common";
import toast, { Toaster } from "react-hot-toast";
import {
  Mail as MailIcon,
  IdCard as NameIcon,
  KeySquare as RoleIcon,
  LogOut as LogOutIcon,
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
      <h1 className="text-center py-4 text-2xl">Dashboard</h1>

      <div className="bg-white w-[500px] mx-auto p-10 rounded-lg shadow-lg mt-10">
        <UserDetailRow icon={<NameIcon />} value={user?.name} />
        <UserDetailRow icon={<MailIcon />} value={user?.email} />
        <UserDetailRow icon={<RoleIcon />} value={user?.role} />

        <button
          type="button"
          className="mx-auto block bg-red-500 text-white px-4 py-2 mt-4 rounded-md"
          onClick={() => {
            toast.success("Logged out successfully");
            logout();
          }}
        >
          Logout
          <LogOutIcon className="inline ms-4" />
        </button>
      </div>
      <Toaster />
    </div>
  );
}

export default Dashboard;
