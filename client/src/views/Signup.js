import React, { useState, useEffect } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../utils/Common";

function Signup() {
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    rePassword: "",
  });

  const [error, setError] = useState("");

  const processSignup = async () => {
    toast.loading("Plaease wait...");

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/signup`,
        signupData
      );
      toast.dismiss();

      toast.success(response.data.message);

      setSignupData({
        name: "",
        email: "",
        phone: "",
        address: "",
        password: "",
        rePassword: "",
      });

      setTimeout(() => {
        window.location.href = "/login";
      }, 3000);
    } catch (err) {
        toast.dismiss();
      setError(err?.response?.data?.message);
      toast.error(err?.response?.data?.message);
    }
  };

  useEffect(() => {
    // Check if user is already logged in
    const currentUser = getCurrentUser();

    if (currentUser) {
      toast.success("You are already logged in. Redirecting to dashboard...");
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 3000);
    }
  }, []);

  return (
  <div className="min-h-screen flex flex-col items-center justify-center px-5">
    {/* Signup Title */}
    <h1 className="text-4xl font-extrabold text-center mb-6 mt-5 text-gray-800">
      Create Your Account
    </h1>

    {/* Signup Card */}
    <div className="w-full md:w-[450px] bg-white rounded-xl shadow-xl hover:shadow-2xl px-10 py-8 transition duration-300 border border-gray-200">
      <Input
        label={"Name"}
        val={signupData.name}
        onChange={(val) => setSignupData({ ...signupData, name: val })}
        className="border-2 border-gray-300 rounded-md px-4 py-2 focus:border-blue-500"
      />

      <Input
        label={"Email"}
        val={signupData.email}
        onChange={(val) => setSignupData({ ...signupData, email: val })}
        className="border-2 border-gray-300 rounded-md px-4 py-2 focus:border-blue-500"
      />

      <Input
        label={"Phone"}
        val={signupData.phone}
        onChange={(val) => setSignupData({ ...signupData, phone: val })}
        className="border-2 border-gray-300 rounded-md px-4 py-2 focus:border-blue-500"
      />

      <Input
        label={"Address"}
        val={signupData.address}
        onChange={(val) => setSignupData({ ...signupData, address: val })}
        className="border-2 border-gray-300 rounded-md px-4 py-2 focus:border-blue-500"
      />

      <Input
        label={"Password"}
        type="password"
        val={signupData.password}
        onChange={(val) => setSignupData({ ...signupData, password: val })}
        className="border-2 border-gray-300 rounded-md px-4 py-2 focus:border-blue-500"
      />

      <Input
        label={"Re-enter Password"}
        type="password"
        val={signupData.rePassword}
        onChange={(val) => setSignupData({ ...signupData, rePassword: val })}
        className="border-2 border-gray-300 rounded-md px-4 py-2 focus:border-blue-500"
      />

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      <p className="mt-4 text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500 font-semibold hover:underline">
          Login
        </Link>
      </p>

      {/* Buttons */}
      <div className="flex justify-around mt-6">
        <Button
          label={"Cancel"}
          onClick={() => window.location.href = "/"}
          variant={"danger"}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-5 py-2 rounded-md transition"
        />
        <Button
          label="Signup"
          onClick={processSignup}
          variant={"primary"}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-5 py-2 rounded-md transition"
        />
      </div>
    </div>

    <Toaster />
  </div>
);

}

export default Signup;
