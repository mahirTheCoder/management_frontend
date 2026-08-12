import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from "react-icons/fi";

import api from "../service/api";
import { signin } from "../service/authApi";

const SignIn = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

  const [loading, setLoading] = useState(false);

  // ================= INPUT CHANGE =================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (value.trim()) {
      setErrors((prev) => ({
        ...prev,
        [name]: false,
      }));
    }
  };

  // ================= SIGN IN =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailEmpty = !formData.email.trim();
    const passwordEmpty = !formData.password.trim();

    if (emailEmpty || passwordEmpty) {
      setErrors({
        email: emailEmpty,
        password: passwordEmpty,
      });
      return;
    }

    try {
      setLoading(true);

      const res = await signin({
        email: formData.email,
        password: formData.password,
      });

      if (res.data.success) {
        toast.success("Login successful");
        navigate("/");
      }
    } catch (error) {
      console.error("Signin Error:", error);

      const status = error.response?.status;
      const message = error.response?.data?.message;

      if (
        status === 403 &&
        message === "Your account is waiting for admin approval"
      ) {
        toast.error("Your account is waiting for admin approval");
        return;
      }

      if (status === 403 && message === "Please verify your email first") {
        toast.error("Please verify your email first");
        return;
      }

      if (status === 401) {
        setErrors({
          email: true,
          password: true,
        });

        toast.error("Invalid email or password");
        return;
      }

      toast.error(message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#e6e9ef] text-[#2d3748] flex items-center justify-center p-4">
      <div className="w-full max-w-115 neu-card p-6 sm:p-10">
        {/* ================= HEADER ================= */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-black tracking-wider uppercase text-[#3a4454]">
            USER AUTHENTICATION
          </h1>
        </div>

        {/* ================= INSET FORM SECTION ================= */}
        <div className="neu-container-inset p-6 sm:p-8">
          <p className="text-center text-sm font-medium text-[#5a677d] mb-6">
            Sign In To Your Account
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* ================= EMAIL ================= */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-xs font-semibold text-[#4a5568] ml-1"
              >
                Email Address
              </label>

              <div
                className={`neu-input-wrapper relative flex h-12 items-center px-4 ${
                  errors.email ? "neu-input-error" : ""
                }`}
              >
                <FiMail className="text-[#a0aec0] h-4 w-4 shrink-0 mr-3" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={
                    errors.email ? "Email is required" : "Enter your email"
                  }
                  className="w-full bg-transparent text-sm text-[#2d3748] outline-none placeholder:text-[#a0aec0]"
                />
              </div>
            </div>

            {/* ================= PASSWORD ================= */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="password"
                className="text-xs font-semibold text-[#4a5568] ml-1"
              >
                Password
              </label>

              <div
                className={`neu-input-wrapper relative flex h-12 items-center px-4 ${
                  errors.password ? "neu-input-error" : ""
                }`}
              >
                <FiLock className="text-[#a0aec0] h-4 w-4 shrink-0 mr-3" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder={
                    errors.password
                      ? "Password is required"
                      : "Enter your password"
                  }
                  className="w-full bg-transparent text-sm text-[#2d3748] outline-none placeholder:text-[#a0aec0] pr-8"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 text-[#a0aec0] hover:text-[#4a5568] transition-colors"
                >
                  {showPassword ? (
                    <FiEyeOff className="h-4 w-4" />
                  ) : (
                    <FiEye className="h-4 w-4" />
                  )}
                </button>
              </div>

              <div className="flex justify-end mt-1">
                <Link
                  to="/forgot-password"
                  className="text-xs text-[#5b6e8a] hover:text-[#2d3748] font-medium transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            {/* ================= REMEMBER ME ================= */}
            <label className="flex items-center gap-2 text-xs font-medium text-[#5a677d] cursor-pointer my-1">
              <input
                type="checkbox"
                className="rounded accent-[#4b5563] cursor-pointer"
              />
              <span>Remember me</span>
            </label>

            {/* ================= SUBMIT BUTTON ================= */}
            <div className="mt-2 flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="neu-button px-8 py-2.5 text-xs font-bold uppercase tracking-wider text-[#3a4454] flex items-center justify-center gap-2 hover:text-[#1a202c] disabled:opacity-60"
              >
                {loading ? "Signing in..." : "SIGN IN"}
                {!loading && <FiArrowRight className="h-4 w-4" />}
              </button>
            </div>
          </form>
        </div>

        {/* ================= FOOTER / REGISTER ================= */}
        <div className="mt-6 text-center text-xs font-medium text-[#64748b]">
          Don't have an account?{" "}
          <Link
            to="/signUp"
            className="font-bold text-[#3b82f6] hover:underline"
          >
            signUp
          </Link>
        </div>
      </div>
    </main>
  );
};

export default SignIn;
