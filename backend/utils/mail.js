import nodemailer from "nodemailer";
import dotenv from "dotenv"
dotenv.config()

const transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 465,
  secure: true, // Use true for port 465, false for port 587
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

export const sendOtpMail = async (Email, otp) => {
  await transporter.sendMail({
    from: process.env.EMAIL,
    to:Email,
    subject: "BiteExpress - Reset Your Password",
    html: `<div style="font-family:Arial">
        <h2>BiteExpress 🔐</h2>
        <p>Your OTP for password reset is:</p>
        <h1>${otp}</h1>
        <p>This OTP is valid for 5 minutes.</p>
      </div>`, // HTML version of the message
  });
};

