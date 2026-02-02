import axios from "axios";
import React from "react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const sendOtp = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/auth/send-otp`,
        {email},
        { withCredentials: true },
      );
    //   console.log(res.data.message);
      toast.success(res?.data?.message);
      setStep(2);
    } catch (error) {
    //   console.log({error});
      toast.error(error.response?.data?.message);
    }
  };

  const verifyOtp = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/auth/verify-otp`,
        {email,otp},
        { withCredentials: true },
      );
    //   console.log(res.data.message);
      toast.success(res?.data?.message);
      setStep(3);
    } catch (error) {
    //   console.log({error});
      toast.error(error.response?.data?.message);
    }
  };

  const resetPassword = async () => {
    
    try {
        if (newPassword != confirmPassword)
      return toast.error("Password Mismatch");
    console.log(email);
    
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/auth/reset-password`,
        {email,newPassword},
        { withCredentials: true },
      );
    //   console.log(res.data.message);
      toast.success(res?.data?.message);
      navigate("/login");
    } catch (error) {
    //   console.log({error});
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-50 px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6">
        {/* Header */}
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Forgot Password
        </h2>
        <p className="text-sm text-center text-gray-500 mt-1">
          Recover your BiteExpress account
        </p>

        {/* Step Indicator */}
        <div className="flex justify-between mt-6 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex-1 text-center">
              <div
                className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-sm font-semibold
                ${step >= s ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-500"}`}
              >
                {s}
              </div>
            </div>
          ))}
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-600"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@biteexpress.com"
              className="w-full mt-1 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-400 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              onClick={sendOtp}
              className="w-full mt-6 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition cursor-pointer"
            >
              Send OTP
            </button>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <label htmlFor="otp" className="text-sm font-medium text-gray-600">
              OTP
            </label>
            <input
              id="otp"
              type="text"
              placeholder="Enter OTP"
              className="w-full mt-1 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-400 outline-none text-center tracking-widest"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <button
              onClick={verifyOtp}
              className="w-full mt-6 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl font-semibold cursor-pointer"
            >
              Verify OTP
            </button>
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            <label
              htmlFor="new password"
              className="text-sm font-medium text-gray-600"
            >
              New Password
            </label>
            <input
              id="new password"
              type="password"
              placeholder="Enter New Password"
              className="w-full mt-1 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-400 outline-none"
              value={newPassword}
              onChange={(e) => setnewPassword(e.target.value)}
            />

            <label
              htmlFor="confirm password"
              className="text-sm font-medium text-gray-600"
            >
              Confirm Password
            </label>
            <input
              id="confirm password"
              type="password"
              placeholder="Confirm Password"
              className="w-full mt-1 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-400 outline-none"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button
              onClick={resetPassword}
              className="w-full mt-6 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl font-semibold cursor-pointer"
            >
              Reset Password
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
