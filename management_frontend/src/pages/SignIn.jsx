import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
} from "react-icons/fi";

import api from "../service/api";

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

  // ---------------- Input Change ----------------
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Error remove when user starts typing
    if (value.trim()) {
      setErrors((prev) => ({
        ...prev,
        [name]: false,
      }));
    }
  };

  // ---------------- Sign In ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailEmpty = !formData.email.trim();
    const passwordEmpty = !formData.password.trim();

    // Required validation
    if (emailEmpty || passwordEmpty) {
      setErrors({
        email: emailEmpty,
        password: passwordEmpty,
      });

      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/auth/signin", {
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

      // Only Admin Approval Toast
      if (
        status === 403 &&
        message === "Your account is waiting for admin approval"
      ) {
        toast.error("Your account is waiting for admin approval");
        return;
      }

      // Email not verified
      if (
        status === 403 &&
        message === "Please verify your email first"
      ) {
        setErrors({
          email: true,
          password: true,
        });

        return;
      }

      // Wrong email/password
      if (status === 401) {
        setErrors({
          email: true,
          password: true,
        });

        return;
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f7f8fc] text-[#17171c]">

      <div className="flex min-h-screen items-center justify-center px-4 py-10">

        <div className="w-full max-w-[440px]">

          {/* Header */}
          <div className="mb-8 text-center">

            <h1 className="text-3xl font-bold tracking-tight text-[#17171c]">
              Welcome back
            </h1>

            <p className="mt-2 text-sm text-[#777783]">
              Sign in to continue to your account
            </p>

          </div>

          {/* Card */}
          <div className="rounded-[24px] border border-[#e8e8ee] bg-white p-6 shadow-[0_20px_60px_rgba(20,20,40,0.08)] sm:p-8">

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* ================= EMAIL ================= */}
              <div className="relative">

                <div
                  className={`group relative rounded-xl border bg-[#fafafd] transition-all
                    ${
                      errors.email
                        ? "border-red-500"
                        : "border-[#e3e3e9] focus-within:border-violet-400"
                    }
                  `}
                >

                  <FiMail
                    size={18}
                    className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors
                      ${
                        errors.email
                          ? "text-red-500"
                          : "text-[#9a9aa5] group-focus-within:text-violet-500"
                      }
                    `}
                  />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={
                      errors.email ? "" : "Enter your email"
                    }
                    className="h-12 w-full rounded-xl bg-transparent pl-11 pr-4 text-sm text-[#17171c] outline-none placeholder:text-[#aaaab4]"
                  />

                  {/* Floating Error Label */}
                  {errors.email && (
                    <span className="absolute -top-2 left-3 bg-white px-2 text-xs font-medium text-red-500">
                      Email is required
                    </span>
                  )}

                </div>

              </div>

              {/* ================= PASSWORD ================= */}
              <div className="relative">

                <div
                  className={`group relative rounded-xl border bg-[#fafafd] transition-all
                    ${
                      errors.password
                        ? "border-red-500"
                        : "border-[#e3e3e9] focus-within:border-violet-400"
                    }
                  `}
                >

                  <FiLock
                    size={18}
                    className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors
                      ${
                        errors.password
                          ? "text-red-500"
                          : "text-[#9a9aa5] group-focus-within:text-violet-500"
                      }
                    `}
                  />

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder={
                      errors.password ? "" : "Enter your password"
                    }
                    className="h-12 w-full rounded-xl bg-transparent pl-11 pr-12 text-sm text-[#17171c] outline-none placeholder:text-[#aaaab4]"
                  />

                  {/* Floating Error Label */}
                  {errors.password && (
                    <span className="absolute -top-2 left-3 bg-white px-2 text-xs font-medium text-red-500">
                      Password is required
                    </span>
                  )}

                  {/* Show Password */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute right-4 top-1/2 -translate-y-1/2 transition
                      ${
                        errors.password
                          ? "text-red-400 hover:text-red-500"
                          : "text-[#9a9aa5] hover:text-[#34343d]"
                      }
                    `}
                  >
                    {showPassword ? (
                      <FiEyeOff size={18} />
                    ) : (
                      <FiEye size={18} />
                    )}
                  </button>

                </div>

                {/* Forgot Password */}
                <div className="mt-2 text-right">

                  <Link
                    to="/forgot-password"
                    className="text-xs font-medium text-violet-600 transition hover:text-violet-700"
                  >
                    Forgot password?
                  </Link>

                </div>

              </div>

              {/* Remember Me */}
              <label className="flex cursor-pointer items-center gap-2 text-sm text-[#777783]">

                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-[#d8d8df] accent-violet-600"
                />

                Remember me

              </label>

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={loading}
                className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#17171c] text-sm font-semibold text-white shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#25252c] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
              >

                {loading ? "Signing in..." : "Sign In"}

                {!loading && (
                  <FiArrowRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                )}

              </button>

            </form>

            {/* Divider */}
            <div className="my-7 flex items-center gap-4">

              <div className="h-px flex-1 bg-[#eeeeF2]" />

              <span className="text-xs text-[#a0a0aa]">
                OR
              </span>

              <div className="h-px flex-1 bg-[#eeeeF2]" />

            </div>

            {/* Register */}
            <div className="text-center text-sm text-[#777783]">

              Don't have an account?{" "}

              <Link
                to="/register"
                className="font-semibold text-violet-600 transition hover:text-violet-700"
              >
                Register Now
              </Link>

            </div>

          </div>

     

        </div>

      </div>

    </main>
  );
};

export default SignIn;