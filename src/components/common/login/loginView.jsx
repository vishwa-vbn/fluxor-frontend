import React, { useState } from "react";
import {
  validate,
  email as emailRule,
  samePasswords,
  password as passwordRule,
} from "../../../utils/validator"; // Make sure this matches your file path

import Input from "../../controls/input/inputView"; // import the reusable component

const AuthView = ({ onLogin, onSignup, onForgotPassword, loading }) => {
  const [view, setView] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({});

  const resetFields = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setErrors({});
  };

  const switchView = (nextView) => {
    resetFields();
    setView(nextView);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let validationResult = { errors: {} };

    const fields = {
      name,
      email,
      password,
      confirmPassword,
    };

    if (view === "signup") {
      validationResult = validate(
        {
          required: ["name", "email", "password", "confirmPassword"],
          custom: [
            emailRule(["email"]),
            passwordRule(["password"]),
            samePasswords(["password", "confirmPassword"]),
          ],
        },
        fields
      );
    }

    if (view === "login") {
      validationResult = validate(
        {
          required: ["email", "password"],
          custom: [emailRule(["email"])],
        },
        fields
      );
    }

    if (view === "forgot") {
      validationResult = validate(
        {
          required: ["email"],
          custom: [emailRule(["email"])],
        },
        fields
      );
    }

    setErrors(validationResult.errors || {});

    if (!Object.keys(validationResult.errors || {}).length) {
      if (view === "login") {
        onLogin(email, password);
      } else if (view === "signup") {
        onSignup(name, email, password);
      } else if (view === "forgot") {
        onForgotPassword(email);
      }
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-sm border border-gray-200 p-6 rounded-[5px]">
        <h1 className="text-lg font-medium text-black mb-4 text-center">
          {view === "login"
            ? "Sign in"
            : view === "signup"
            ? "Create account"
            : "Reset your password"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          {view === "signup" && (
            <div>
              <label className="block mb-1 text-gray-600">Full Name</label>
              <Input
                type="text"
                className="w-full border p-2 text-black rounded-[5px]"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={errors.name}
              />
            </div>
          )}

          {(view === "signup" || view === "login" || view === "forgot") && (
            <div>
              <label className="block mb-1 text-gray-600">Email</label>
              <Input
                type="email"
                className="w-full border p-2 text-black rounded-[5px]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
              />
            </div>
          )}

          {(view === "signup" || view === "login") && (
            <div>
              <label className="block mb-1 text-gray-600">Password</label>
              <Input
                type="password"
                className="w-full border p-2 text-black rounded-[5px]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
              />
            </div>
          )}

          {view === "signup" && (
            <div>
              <label className="block mb-1 text-gray-600">
                Confirm Password
              </label>
              <Input
                type="password"
                className="w-full border p-2 text-black rounded-[5px]"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={errors.confirmPassword}
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded-[5px] disabled:opacity-50"
          >
            {loading
              ? "Loading..."
              : view === "login"
              ? "Sign In"
              : view === "signup"
              ? "Sign Up"
              : "Send Reset Link"}
          </button>
        </form>

        <div className="text-center mt-4 text-xs text-gray-500 space-y-1">
          {view === "login" && (
            <>
              <div>
                Don’t have an account?{" "}
                <span
                  className="text-black cursor-pointer hover:underline"
                  onClick={() => switchView("signup")}
                >
                  Sign up
                </span>
              </div>
              <div>
                <span
                  className="text-black cursor-pointer hover:underline"
                  onClick={() => switchView("forgot")}
                >
                  Forgot password?
                </span>
              </div>
            </>
          )}
          {view === "signup" && (
            <div>
              Already have an account?{" "}
              <span
                className="text-black cursor-pointer hover:underline"
                onClick={() => switchView("login")}
              >
                Sign in
              </span>
            </div>
          )}
          {view === "forgot" && (
            <div>
              Remember your password?{" "}
              <span
                className="text-black cursor-pointer hover:underline"
                onClick={() => switchView("login")}
              >
                Go back to Sign in
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthView;
