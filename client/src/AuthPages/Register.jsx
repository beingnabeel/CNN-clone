import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Eye, EyeOff } from "react-feather";
import AuthFooter from "./AuthFooter";
import axios from "axios";
function Register() {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  // this state is for the validation of the function
  const [validationErrors, setValidationErrors] = useState(false);
  // password validation function for whether the password is accepted or not
  // uesr state
  const [registered, setRegistered] = useState(false);
  const validatePassword = () => {
    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasDigits = /[\d]/.test(password);
    const hasSymbol = /[@$!%*?&]/.test(password);
    const isLengthValid = password.length >= 8;
    return {
      hasLowerCase,
      hasUpperCase,
      hasDigits,
      hasSymbol,
      isLengthValid,
    };
  };
  const passwordValidation = validatePassword();
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPasswordFocused(false);
    try {
      const response = await axios.post("http://localhost:8080/api/register", {
        email,
        password,
      });
      alert(response.data.message);
      setRegistered(true);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setValidationErrors(error.response.data);
        console.log("error.response.data is ", error.response.data);
      }
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    console.log(e);
  };

  if (registered) {
    return <Navigate to="/Login" />;
  }
  return (
    <div className="bg-black w-full ">
      <div className="flex items-start pt-8 pb-10 justify-center bg-red-100">
        <div className="max-w-lg w-full p-10 bg-white rounded-xl shadow-lg">
          <div className="flex flex-col items-center">
            <img
              src="images/Header/logo.png"
              alt="logo"
              className="w-auto h-12 "
            />
            <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900">
              Create your CNN account
            </h2>
            <div className="text-sm mt-2">
              <Link
                to="/Login"
                className="font-medium text-black hover:text-gray-700"
              >
                Already have an account? <span>Sign In</span>
              </Link>
            </div>
          </div>
          <form className="mt-8" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="mb-4">
                {/* <label htmlFor="email-address sr-only">Email Address</label> */}
                <input
                  type="email"
                  id="email-address"
                  name="email"
                  autoComplete="email"
                  required
                  className="text-gray-900 border border-gray-800 rounded block w-full p-3 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm "
                  value={email}
                  placeholder="Email Address"
                  onChange={handleEmailChange}
                  onKeyDown={() => {
                    setIsPasswordFocused(false);
                    setValidationErrors(false);
                  }}
                />
              </div>
              <div className="mb-4 relative">
                {/* <label htmlFor="email-address sr-only">Email Address</label> */}
                <input
                  type={showPassword ? "text" : "password"}
                  id="Password"
                  name="Password"
                  value={password}
                  autoComplete="password"
                  required
                  className="text-gray-900 border border-gray-800 rounded block w-full p-3 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm "
                  placeholder="Password"
                  onChange={(e) => setpassword(e.target.value)}
                  onKeyDown={() => {
                    setIsPasswordFocused(true);
                    setValidationErrors(false);
                  }}
                />
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer z-20"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </span>
                {isPasswordFocused && (
                  <div
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: "0",
                      display: password ? "block" : "inline",
                      zIndex: "999",
                    }}
                    className="bg-white text-xs p-2 border rounded drop-shadow-md border-gray-500 z-10"
                  >
                    <div
                      style={{
                        color: passwordValidation.hasLowerCase
                          ? "green"
                          : "red",
                      }}
                    >
                      {passwordValidation.hasLowerCase ? "✓" : "✗"} At least one
                      lowercase letter
                    </div>
                    <div
                      style={{
                        color: passwordValidation.hasUpperCase
                          ? "green"
                          : "red",
                      }}
                    >
                      {passwordValidation.hasUpperCase ? "✓" : "✗"} At lease one
                      uppercase letter
                    </div>
                    <div
                      style={{
                        color: passwordValidation.hasDigits ? "green" : "red",
                      }}
                    >
                      {passwordValidation.hasDigits ? "✓" : "✗"} At least one
                      digit
                    </div>
                    <div
                      style={{
                        color: passwordValidation.hasSymbol ? "green" : "red",
                      }}
                    >
                      {passwordValidation.hasSymbol ? "✓" : "✗"} At least one
                      special character
                    </div>
                    <div
                      style={{
                        color: passwordValidation.isLengthValid
                          ? "green"
                          : "red",
                      }}
                    >
                      {passwordValidation.isLengthValid ? "✓" : "✗"} Minimum
                      length of 8 characters
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between mt-5 mb-2">
              <div className="flex items-center text-sm">
                <p className="text-xs text-black-600 hover:text-black-500">
                  By clicking 'Create account', you agree to the Terms of Use
                  and you acknowledge that you have read our Privacy Policy. You
                  further acknowledge that CNN and WarnerMedia affiliates my use
                  your email address for marketing, ads and other offers.
                </p>
              </div>
            </div>
            <div>
              {validationErrors && (
                <div className="text-red-600">
                  {Object.keys(validationErrors).map((key) => {
                    if (typeof validationErrors[key] === "object") {
                      return Object.values(
                        validationErrors[key].map((error) => (
                          <p className="mb-2 text-sm">{error}</p>
                        ))
                      );
                    }
                    return (
                      <p className="mb-2 text-sm" key={key}>
                        {validationErrors[key]}
                      </p>
                    );
                  })}
                </div>
              )}
              <button
                type="submit"
                className="relative w-full justify-center py-3 px-4 border border-transparent text-md font-bold rounded-md bg-red-600 hover:bg-red-700 focus:outline-none text-white"
              >
                Create Account
              </button>
            </div>
            <div className="flex items-center justify-between mt-2 mb-2">
              <div className="flex items-center text-sm">
                <p className="text-xs text-black-600 hover:text-black-500">
                  To opt-out at any time, see options available here.
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
      <AuthFooter />
    </div>
  );
}

export default Register;
