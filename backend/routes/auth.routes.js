import express from "express";
import {  logIn, logOut, resetPassword, sendOtp, signUp, verifyOtp } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/signup", signUp);
authRouter.post("/login", logIn);
authRouter.post("/logout", logOut);
authRouter.post("/send-otp", sendOtp);
authRouter.post("/verify-otp", verifyOtp);
authRouter.post("/reset-password", resetPassword);

export default authRouter;
