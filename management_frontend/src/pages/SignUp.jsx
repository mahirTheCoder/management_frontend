import { useState } from "react";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";

import {
  FiUser,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiBriefcase,
  FiArrowRight,
} from "react-icons/fi";

import api from "../service/api";
import { signup } from "../service/authApi";

const SignUp = () => {
  const navigate = useNavigate();

  // ================= FORM =================
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    role: "student",
  });

  const [errors, setErrors] = useState({
    fullname: false,
    email: false,
    password: false,
  });

  // ================= OTHER STATES =================

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // ================= INPUT CHANGE =================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Input এ কিছু লিখলে error remove হবে
    setErrors((prev) => ({
      ...prev,
      [name]: false,
    }));
  };

  // ================= SIGN UP =================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Required validation
    const newErrors = {
      fullname: !formData.fullname.trim(),
      email: !formData.email.trim(),
      password: !formData.password.trim(),
    };

    // কোনো field empty হলে
    if (newErrors.fullname || newErrors.email || newErrors.password) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);

      // ================= API =================

      const res = await signup({
        fullname,
        email,
        password,
      });

      // ================= SUCCESS =================

      if (res.data.success) {
        toast.success("OTP sent to your email");

        navigate("/VerifyOTP", {
          state: {
            email: formData.email,
          },
        });
      }
    } catch (error) {
      console.error("Signup Error:", error);

      const message = error.response?.data?.message;

      toast.error(message || "Something went wrong during registration");
    } finally {
      setLoading(false);
    }
  };

  // ================= UI =================

  return (
    <main className="min-h-screen bg-[#e6e9ef] text-[#2d3748] flex items-center justify-center p-4 py-10">
      <div className="w-full max-w-120 neu-card p-6 sm:p-10">
        {/* ================= HEADER ================= */}

        <div className="mb-8 text-center">
          <h1 className="text-2xl font-black tracking-wider uppercase text-[#3a4454]">
            CREATE ACCOUNT
          </h1>
        </div>

        {/* ================= FORM CONTAINER ================= */}

        <div className="neu-container-inset p-6 sm:p-8">
          <p className="text-center text-sm font-medium text-[#5a677d] mb-6">
            Register New Account
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* ================= FULL NAME ================= */}

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="fullname"
                className="text-xs font-semibold text-[#4a5568] ml-1"
              >
                Full Name
              </label>

              <div
                className={`neu-input-wrapper relative flex h-12 items-center px-4 ${
                  errors.fullname ? "neu-input-error" : ""
                }`}
              >
                <FiUser className="text-[#a0aec0] h-4 w-4 shrink-0 mr-3" />

                <input
                  id="fullname"
                  name="fullname"
                  type="text"
                  value={formData.fullname}
                  onChange={handleChange}
                  placeholder={
                    errors.fullname
                      ? "Full name is required"
                      : "Enter your full name"
                  }
                  className="w-full bg-transparent text-sm text-[#2d3748] outline-none placeholder:text-[#a0aec0]"
                />
              </div>
            </div>

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
            </div>

            {/* ================= ROLE ================= */}

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="role"
                className="text-xs font-semibold text-[#4a5568] ml-1"
              >
                Select Role
              </label>

              <div className="neu-input-wrapper relative flex h-12 items-center px-4">
                <FiBriefcase className="text-[#a0aec0] h-4 w-4 shrink-0 mr-3" />

                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full bg-transparent text-sm text-[#2d3748] outline-none cursor-pointer capitalize"
                >
                  <option
                    value="student"
                    className="bg-[#e6e9ef] text-[#2d3748]"
                  >
                    Student
                  </option>

                  <option
                    value="teacher"
                    className="bg-[#e6e9ef] text-[#2d3748]"
                  >
                    Teacher
                  </option>
                </select>
              </div>
            </div>

            {/* ================= SUBMIT BUTTON ================= */}

            <div className="mt-4 flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="neu-button px-8 py-2.5 text-xs font-bold uppercase tracking-wider text-[#3a4454] flex items-center justify-center gap-2 hover:text-[#1a202c] disabled:opacity-60"
              >
                {loading ? "Registering..." : "REGISTER NOW"}

                {!loading && <FiArrowRight className="h-4 w-4" />}
              </button>
              
            </div>
          </form>
        </div>

        {/* ================= FOOTER ================= */}

        <div className="mt-6 text-center text-xs font-medium text-[#64748b]">
          Already have an account?{" "}
          <Link
            to="/signIn"
            className="font-bold text-[#3b82f6] hover:underline"
          >
            Sign In
          </Link>
        
        </div>
        <div className="mt-6 text-center text-xs font-medium text-[#64748b]">
       
          <Link
            to="/VerifyOTP"
            className="font-bold text-[#3b82f6] hover:underline"
          >
            VerifyOTP
          </Link>
        
        </div>
      </div>
    </main>
  );
};

export default SignUp;
