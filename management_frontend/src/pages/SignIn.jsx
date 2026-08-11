import { useState } from "react";
import { Link } from "react-router";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
} from "react-icons/fi";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);

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

            <form className="space-y-5">

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-[#303039]"
                >
                  Email address
                </label>

                <div className="group relative">
                  <FiMail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9a9aa5] transition-colors group-focus-within:text-violet-500"
                  />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    className="h-12 w-full rounded-xl border border-[#e3e3e9] bg-[#fafafd] pl-11 pr-4 text-sm text-[#17171c] outline-none placeholder:text-[#aaaab4] transition-all focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-500/10"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-[#303039]"
                  >
                    Password
                  </label>

                  <Link
                    to="/forgot-password"
                    className="text-xs font-medium text-violet-600 transition hover:text-violet-700"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="group relative">
                  <FiLock
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9a9aa5] transition-colors group-focus-within:text-violet-500"
                  />

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="h-12 w-full rounded-xl border border-[#e3e3e9] bg-[#fafafd] pl-11 pr-12 text-sm text-[#17171c] outline-none placeholder:text-[#aaaab4] transition-all focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-500/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9a9aa5] transition hover:text-[#34343d]"
                  >
                    {showPassword ? (
                      <FiEyeOff size={18} />
                    ) : (
                      <FiEye size={18} />
                    )}
                  </button>
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

              {/* Sign In */}
              <button
                type="submit"
                className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#17171c] text-sm font-semibold text-white shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#25252c] hover:shadow-xl"
              >
                Sign In

                <FiArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
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