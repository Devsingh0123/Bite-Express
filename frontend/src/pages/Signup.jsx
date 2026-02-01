import React from "react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    role: "user",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-500 to-red-500">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-4">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-orange-600">
          BiteExpress
        </h1>
        <p className="text-center text-gray-500 mb-6">Create your account</p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
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
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
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
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
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
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
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
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
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
              className="w-full mt-1 px-4 py-2 border rounded-lg bg-white text-sm focus:ring-2 focus:ring-orange-400 outline-none cursor-pointer"
            >
              <option className="cursor-pointer" value="user">
                User
              </option>
              <option className="cursor-pointer" value="admin">
                Admin
              </option>
              <option className="cursor-pointer" value="delivery">
                Delivery Boy
              </option>
            </select>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-semibold transition duration-300 cursor-pointer"
          >
            Sign Up
          </button>
          {/* google signup button */}
          <button
            type="submit"
            className="w-full bg-gray-100 hover:bg-gray-200  py-2 rounded-lg flex justify-center items-center gap-4 border-none transition duration-300 cursor-pointer"
          >
            <span className="text-sm text-gray-500 font-semibold ">
              SignUp with google :
            </span>
            <FcGoogle size={20} />
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <span className="text-orange-500 font-semibold cursor-pointer">
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;
