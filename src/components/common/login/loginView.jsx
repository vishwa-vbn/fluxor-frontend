import React, { useState } from "react";

const AuthView = ({ onLogin, onSignup, loading }) => {
  const [activeTab, setActiveTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeTab === "login") {
      onLogin(email, password );
    } else {
      onSignup(email, password );
    }
  };

  const switchTab = () => {
    setActiveTab(activeTab === "login" ? "signup" : "login");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md border-t-4 border-indigo-600">
        {/* Header */}
        <div className="flex items-center justify-center mb-6">
          <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xl font-bold mr-2">
            F
          </div>
          <h2 className="text-2xl font-semibold text-gray-800">luxor</h2>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-6 space-x-4">
          <button
            className={`px-4 py-2 text-lg font-medium transition-colors duration-200 ${
              activeTab === "login"
                ? "border-b-2 border-indigo-600 text-indigo-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
          <button
            className={`px-4 py-2 text-lg font-medium transition-colors duration-200 ${
              activeTab === "signup"
                ? "border-b-2 border-indigo-600 text-indigo-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("signup")}
          >
            Sign Up
          </button>
        </div>

        {/* Welcome Text */}
        <div className="text-center mb-6">
          <p className="text-gray-600 text-sm mt-1">
            {activeTab === "login"
              ? "Sign in to continue"
              : "Create your account"}
          </p>
        </div>

        {/* Form */}
        <div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-medium mb-2"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your@email.com"
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-medium mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="w-full bg-indigo-600 text-white py-2.5 rounded-lg hover:bg-indigo-700 transition duration-200 font-medium disabled:bg-indigo-400 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading
              ? activeTab === "login"
                ? "Logging in..."
                : "Signing up..."
              : activeTab === "login"
              ? "Sign In"
              : "Sign Up"}
          </button>
        </div>

        {/* Tab Switch Link */}
        <div className="mt-4 text-center">
          <button
            onClick={switchTab}
            className="text-indigo-600 hover:underline text-sm focus:outline-none"
          >
            {activeTab === "login"
              ? "Need an account? Sign up"
              : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthView;
