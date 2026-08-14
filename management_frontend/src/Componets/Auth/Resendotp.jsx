import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiRefreshCw } from "react-icons/fi";

import api from "../../service/api";
import { resendOtp } from "../../service/authApi";

const Resendotp = ({ email, initialTime = 60, onResendSuccess }) => {
  const [timer, setTimer] = useState(initialTime);
  const [canResend, setCanResend] = useState(false);
  const [loading, setLoading] = useState(false);

  // ================= TIMER =================
  useEffect(() => {
    if (timer <= 0) {
      setCanResend(true);
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  // ================= RESEND OTP =================
  const handleResend = async () => {
    if (!canResend || loading) return;

    try {
      setLoading(true);

      const res = await resendOtp({
        email
      })
      
      
  

      if (res.data?.success) {
        toast.success("New OTP sent to your email!");

        setTimer(initialTime);
        setCanResend(false);

        if (onResendSuccess) {
          onResendSuccess();
        }
      }
    } catch (error) {
      console.error("Resend OTP Error:", error);

      toast.error(error.response?.data?.message || "Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-1.5 text-xs text-[#64748b]">
      <span>Didn't receive the code?</span>

      {canResend ? (
        <button
          type="button"
          onClick={handleResend}
          disabled={loading}
          className="flex items-center gap-1 font-bold text-[#3b82f6] hover:underline disabled:opacity-50 cursor-pointer"
        >
          <FiRefreshCw
            className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`}
          />

          {loading ? "Sending..." : "Resend OTP"}
        </button>
      ) : (
        <span className="font-medium text-[#a0aec0]">
          Resend in <span className="text-[#3a4454] font-bold">{timer}s</span>
        </span>
      )}
    </div>
  );
};

export default Resendotp;
