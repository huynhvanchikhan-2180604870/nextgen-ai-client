import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useAuth, useInitializeAuth } from "./hooks/useAuth.js";

// Components
import Footer from "./components/layout/Footer.jsx";
import Navbar from "./components/layout/Navbar.jsx";
import ErrorBoundary from "./components/ui/ErrorBoundary.jsx";
import LoadingSpinner from "./components/ui/LoadingSpinner.jsx";
import StarField from "./components/ui/StarField.jsx";
// Pages
import About from "./pages/About.jsx";
import AIPlanner from "./pages/AIPlanner.jsx";
import ForgotPassword from "./pages/auth/ForgotPassword.jsx";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import ResetPassword from "./pages/auth/ResetPassword.jsx";
import VerifyOTP from "./pages/auth/VerifyOTP.jsx";
import Favorites from "./pages/dashboard/Favorites.jsx";
import Profile from "./pages/dashboard/Profile.jsx";
import Vault from "./pages/dashboard/Vault.jsx";
import Wallet from "./pages/dashboard/Wallet.jsx";
import Explore from "./pages/Explore.jsx";
import Home from "./pages/Home.jsx";
import NotFound from "./pages/NotFound.jsx";
import ProjectDetail from "./pages/ProjectDetail.jsx";

// Protected Route Component
import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";
function App() {
  const { isAuthenticated, isLoading, user } = useAuth();
  const { data: authData, isLoading: authLoading } = useInitializeAuth();

  // Initialize auth on app start
  useEffect(() => {
    if (authData && !isLoading) {
      console.log("Auth initialized:", {
        isAuthenticated,
        user: authData?.user,
      });
    }
  }, [authData, isAuthenticated, isLoading]);

  // Debug user data
  useEffect(() => {
    console.log("🔍 App.jsx - Current user state:", {
      isAuthenticated,
      user,
      userFullName: user?.fullName,
      userEmail: user?.email,
    });
  }, [isAuthenticated, user]);

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen tech-universe-bg flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen relative">
        {/* StarField Background */}
        <StarField />

        <Navbar />

        <main className="relative z-10">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
            <Route path="/planner" element={<AIPlanner />} />
            <Route path="/about" element={<About />} />

            {/* Auth Routes */}
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="/auth/verify-otp" element={<VerifyOTP />} />
            <Route path="/auth/forgot-password" element={<ForgotPassword />} />
            <Route path="/auth/reset-password" element={<ResetPassword />} />

            {/* Protected Routes */}
            <Route
              path="/vault"
              element={
                <ProtectedRoute>
                  <Vault />
                </ProtectedRoute>
              }
            />
            <Route
              path="/favorites"
              element={
                <ProtectedRoute>
                  <Favorites />
                </ProtectedRoute>
              }
            />
            <Route
              path="/wallet"
              element={
                <ProtectedRoute>
                  <Wallet />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </ErrorBoundary>
  );
}

export default App;
