// import React, { useState } from "react";
// import {
//   validate,
//   email as emailRule,
//   samePasswords,
//   password as passwordRule,
// } from "../../../utils/validator";

// import Input from "../../controls/input/inputView";

// const AdminAuthView = ({ onLogin, onSignup, onForgotPassword, loading }) => {
//   const [view, setView] = useState("login");
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [errors, setErrors] = useState({});

//   const resetFields = () => {
//     setUsername("");
//     setEmail("");
//     setPassword("");
//     setConfirmPassword("");
//     setErrors({});
//   };

//   const switchView = (nextView) => {
//     resetFields();
//     setView(nextView);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const fields = {
//       username,
//       email,
//       password,
//       confirmPassword,
//     };

//     let validationResult = { errors: {} };

//     if (view === "signup") {
//       validationResult = validate(
//         {
//           required: ["username", "email", "password", "confirmPassword"],
//           custom: [
//             emailRule(["email"]),
//             passwordRule(["password"]),
//             samePasswords(["password", "confirmPassword"]),
//           ],
//         },
//         fields
//       );
//     }

//     if (view === "login") {
//       validationResult = validate(
//         {
//           required: ["email", "password"],
//           custom: [emailRule(["email"])],
//         },
//         fields
//       );
//     }

//     if (view === "forgot") {
//       validationResult = validate(
//         {
//           required: ["email"],
//           custom: [emailRule(["email"])],
//         },
//         fields
//       );
//     }

//     setErrors(validationResult.errors || {});

//     if (!Object.keys(validationResult.errors || {}).length) {
//       if (view === "login") {
//         onLogin(email, password);
//       } else if (view === "signup") {
//         onSignup( username, email, password );
//       } else if (view === "forgot") {
//         onForgotPassword(email);
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white flex items-center justify-center px-4">
//       <div className="w-full max-w-sm border border-gray-200 p-6 rounded-[5px]">
//         <h1 className="text-lg font-medium text-black mb-4 text-center">
//           {view === "login"
//             ? "Admin Sign in"
//             : view === "signup"
//             ? "Admin Register"
//             : "Reset Password"}
//         </h1>

//         <form onSubmit={handleSubmit} className="space-y-4 text-sm">
//           {view === "signup" && (
//             <div>
//               <label className="block mb-1 text-gray-600">Username</label>
//               <Input
//                 type="text"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 error={errors.username}
//                 className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"

//               />
//             </div>
//           )}

//           {(view === "signup" || view === "login" || view === "forgot") && (
//             <div>
//               <label className="block mb-1 text-gray-600">Email</label>
//               <Input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 error={errors.email}
//                 className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"

//               />
//             </div>
//           )}

//           {(view === "signup" || view === "login") && (
//             <div>
//               <label className="block mb-1 text-gray-600">Password</label>
//               <Input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 error={errors.password}
//                 className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"

//               />
//             </div>
//           )}

//           {view === "signup" && (
//             <div>
//               <label className="block mb-1 text-gray-600">
//                 Confirm Password
//               </label>
//               <Input
//                 type="password"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 error={errors.confirmPassword}
//                 className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"

//               />
//             </div>
//           )}

//           <button
//             type="submit"
//             variant="outline"
//             disabled={loading}
//             className="w-full bg-black text-white py-2 rounded-[5px] "
//           >
//             {loading
//               ? "Loading..."
//               : view === "login"
//               ? "Sign In"
//               : view === "signup"
//               ? "Register"
//               : "Send Reset Link"}
//           </button>
//         </form>

//         <div className="text-center mt-4 text-xs text-gray-500 space-y-1">
//           {view === "login" && (
//             <>
//               <div>
//                 Don’t have an account?{" "}
//                 <span
//                   className="text-black cursor-pointer hover:underline"
//                   onClick={() => switchView("signup")}
//                 >
//                   Register
//                 </span>
//               </div>
//               <div>
//                 <span
//                   className="text-black cursor-pointer hover:underline"
//                   onClick={() => switchView("forgot")}
//                 >
//                   Forgot password?
//                 </span>
//               </div>
//             </>
//           )}
//           {view === "signup" && (
//             <div>
//               Already registered?{" "}
//               <span
//                 className="text-black cursor-pointer hover:underline"
//                 onClick={() => switchView("login")}
//               >
//                 Sign in
//               </span>
//             </div>
//           )}
//           {view === "forgot" && (
//             <div>
//               Remembered password?{" "}
//               <span
//                 className="text-black cursor-pointer hover:underline"
//                 onClick={() => switchView("login")}
//               >
//                 Back to Sign in
//               </span>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminAuthView;
import React, { useState, useContext } from "react";
import {
  validate,
  email as emailRule,
  samePasswords,
  password as passwordRule,
} from "../../../utils/validator";
import { ThemeContext } from "../../../utils/ThemeContext"; // Adjust path as needed
import Input from "../../controls/input/inputView";
import { Sun, Moon, User, Mail, Lock, LogIn, UserPlus, Send } from "lucide-react"; // Import Lucide icons

const AdminAuthView = ({ onLogin, onSignup, onForgotPassword, loading }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [view, setView] = useState("login");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const resetFields = () => {
    setUsername("");
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

    const fields = {
      username,
      email,
      password,
      confirmPassword,
    };

    let validationResult = { errors: {} };

    if (view === "signup") {
      validationResult = validate(
        {
          required: ["username", "email", "password", "confirmPassword"],
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
        onSignup(username, email, password);
      } else if (view === "forgot") {
        onForgotPassword(email);
      }
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-800 flex items-center justify-center px-4">
      <div className="w-full max-w-sm border border-gray-200 dark:border-gray-600 p-6 rounded-[5px] bg-white dark:bg-gray-900">
        {/* Theme Toggle Button */}
        <div className="flex justify-end mb-1">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            {theme === "light" ? (
              <Moon size={20} className="text-gray-800" />
            ) : (
              <Sun size={20} className="text-gray-200" />
            )}
          </button>
        </div>

        <h1 className="text-lg font-medium text-black dark:text-white mb-4 text-center">
          {view === "login"
            ? "Admin Sign in"
            : view === "signup"
            ? "Admin Register"
            : "Reset Password"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          {view === "signup" && (
            <div>
              <label className="block mb-1 text-gray-600 dark:text-gray-400">
                Username
              </label>
              <div className="relative">
               
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  error={errors.username}
                  className="pl-10" // Add padding to accommodate icon
                />
              </div>
            </div>
          )}

          {(view === "signup" || view === "login" || view === "forgot") && (
            <div>
              <label className="block mb-1 text-gray-600 dark:text-gray-400">
                Email
              </label>
              <div className="relative">
               
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={errors.email}
                  className="pl-10"
                />
              </div>
            </div>
          )}

          {(view === "signup" || view === "login") && (
            <div>
              <label className="block mb-1 text-gray-600 dark:text-gray-400">
                Password
              </label>
              <div className="relative">
             
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={errors.password}
                  className="pl-10"
                />
              </div>
            </div>
          )}

          {view === "signup" && (
            <div>
              <label className="block mb-1 text-gray-600 dark:text-gray-400">
                Confirm Password
              </label>
              <div className="relative">
              
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  error={errors.confirmPassword}
                  className="pl-10"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-black dark:bg-gray-700 text-white dark:text-gray-100 py-2 rounded-[5px] hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
          >
            {loading ? (
              "Loading..."
            ) : (
              <>
                {view === "login" && <LogIn size={18} />}
                {view === "signup" && <UserPlus size={18} />}
                {view === "forgot" && <Send size={18} />}
                {view === "login"
                  ? "Sign In"
                  : view === "signup"
                  ? "Register"
                  : "Send Reset Link"}
              </>
            )}
          </button>
        </form>

        <div className="text-center mt-4 text-xs text-gray-500 dark:text-gray-400 space-y-1">
          {view === "login" && (
            <>
              <div>
                Don’t have an account?{" "}
                <span
                  className="text-black dark:text-white cursor-pointer hover:underline"
                  onClick={() => switchView("signup")}
                >
                  Register
                </span>
              </div>
              <div>
                <span
                  className="text-black dark:text-white cursor-pointer hover:underline"
                  onClick={() => switchView("forgot")}
                >
                  Forgot password?
                </span>
              </div>
            </>
          )}
          {view === "signup" && (
            <div>
              Already registered?{" "}
              <span
                className="text-black dark:text-white cursor-pointer hover:underline"
                onClick={() => switchView("login")}
              >
                Sign in
              </span>
            </div>
          )}
          {view === "forgot" && (
            <div>
              Remembered password?{" "}
              <span
                className="text-black dark:text-white cursor-pointer hover:underline"
                onClick={() => switchView("login")}
              >
                Back to Sign in
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminAuthView;