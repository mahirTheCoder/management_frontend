import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
import { FiLock, FiEye, FiEyeOff, FiCheckCircle } from "react-icons/fi";

import { resetPassword } from "../../service/authApi";

const Resetpass = () => {
  const navigate = useNavigate();
  const { token } = useParams();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    password: false,
    confirmPassword: false,
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

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const passEmpty = !formData.password.trim();
    const confirmPassEmpty = !formData.confirmPassword.trim();

    // Required validation
    if (passEmpty || confirmPassEmpty) {
      setErrors({
        password: passEmpty,
        confirmPassword: confirmPassEmpty,
      });

      return;
    }

    // Password match validation
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    // Token validation
    if (!token) {
      toast.error("Invalid or expired reset link");
      return;
    }

    try {
      setLoading(true);

      // API call from authApi.js
      const res = await resetPassword(token, {
        newPassword: formData.password,
      });

      if (res.data?.success) {
        toast.success(res.data?.message || "Password reset successful!");

        navigate("/signIn");
      }
    } catch (error) {
      console.error("Reset Password Error:", error);

      toast.error(error.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#e6e9ef] text-[#2d3748] flex items-center justify-center p-4">
      <div className="w-full max-w-105 neu-card p-6 sm:p-8">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-xl font-bold tracking-wider text-[#3a4454] uppercase">
            RESET PASSWORD
          </h1>

          <p className="text-xs text-[#5a677d] mt-2">
            Create a new password for your account.
          </p>
        </div>

        {/* Form Container */}
        <div className="neu-container-inset p-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* New Password */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="password"
                className="text-xs font-semibold text-[#4a5568] ml-1"
              >
                New Password
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
                    errors.password ? "Password required" : "Enter new password"
                  }
                  className="w-full bg-transparent text-sm text-[#2d3748] outline-none placeholder:text-[#a0aec0] pr-8"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 text-[#a0aec0] hover:text-[#4a5568]"
                >
                  {showPassword ? (
                    <FiEyeOff className="h-4 w-4" />
                  ) : (
                    <FiEye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="confirmPassword"
                className="text-xs font-semibold text-[#4a5568] ml-1"
              >
                Confirm Password
              </label>

              <div
                className={`neu-input-wrapper relative flex h-12 items-center px-4 ${
                  errors.confirmPassword ? "neu-input-error" : ""
                }`}
              >
                <FiLock className="text-[#a0aec0] h-4 w-4 shrink-0 mr-3" />

                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder={
                    errors.confirmPassword
                      ? "Confirm required"
                      : "Confirm new password"
                  }
                  className="w-full bg-transparent text-sm text-[#2d3748] outline-none placeholder:text-[#a0aec0]"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="neu-button py-2.5 w-full mt-2 text-xs font-bold uppercase tracking-wider text-[#3a4454] flex items-center justify-center gap-2 hover:text-[#1a202c] disabled:opacity-60"
            >
              {loading ? "Updating..." : "RESET PASSWORD"}

              {!loading && <FiCheckCircle className="h-4 w-4" />}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Resetpass;
