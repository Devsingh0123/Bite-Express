import React from "react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    role: "user",
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/auth/signup`,
        formData,
        { withCredentials: true },
      );
      setLoading(false);
      toast.success(res?.data?.message);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message);
    }
  };
// signup via google
  const handleGoogleAuth =async ()=>{
const provider = new GoogleAuthProvider()
const result = await signInWithPopup(auth,provider)
console.log(result)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-500 to-red-500">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-8">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-orange-600">
          BiteExpress
        </h1>
        <p className="text-center text-gray-500 mb-4">Create your account</p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-2">
          {/* Name */}
          <div>
            <label htmlFor="name" className="text-sm text-gray-600">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full  px-4 py-1 border border-gray-400 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="text-sm text-gray-600">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border-gray-400 px-4 py-1 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
            />
          </div>

          {/* Mobile */}
          <div>
            <label htmlFor="tel" className="text-sm text-gray-600">
              Mobile Number
            </label>
            <input
              id="tel"
              type="tel"
              name="mobile"
              placeholder="10 digit mobile number"
              value={formData.mobile}
              onChange={handleChange}
              required
              className="w-full border-gray-400  px-4 py-1 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="text-sm text-gray-600">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Create a strong password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border-gray-400  px-4 py-1 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
            />
          </div>

          {/* Role */}
          <div>
            <label htmlFor="role" className="text-sm text-gray-600">
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border-gray-400 px-4 py-1 border rounded-lg bg-white text-sm text-gray-800 focus:ring-2 focus:ring-orange-400 outline-none cursor-pointer"
            >
              <option className="cursor-pointer" value="user">
                User
              </option>
              <option className="cursor-pointer" value="admin">
                Admin
              </option>
              <option className="cursor-pointer" value="deliveryBoy">
                Delivery Boy
              </option>
            </select>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-1 rounded-lg font-semibold transition duration-300 cursor-pointer flex justify-center items-center gap-4 mt-4"
          >
            {loading ? (
              <>
                <Loader /> Sign Up
              </>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
        {/* google signup button */}
        <button
          type="submit"
          className="w-full hover:bg-gray-200 py-1 rounded-lg flex justify-center items-center gap-2 border border-gray-400 transition duration-300 cursor-pointer mt-4"
          onClick={handleGoogleAuth}
        >
          <FcGoogle size={20} />
          <span className=" ">SignUp with Google</span>
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <span
            className="text-orange-500 font-semibold cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;
