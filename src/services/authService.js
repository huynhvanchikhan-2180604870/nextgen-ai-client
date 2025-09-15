import { API_ENDPOINTS } from "../config/api.js";
import { api } from "./apiClient.js";

// Authentication Service
export const authService = {
  // Register new user
  async register(userData) {
    try {
      const response = await api.post(API_ENDPOINTS.AUTH.REGISTER, userData);

      // Backend returns: { success: true, data: { userId, email, verificationRequired } }
      // For registration, we don't get tokens yet (need OTP verification)
      return {
        success: response.success,
        data: response.data,
        requiresVerification: response.data?.verificationRequired || true,
      };
    } catch (error) {
      console.error("Register error:", error);
      throw new Error(
        error.response?.data?.message || error.message || "Đăng ký thất bại"
      );
    }
  },

  // Login user
  async login(credentials) {
    try {
      console.log("🔐 Sending login request:", credentials);
      const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
      console.log("🔐 Login response from backend:", response);

      // Backend returns: { success: true, data: { accessToken, refreshToken, user } }
      const { accessToken, refreshToken, user } = response.data;

      // Transform response to match expected structure
      const transformedResponse = {
        user: user,
        tokens: {
          accessToken: accessToken,
          refreshToken: refreshToken,
        },
      };

      console.log("🔐 Transformed response:", transformedResponse);
      console.log(
        "🔐 Access token:",
        accessToken?.substring(0, 50) + "..."
      );
      console.log(
        "🔐 Refresh token:",
        refreshToken?.substring(0, 50) + "..."
      );

      // Store tokens and user data
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(user));

      console.log("🔐 Tokens stored in localStorage:");
      console.log(
        "  - accessToken:",
        localStorage.getItem("accessToken")?.substring(0, 50) + "..."
      );
      console.log(
        "  - refreshToken:",
        localStorage.getItem("refreshToken")?.substring(0, 50) + "..."
      );
      console.log("  - user:", localStorage.getItem("user"));

      return transformedResponse;
    } catch (error) {
      console.error("🔐 Login error:", error);
      throw new Error(error.message || "Đăng nhập thất bại");
    }
  },

  // Logout user
  async logout() {
    try {
      await api.post(API_ENDPOINTS.AUTH.LOGOUT);
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Clear local storage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
    }
  },

  // Verify OTP
  async verifyOTP(email, otp) {
    try {
      const response = await api.post(API_ENDPOINTS.AUTH.VERIFY_OTP, {
        email,
        otp,
      });

      // Backend returns: { success: true, data: { accessToken, refreshToken, user } }
      const { accessToken, refreshToken, user } = response.data;

      // Store tokens if verification successful
      if (accessToken && refreshToken) {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("user", JSON.stringify(user));
      }

      return response;
    } catch (error) {
      throw new Error(error.message || "Xác thực OTP thất bại");
    }
  },

  // Forgot password
  async forgotPassword(email) {
    try {
      const response = await api.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, {
        email,
      });
      return response;
    } catch (error) {
      throw new Error(error.message || "Gửi email đặt lại mật khẩu thất bại");
    }
  },

  // Reset password
  async resetPassword(token, newPassword) {
    try {
      const response = await api.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, {
        token,
        password: newPassword,
      });
      return response;
    } catch (error) {
      throw new Error(error.message || "Đặt lại mật khẩu thất bại");
    }
  },

  // Google login
  async googleLogin(googleToken) {
    try {
      const response = await api.post(API_ENDPOINTS.AUTH.GOOGLE_LOGIN, {
        token: googleToken,
      });

      // Backend returns: { success: true, data: { accessToken, refreshToken, user } }
      const { accessToken, refreshToken, user } = response.data;

      // Store tokens and user data
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(user));

      return response;
    } catch (error) {
      throw new Error(error.message || "Đăng nhập Google thất bại");
    }
  },

  // GitHub login
  async githubLogin(githubToken) {
    try {
      const response = await api.post(API_ENDPOINTS.AUTH.GITHUB_LOGIN, {
        token: githubToken,
      });

      // Backend returns: { success: true, data: { accessToken, refreshToken, user } }
      const { accessToken, refreshToken, user } = response.data;

      // Store tokens and user data
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(user));

      return response;
    } catch (error) {
      throw new Error(error.message || "Đăng nhập GitHub thất bại");
    }
  },

  // Get current user from localStorage
  getCurrentUser() {
    try {
      const userStr = localStorage.getItem("user");
      // Check for null, undefined, or "undefined" string
      if (!userStr || userStr === "undefined" || userStr === "null") {
        return null;
      }
      return JSON.parse(userStr);
    } catch (error) {
      console.error("Error parsing user data:", error);
      // Clear invalid data
      localStorage.removeItem("user");
      return null;
    }
  },

  // Get current user profile from backend
  async getCurrentUserProfile() {
    try {
      console.log("👤 Getting user profile from:", API_ENDPOINTS.AUTH.PROFILE);
      console.log(
        "👤 Current token in localStorage:",
        localStorage.getItem("accessToken")?.substring(0, 50) + "..."
      );

      const response = await api.get(API_ENDPOINTS.AUTH.PROFILE);
      console.log("👤 User profile response:", response);

      // Backend returns { success: true, data: { user info } }
      const userData = response.data;

      // Update localStorage with fresh user data
      if (userData) {
        localStorage.setItem("user", JSON.stringify(userData));
        console.log("👤 Updated user data in localStorage:", userData);
      }

      return {
        success: true,
        user: userData,
      };
    } catch (error) {
      console.error("❌ Failed to get user profile:", error);
      console.error("❌ Error details:", error.response?.data);
      return {
        success: false,
        error: error.message || "Failed to get user profile",
      };
    }
  },

  // Check if user is authenticated
  isAuthenticated() {
    const token = localStorage.getItem("accessToken");
    const user = this.getCurrentUser();
    return !!(token && user);
  },

  // Get access token
  getAccessToken() {
    return localStorage.getItem("accessToken");
  },

  // Get refresh token
  getRefreshToken() {
    return localStorage.getItem("refreshToken");
  },

  // Update user data in localStorage
  updateUserData(userData) {
    try {
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  },

  // Clear all auth data
  clearAuthData() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  },
};
