import React from 'react';
import { Link } from 'react-router-dom';
import { getCurrentUser, logout } from '../utils/Common'; // Assuming this path
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";


const Navbar = () => {
 const user = getCurrentUser();
 const navigate = useNavigate();


 const handleLogout = () => {
   logout();
   toast.success('Logged out successfully!');
   navigate('/login');
 };


 return (
   <nav className="bg-blue-500 text-white py-4">
     <div className="container mx-auto flex items-center justify-between px-4">
       {/* Website Name */}
       <Link to="/" className="text-xl font-bold">
      Cartify
       </Link>


       {/* Navigation Links */}
       <div className="flex items-center space-x-4">
         <Link to="/" className="hover:text-blue-200">
           Home
         </Link>
         <Link to="/user/cart" className="hover:text-blue-200">
           Cart
         </Link>
         <Link to="/user/orders" className="hover:text-blue-200">
           Orders
         </Link>


         {/* User Info or Auth Links */}
         {user ? (
           <div className="flex items-center space-x-2">
             <span className="text-sm">Welcome, {user.username || user.email || 'User'}</span>
             <button
               onClick={handleLogout}
               className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-3 rounded-md text-sm focus:outline-none focus:shadow-outline"
             >
               Logout
             </button>
           </div>
         ) : (
           <div className="space-x-2">
             <Link to="/login" className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-3 rounded-md text-sm focus:outline-none focus:shadow-outline">
               Login
             </Link>
             <Link to="/signup" className="bg-yellow-500 hover:bg-yellow-700 text-white font-semibold py-2 px-3 rounded-md text-sm focus:outline-none focus:shadow-outline">
               Sign Up
             </Link>
           </div>
         )}
       </div>
     </div>
   </nav>
 );
};


export default Navbar;