import { motion } from "framer-motion";
import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import LoadingSpinner from "../../components/ui/LoadingSpinner.jsx";
import { useResetPassword } from "../../hooks/useAuth.js";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const resetPasswordMutation = useResetPassword();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.password) {
      newErrors.password = "Mật khẩu là bắt buộc";
    } else if (formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password =
        "Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Xác nhận mật khẩu là bắt buộc";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu không khớp";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setErrors({ general: "Token không hợp lệ hoặc đã hết hạn" });
      return;
    }

    if (!validateForm()) return;

    try {
      const result = await resetPasswordMutation.mutateAsync({
        token,
        newPassword: formData.password,
      });

      if (result.success) {
        // Redirect to login with success message
        window.location.href = "/auth/login?reset=success";
      }
    } catch (error) {
      console.error("Reset password error:", error);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen tech-universe-bg flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 w-full max-w-md"
        >
          <div className="glass-card p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl">⚠️</span>
            </div>
            <h1 className="text-3xl font-bold font-display text-red-400 mb-4">
              Token không hợp lệ
            </h1>
            <p className="text-gray-400 mb-6">
              Link đặt lại mật khẩu không hợp lệ hoặc đã hết hạn.
            </p>
            <Link
              to="/auth/forgot-password"
              className="w-full tech-button py-3 text-lg block text-center"
            >
              🔄 Yêu cầu link mới
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

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
              Đặt lại mật khẩu
            </h1>
            <p className="text-gray-400">
              Nhập mật khẩu mới cho tài khoản của bạn
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Password */}
            <div>
              <label className="tech-label">Mật khẩu mới</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`tech-input pr-12 ${
                    errors.password ? "border-red-500" : ""
                  }`}
                  placeholder="••••••••"
                  disabled={resetPasswordMutation.isPending}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="tech-label">Xác nhận mật khẩu mới</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`tech-input pr-12 ${
                    errors.confirmPassword ? "border-red-500" : ""
                  }`}
                  placeholder="••••••••"
                  disabled={resetPasswordMutation.isPending}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showConfirmPassword ? "🙈" : "👁️"}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={resetPasswordMutation.isPending}
              className="w-full tech-button py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {resetPasswordMutation.isPending ? (
                <div className="flex items-center justify-center space-x-2">
                  <LoadingSpinner size="sm" color="white" />
                  <span>Đang đặt lại...</span>
                </div>
              ) : (
                "🔐 Đặt lại mật khẩu"
              )}
            </button>

            {/* Error Message */}
            {(resetPasswordMutation.error || errors.general) && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg"
              >
                <p className="text-red-400 text-sm text-center">
                  {resetPasswordMutation.error?.message || errors.general}
                </p>
              </motion.div>
            )}
          </form>

          {/* Back to Login */}
          <div className="text-center mt-6">
            <Link
              to="/auth/login"
              className="text-neon-blue hover:text-neon-purple transition-colors font-semibold"
            >
              ← Quay lại đăng nhập
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ResetPassword;
