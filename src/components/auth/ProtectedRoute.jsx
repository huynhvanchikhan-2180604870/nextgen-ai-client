import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.js";
import LoadingSpinner from "../ui/LoadingSpinner.jsx";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen tech-universe-bg flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="text-gray-400 mt-4">Đang kiểm tra quyền truy cập...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login page with return url
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
