import React from "react";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/auth/login`,
      formData,
      { withCredentials: true } 
    );

    console.log(res)

    toast.success(res.data.message);
  } catch (error) {
    console.log(error)
    toast.error(
      error.response?.data?.message
    );
  }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-500 to-red-500">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-4">

        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-orange-600">
          BiteExpress
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Login to your account
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email */}
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
            />
          </div>

          {/* Forgot password */}
          <div className="text-right">
            <span className="text-sm text-orange-500 cursor-pointer hover:underline" onClick={()=>navigate("/forgot-password")}>
              Forgot Password?
            </span>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-semibold transition duration-300 cursor-pointer"
          >
            Login
          </button>
          {/* google login button */}
          <button
            type="submit"
            className="w-full hover:bg-gray-200 py-2 rounded-lg flex justify-center items-center gap-4 border border-gray-400 transition duration-300 cursor-pointer"
          >
            <FcGoogle size={20} />
            <span className=" ">Login with Google

            </span>

          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Don’t have an account?{" "}
          <span className="text-orange-500 font-semibold cursor-pointer" onClick={()=>navigate("/signup")}>
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}
export default Login