import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

// Import assets
import logoVideo from "../assets/BakenBite.mp4";
import logoImage from "../assets/bake n bite.jpg";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formData.email || !formData.password) {
      toast.error("Please fill in all required fields");
      setIsLoading(false);
      return;
    }

    try {
      await new Promise((res) => setTimeout(res, 1000));
      toast.success("Login successful 🎉");
      setFormData({ email: "", password: "", rememberMe: false });
    } catch {
      toast.error("Something went wrong. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!formData.email) {
      toast.error("Please enter your email to reset password");
      return;
    }

    try {
      await new Promise((res) => setTimeout(res, 1000));
      toast.success("Password reset link sent to your email 📩");
      setShowForgotPassword(false);
    } catch {
      toast.error("Something went wrong. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 via-pink-100 to-pink-200 p-4">
      <Toaster position="top-right" />
      <form
        onSubmit={showForgotPassword ? handleForgotPassword : handleLogin}
        className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg space-y-4 border border-pink-200"
      >
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-20 h-20 object-cover rounded-full border-2 border-pink-400"
          >
            <source src={logoVideo} type="video/mp4" />
            <img
              src={logoImage}
              alt="Bake ’n’ Bite Hub Logo"
              className="w-20 h-20 object-cover rounded-full border-2 border-pink-400"
            />
          </video>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-pink-600">
          {showForgotPassword ? "Forgot Password" : "Login"}
        </h1>
        <p className="text-center text-gray-600 mb-4">
          {showForgotPassword
            ? "Enter your email to reset your password 📩"
            : "Welcome back to Bake & Bite! Sign in to enjoy your favorite cakes and quick bites 🍩🍔"}
        </p>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1 text-pink-700">Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-pink-300 px-3 py-2 rounded focus:ring-2 focus:ring-pink-400"
          />
        </div>

        {/* Password */}
        {!showForgotPassword && (
          <div>
            <label className="block text-sm font-medium mb-1 text-pink-700">Password *</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-pink-300 px-3 py-2 rounded focus:ring-2 focus:ring-pink-400"
            />
          </div>
        )}

        {/* Remember Me & Forgot Password */}
        {!showForgotPassword && (
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="mr-2 text-pink-600"
              />
              Remember Me
            </label>
            <button
              type="button"
              onClick={() => setShowForgotPassword(true)}
              className="text-pink-600 hover:underline"
            >
              Forgot Password?
            </button>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 rounded-lg font-semibold transition-colors ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-pink-600 text-white hover:bg-pink-700"
          }`}
        >
          {isLoading
            ? showForgotPassword
              ? "Sending..."
              : "Logging in..."
            : showForgotPassword
            ? "Send Reset Link"
            : "Login"}
        </button>

        {/* Toggle links */}
        {showForgotPassword ? (
          <p className="text-center text-sm mt-2 text-gray-700">
            Remembered your password?{" "}
            <button
              type="button"
              onClick={() => setShowForgotPassword(false)}
              className="text-pink-600 underline"
            >
              Back to Login
            </button>
          </p>
        ) : (
          <p className="text-center text-sm mt-2 text-gray-700">
            Don’t have an account?{" "}
            <Link to="/register" className="text-pink-600 underline">
              Register here
            </Link>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
