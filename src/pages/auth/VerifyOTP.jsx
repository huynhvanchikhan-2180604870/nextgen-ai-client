import { motion } from "framer-motion";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/ui/LoadingSpinner.jsx";
import { useVerifyOTP } from "../../hooks/useAuth.js";

const VerifyOTP = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");

  const verifyOTPMutation = useVerifyOTP();
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return; // Prevent multiple characters

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }

    // Clear error when user types
    if (error) setError("");
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const otpString = otp.join("");
    if (otpString.length !== 6) {
      setError("Vui lòng nhập đầy đủ 6 số OTP");
      return;
    }

    try {
      const result = await verifyOTPMutation.mutateAsync({
        email,
        otp: otpString,
      });

      if (result.success) {
        navigate("/");
      }
    } catch (error) {
      console.error("OTP verification error:", error);
    }
  };

  const handleResendOTP = () => {
    // TODO: Implement resend OTP
    console.log("Resend OTP");
  };

  return (
    <div className="min-h-screen tech-universe-bg flex items-center justify-center px-4">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-neon-blue/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple/20 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-neon-green/20 rounded-full blur-2xl animate-float"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="glass-card p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-16 h-16 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <span className="text-white font-bold text-2xl">🔐</span>
            </motion.div>
            <h1 className="text-3xl font-bold font-display neon-text mb-2">
              Xác thực OTP
            </h1>
            <p className="text-gray-400">
              Nhập mã OTP đã gửi đến email của bạn
            </p>
            {email && <p className="text-neon-blue text-sm mt-2">{email}</p>}
          </div>

          {/* OTP Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* OTP Input */}
            <div>
              <label className="tech-label text-center block">
                Mã xác thực (6 số)
              </label>
              <div className="flex justify-center space-x-3 mt-4">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-12 text-center text-2xl font-bold glass rounded-lg border border-white/20 focus:border-neon-blue focus:ring-2 focus:ring-neon-blue focus:ring-opacity-50 transition-all duration-300"
                    disabled={verifyOTPMutation.isPending}
                    maxLength={1}
                  />
                ))}
              </div>
              {error && (
                <p className="text-red-400 text-sm mt-2 text-center">{error}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={
                verifyOTPMutation.isPending || otp.join("").length !== 6
              }
              className="w-full tech-button py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {verifyOTPMutation.isPending ? (
                <div className="flex items-center justify-center space-x-2">
                  <LoadingSpinner size="sm" color="white" />
                  <span>Đang xác thực...</span>
                </div>
              ) : (
                "🔐 Xác thực"
              )}
            </button>

            {/* Error Message */}
            {verifyOTPMutation.error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg"
              >
                <p className="text-red-400 text-sm text-center">
                  {verifyOTPMutation.error.message}
                </p>
              </motion.div>
            )}
          </form>

          {/* Resend OTP */}
          <div className="text-center mt-6">
            <p className="text-gray-400 text-sm">
              Không nhận được mã?{" "}
              <button
                onClick={handleResendOTP}
                className="text-neon-blue hover:text-neon-purple transition-colors font-semibold"
              >
                Gửi lại
              </button>
            </p>
          </div>

          {/* Back to Login */}
          <div className="text-center mt-4">
            <button
              onClick={() => navigate("/auth/login")}
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              ← Quay lại đăng nhập
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default VerifyOTP;
