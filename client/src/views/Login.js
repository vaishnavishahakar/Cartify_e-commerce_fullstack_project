import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { getCurrentUser, api } from "../utils/Common";

function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const processLogin = async () => {
    toast.loading("Please wait...");

    try {
      const response = await api.post(`/login`, loginData);

      localStorage.setItem("e-commerce-user-token", response.data.token);
      localStorage.setItem(
        "e-commerce-user-details",
        JSON.stringify(response.data.data)
      );

      toast.dismiss();
      toast.success(response.data.message);

      setLoginData({ email: "", password: "" });

      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 3000);
    } catch (err) {
      toast.dismiss();
      setError(err?.response?.data?.message);
      toast.error(err?.response?.data?.message);
    }
  };

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      toast.success("You are already logged in. Redirecting...");
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 3000);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5">
      <h1 className="text-4xl font-extrabold mb-6 text-gray-800">Login</h1>

      <div className="w-full md:w-[450px] bg-white rounded-lg shadow-xl hover:shadow-2xl px-10 py-8 transition duration-300 border border-gray-200">
        <Input
          label={"Email"}
          val={loginData.email}
          onChange={(val) => {
            setLoginData({ ...loginData, email: val });
            setError("");
          }}
          className="border rounded-md px-4 py-2 focus:border-blue-500"
        />

        <Input
          label={"Password"}
          type="password"
          val={loginData.password}
          onChange={(val) => {
            setLoginData({ ...loginData, password: val });
            setError("");
          }}
          className="border rounded-md px-4 py-2 focus:border-blue-500"
        />

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-500 font-semibold hover:underline"
          >
            Signup
          </Link>
        </p>

        <div className="flex justify-around mt-6">
          <Button
            label={"Cancel"}
            onClick={() => (window.location.href = "/")}
            variant={"danger"}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-5 py-2 rounded-md transition"
          />
          <Button
            label="Login"
            onClick={processLogin}
            variant={"primary"}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-5 py-2 rounded-md transition"
          />
        </div>
      </div>

      <Toaster />
    </div>
  );
}

export default Login;
