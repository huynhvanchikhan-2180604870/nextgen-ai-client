import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "../stores/authStore.js";

// Auth Hooks
export const useAuth = () => {
  const {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    verifyOTP,
    forgotPassword,
    resetPassword,
    googleLogin,
    githubLogin,
    initializeAuth,
    updateUser,
    clearError,
    clearAuthData,
  } = useAuthStore();

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    verifyOTP,
    forgotPassword,
    resetPassword,
    googleLogin,
    githubLogin,
    initializeAuth,
    updateUser,
    clearError,
    clearAuthData,
  };
};

// Login mutation
export const useLogin = () => {
  const { login } = useAuthStore();

  return useMutation({
    mutationFn: async (credentials) => {
      console.log("🔐 useLogin mutationFn called with:", credentials);
      const result = await login(credentials);
      console.log("🔐 useLogin mutationFn result:", result);
      return result;
    },
    onSuccess: (data) => {
      console.log("🔐 useLogin onSuccess:", data);
      if (data.success) {
        console.log("🔐 Login successful:", data.user);
      }
    },
    onError: (error) => {
      console.error("🔐 useLogin onError:", error);
    },
  });
};

// Register mutation
export const useRegister = () => {
  const { register } = useAuthStore();

  return useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      if (data.success) {
        console.log("Registration successful:", data.user);
      }
    },
    onError: (error) => {
      console.error("Registration error:", error);
    },
  });
};

// Logout mutation
export const useLogout = () => {
  const { logout } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      // Clear all cached data
      queryClient.clear();
      console.log("Logout successful");
    },
    onError: (error) => {
      console.error("Logout error:", error);
    },
  });
};

// Verify OTP mutation
export const useVerifyOTP = () => {
  const { verifyOTP } = useAuthStore();

  return useMutation({
    mutationFn: ({ email, otp }) => verifyOTP(email, otp),
    onSuccess: (data) => {
      if (data.success) {
        console.log("OTP verification successful:", data.user);
      }
    },
    onError: (error) => {
      console.error("OTP verification error:", error);
    },
  });
};

// Forgot password mutation
export const useForgotPassword = () => {
  const { forgotPassword } = useAuthStore();

  return useMutation({
    mutationFn: forgotPassword,
    onSuccess: (data) => {
      if (data.success) {
        console.log("Forgot password email sent");
      }
    },
    onError: (error) => {
      console.error("Forgot password error:", error);
    },
  });
};

// Reset password mutation
export const useResetPassword = () => {
  const { resetPassword } = useAuthStore();

  return useMutation({
    mutationFn: ({ token, newPassword }) => resetPassword(token, newPassword),
    onSuccess: (data) => {
      if (data.success) {
        console.log("Password reset successful");
      }
    },
    onError: (error) => {
      console.error("Password reset error:", error);
    },
  });
};

// Google login mutation
export const useGoogleLogin = () => {
  const { googleLogin } = useAuthStore();

  return useMutation({
    mutationFn: googleLogin,
    onSuccess: (data) => {
      if (data.success) {
        console.log("Google login successful:", data.user);
      }
    },
    onError: (error) => {
      console.error("Google login error:", error);
    },
  });
};

// GitHub login mutation
export const useGitHubLogin = () => {
  const { githubLogin } = useAuthStore();

  return useMutation({
    mutationFn: githubLogin,
    onSuccess: (data) => {
      if (data.success) {
        console.log("GitHub login successful:", data.user);
      }
    },
    onError: (error) => {
      console.error("GitHub login error:", error);
    },
  });
};

// Initialize auth on app start
export const useInitializeAuth = () => {
  const { initializeAuth } = useAuthStore();

  return useQuery({
    queryKey: ["auth", "initialize"],
    queryFn: initializeAuth,
    staleTime: Infinity,
    cacheTime: Infinity,
    retry: false,
  });
};
