// components/ResetPassword.js
import React from "react";
import Input from "../../controls/input/inputView"; // Assumed to accept error prop

const ResetPassword = ({
  onChange,
  onSubmit,
  password,
  confirmPassword,
  error,
  errors = {},
  loading,
}) => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-sm border border-gray-200 p-6 rounded-[5px]">
        <h1 className="text-lg font-medium text-black mb-4 text-center">
          Reset your password
        </h1>

        <form onSubmit={onSubmit} className="space-y-4 text-sm">
          <div>
            <label className="block mb-1 text-gray-600">New Password</label>
            <Input
              type="password"
              className="w-full border p-2 text-black rounded-[5px]"
              name="password"
              value={password}
              onChange={onChange}
              error={errors.password}
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-600">Confirm Password</label>
            <Input
              type="password"
              className="w-full border p-2 text-black rounded-[5px]"
              name="confirmPassword"
              value={confirmPassword}
              onChange={onChange}
              error={errors.confirmPassword}
            />
          </div>

          {error && <p className="text-red-500 text-xs">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded-[5px] disabled:opacity-50"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
