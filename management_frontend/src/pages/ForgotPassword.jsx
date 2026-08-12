import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FiMail, FiArrowRight, FiArrowLeft } from "react-icons/fi";

import api from "../service/api";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Required validation
    if (!email.trim()) {
      setError(true);
      return;
    }

    try {
      setLoading(true);

      // Backend route:
      // POST /auth/forgotPassword
      const res = await api.post("/auth/forgotPassword", {
        email: email.trim(),
      });

      if (res.data?.success) {
        toast.success(
          res.data?.message || "Password reset link sent to your email!"
        );

        /*
         * IMPORTANT:
         * তোমার backend route অনুযায়ী forgotPassword
         * reset token/link generate করে।
         *
         * তাই এখানে verify-otp এ পাঠানো হচ্ছে না।
         *
         * যদি backend response-এ resetToken দেয়,
         * তাহলে সেই token নিয়ে reset-password page-এ
         * navigate করা যাবে।
         */

        if (res.data?.resetToken) {
          navigate(`/reset-password/${res.data.resetToken}`);
        }
      }
    } catch (error) {
      console.error("Forgot Password Error:", error);

      const status = error.response?.status;
      const message = error.response?.data?.message;

      if (status === 404) {
        toast.error(message || "No account found with this email");
        return;
      }

      toast.error(message || "Failed to send password reset link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#e6e9ef] text-[#2d3748] flex items-center justify-center p-4">
      <div className="w-full max-w-[420px] neu-card p-6 sm:p-8">

        {/* ================= HEADER ================= */}
        <div className="mb-6 text-center">
          <h1 className="text-xl font-bold tracking-wider text-[#3a4454] uppercase">
            FORGOT PASSWORD
          </h1>

          <p className="text-xs text-[#5a677d] mt-2">
            Enter your email to receive a password reset link.
          </p>
        </div>

        {/* ================= FORM CONTAINER ================= */}
        <div className="neu-container-inset p-6">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >

            {/* ================= EMAIL ================= */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-xs font-semibold text-[#4a5568] ml-1"
              >
                Email Address
              </label>

              <div
                className={`neu-input-wrapper relative flex h-[48px] items-center px-4 ${
                  error ? "neu-input-error" : ""
                }`}
              >
                <FiMail className="text-[#a0aec0] h-4 w-4 shrink-0 mr-3" />

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);

                    if (e.target.value.trim()) {
                      setError(false);
                    }
                  }}
                  placeholder={
                    error
                      ? "Email is required"
                      : "Enter your email"
                  }
                  className="w-full bg-transparent text-sm text-[#2d3748] outline-none placeholder:text-[#a0aec0]"
                />
              </div>
            </div>

            {/* ================= SUBMIT BUTTON ================= */}
            <button
              type="submit"
              disabled={loading}
              className="neu-button py-2.5 w-full mt-2 text-xs font-bold uppercase tracking-wider text-[#3a4454] flex items-center justify-center gap-2 hover:text-[#1a202c] disabled:opacity-60"
            >
              {loading ? "Sending..." : "SEND RESET LINK"}

              {!loading && (
                <FiArrowRight className="h-4 w-4" />
              )}
            </button>

          </form>
        </div>

        {/* ================= BACK TO SIGN IN ================= */}
        <div className="mt-6 text-center">
          <Link
            to="/signin"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#3b82f6] hover:underline"
          >
            <FiArrowLeft className="h-3.5 w-3.5" />
            Back to Sign In
          </Link>
        </div>

      </div>
    </main>
  );
};

export default ForgotPassword;