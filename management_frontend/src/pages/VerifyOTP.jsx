import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router";
import toast from "react-hot-toast";
import { FiArrowRight } from "react-icons/fi";

import { verifyOtp, resendOtp } from "../service/authApi";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "your email";

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  const inputRefs = useRef([]);

  // ================= TIMER =================

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    }

    setCanResend(true);
  }, [timer]);

  // ================= INPUT CHANGE =================

  const handleChange = (index, value) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) {
      return;
    }

    const newOtp = [...otp];

    newOtp[index] = value.slice(-1);

    setOtp(newOtp);

    // Move to next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // ================= BACKSPACE =================

  const handleKeyDown = (index, e) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // ================= PASTE OTP =================

  const handlePaste = (e) => {
    e.preventDefault();

    const pastedData = e.clipboardData
      .getData("text")
      .trim();

    if (/^\d{4}$/.test(pastedData)) {
      setOtp(pastedData.split(""));

      inputRefs.current[3]?.focus();
    }
  };

  // ================= VERIFY OTP =================

  const handleSubmit = async (e) => {
    e.preventDefault();

    const otpString = otp.join("");

    if (otpString.length < 4) {
      toast.error("Please enter the 4-digit OTP");
      return;
    }

    try {
      setLoading(true);

      const res = await verifyOtp({
        email,
        otp: otpString,
      });

      if (res.data.success) {
        toast.success("OTP Verified Successfully!");

        navigate("/signIn");
      }
    } catch (error) {
      console.error("Verify OTP Error:", error);

      const message =
        error.response?.data?.message;

      toast.error(
        message || "Invalid OTP code"
      );
    } finally {
      setLoading(false);
    }
  };

  // ================= RESEND OTP =================

  const handleResend = async () => {
    if (!email || email === "your email") {
      toast.error("Email not found");
      return;
    }

    try {
      setResendLoading(true);

      const res = await resendOtp({
        email,
      });

      if (res.data.success) {
        toast.success("New OTP sent!");

        // Reset timer
        setTimer(60);
        setCanResend(false);

        // Clear OTP
        setOtp(["", "", "", ""]);

        // Focus first input
        inputRefs.current[0]?.focus();
      }
    } catch (error) {
      console.error("Resend OTP Error:", error);

      const message =
        error.response?.data?.message;

      toast.error(
        message || "Failed to resend OTP"
      );
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#e6e9ef] text-[#2d3748] flex items-center justify-center p-4">
      <div className="w-full max-w-[400px] neu-card p-6 sm:p-8">

        {/* ================= HEADER ================= */}

        <div className="mb-6 text-center">
          <h1 className="text-xl font-bold tracking-wider text-[#3a4454]">
            VERIFY OTP
          </h1>

          <p className="text-xs text-[#5a677d] mt-2">
            Code sent to{" "}
            <span className="font-semibold">
              {email}
            </span>
          </p>
        </div>

        {/* ================= FORM ================= */}

        <div className="neu-container-inset p-6">

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6"
          >

            {/* ================= OTP INPUTS ================= */}

            <div
              className="flex justify-center gap-3"
              onPaste={handlePaste}
            >
              {otp.map((digit, index) => (
                <div
                  key={index}
                  className="neu-input-wrapper h-[50px] w-[46px] flex items-center justify-center"
                >
                  <input
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) =>
                      handleChange(
                        index,
                        e.target.value
                      )
                    }
                    onKeyDown={(e) =>
                      handleKeyDown(index, e)
                    }
                    className="w-full h-full text-center bg-transparent text-lg font-bold text-[#2d3748] outline-none"
                  />
                </div>
              ))}
            </div>

            {/* ================= VERIFY BUTTON ================= */}

            <button
              type="submit"
              disabled={loading}
              className="neu-button py-2.5 w-full text-xs font-bold uppercase tracking-wider text-[#3a4454] flex items-center justify-center gap-2 hover:text-[#1a202c] disabled:opacity-60"
            >
              {loading
                ? "Verifying..."
                : "VERIFY"}

              {!loading && (
                <FiArrowRight className="h-4 w-4" />
              )}
            </button>

          </form>

          {/* ================= RESEND OTP ================= */}

          <div className="mt-6 text-center text-xs">

            {canResend ? (
              <button
                type="button"
                onClick={handleResend}
                disabled={resendLoading}
                className="font-bold text-[#3b82f6] hover:underline disabled:opacity-60"
              >
                {resendLoading
                  ? "Sending..."
                  : "Resend OTP"}
              </button>
            ) : (
              <span className="text-[#a0aec0]">
                Resend in{" "}
                <span className="text-[#3a4454] font-bold">
                  {timer}s
                </span>
              </span>
             
            )}

          </div>
          

        </div>
        
      </div>
    </main>
  );
};

export default VerifyOTP;