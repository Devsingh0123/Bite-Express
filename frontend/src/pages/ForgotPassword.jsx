import axios from "axios";
import React from "react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const sendOtp = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/auth/send-otp`,
        { email },
        { withCredentials: true },
      );
      //   console.log(res.data.message);
      setLoading(false);
      toast.success(res?.data?.message);
      setStep(2);
    } catch (error) {
      //   console.log({error});
      setLoading(false);
      toast.error(error.response?.data?.message);
    }
  };

  const verifyOtp = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/auth/verify-otp`,
        { email, otp },
        { withCredentials: true },
      );
      //   console.log(res.data.message);
      setLoading(false);
      toast.success(res?.data?.message);
      setStep(3);
    } catch (error) {
      //   console.log({error});
      setLoading(false);
      toast.error(error.response?.data?.message);
    }
  };

  const resetPassword = async () => {
    setLoading(true);

    try {
      if (newPassword !== confirmPassword) {
  toast.error("Password Mismatch");
  setLoading(false);
  return;
}
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/auth/reset-password`,
        { email, newPassword },
        { withCredentials: true },
      );
      //   console.log(res.data.message);
      setLoading(false);
      toast.success(res?.data?.message);
      navigate("/login");
    } catch (error) {
      //   console.log({error});
      setLoading(false);
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-50 px-4">
      <div className="bg-white w-full max-w-sm rounded-2xl shadow-xl p-8">
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
              className="w-full mt-1 px-4 py-1 border rounded-xl focus:ring-2 focus:ring-orange-400 outline-none border-gray-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              onClick={sendOtp}
              disabled={loading}
              className="w-full mt-6 bg-gradient-to-r from-orange-500 to-red-500 text-white py-1 rounded-xl font-semibold hover:opacity-90 transition cursor-pointer flex justify-center items-center gap-4"
            >
              {  loading ?<><Loader/> Send OTP</> : "Send OTP"}
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
              className="w-full mt-1 px-4 py-1 border rounded-xl focus:ring-2 focus:ring-orange-400 outline-none text-center tracking-widest"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <button
              onClick={verifyOtp}
              disabled={loading}
              className="w-full mt-6 bg-gradient-to-r from-orange-500 to-red-500 text-white py-1 rounded-xl font-semibold cursor-pointer flex justify-center items-center gap-4"
            >
             {  loading ?<><Loader/> Verify OTP</> : "Verify OTP"} 
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
              className="w-full mt-1 px-4 py-1 border rounded-xl focus:ring-2 focus:ring-orange-400 outline-none"
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
              className="w-full mt-1 px-4 py-1 border rounded-xl focus:ring-2 focus:ring-orange-400 outline-none"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button
              onClick={resetPassword}
              disabled={loading}
              className="w-full mt-6 bg-gradient-to-r from-orange-500 to-red-500 text-white py-1 rounded-xl font-semibold cursor-pointer flex justify-center items-center gap-4"
            >
                   {  loading ?<><Loader/> Reset Password</> : "Reset Password"}  
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
