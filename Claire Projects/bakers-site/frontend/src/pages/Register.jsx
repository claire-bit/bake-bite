import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

// Import assets
import logoVideo from "../assets/BakenBite.mp4";
import logoImage from "../assets/bake n bite.jpg";

const Register = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    termsAccepted: false,
    rememberMe: false,
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.first_name.trim()) newErrors.first_name = "First name is required";
    if (!formData.last_name.trim()) newErrors.last_name = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirm_password)
      newErrors.confirm_password = "Passwords do not match";
    if (!formData.termsAccepted)
      newErrors.termsAccepted = "You must accept the terms and policies";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setIsLoading(false);
      return;
    }

    try {
      await new Promise((res) => setTimeout(res, 1000));
      toast.success("Registration successful 🎉");
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirm_password: "",
        termsAccepted: false,
        rememberMe: false,
      });
    } catch {
      toast.error("Something went wrong. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 via-pink-100 to-pink-200 p-4">
      <Toaster position="top-right" />
      <form
        onSubmit={handleSubmit}
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
        <h1 className="text-3xl font-bold text-center text-pink-600">Register</h1>
        <p className="text-center text-gray-600 mb-4">
          Join <span className="font-semibold text-yellow-600">Bake & Bite</span> today —  
          sweet treats and quick eats, all in one place! 🍰🍔
        </p>

        {/* First Name */}
        <div>
          <label className="block text-sm font-medium mb-1 text-pink-700">First Name *</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            className="w-full border border-pink-300 px-3 py-2 rounded focus:ring-2 focus:ring-pink-400"
          />
          {errors.first_name && <p className="text-xs text-red-600">{errors.first_name}</p>}
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-sm font-medium mb-1 text-pink-700">Last Name *</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            className="w-full border border-pink-300 px-3 py-2 rounded focus:ring-2 focus:ring-pink-400"
          />
          {errors.last_name && <p className="text-xs text-red-600">{errors.last_name}</p>}
        </div>

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
          {errors.email && <p className="text-xs text-red-600">{errors.email}</p>}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium mb-1 text-pink-700">Password *</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-pink-300 px-3 py-2 rounded focus:ring-2 focus:ring-pink-400"
          />
          {errors.password && <p className="text-xs text-red-600">{errors.password}</p>}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium mb-1 text-pink-700">
            Confirm Password *
          </label>
          <input
            type="password"
            name="confirm_password"
            value={formData.confirm_password}
            onChange={handleChange}
            className="w-full border border-pink-300 px-3 py-2 rounded focus:ring-2 focus:ring-pink-400"
          />
          {errors.confirm_password && (
            <p className="text-xs text-red-600">{errors.confirm_password}</p>
          )}
        </div>

        {/* Remember Me */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="rememberMe"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleChange}
            className="mr-2 text-pink-600"
          />
          <label htmlFor="rememberMe" className="text-sm text-gray-700">
            Remember Me
          </label>
        </div>

        {/* Terms */}
        <div className="flex items-start">
          <input
            type="checkbox"
            id="termsAccepted"
            name="termsAccepted"
            checked={formData.termsAccepted}
            onChange={handleChange}
            className="mt-1 mr-2 text-pink-600"
          />
          <label htmlFor="termsAccepted" className="text-sm text-gray-700">
            I agree to the{" "}
            <a href="#" className="text-pink-600 underline">
              terms and policies
            </a>
          </label>
        </div>

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
          {isLoading ? "Registering..." : "Register Now"}
        </button>

        {/* Login link */}
        <p className="text-center text-sm mt-2 text-gray-700">
          Already have an account?{" "}
          <Link to="/login" className="text-pink-600 underline">
            Log in here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
