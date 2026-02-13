import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { setVerifiedEmail } from "../redux/userSlice";

function EmailVerification() {
  let [step, setStep] = useState(1);
  let [loading, setLoading] = useState(false);
  let [email, setEmail] = useState("");
  let [otp, setOtp] = useState({
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
    7: "",
  });
  let OTP = Object.values(otp).join("");
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const sendOtp = async () => {
    const input = document.getElementById("email-input-for-verification");

    if (!input.checkValidity()) {
      input.reportValidity();
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(
        `${serverUrl}/api/v1/auth/sendotpemailverification`,
        { email },
        { withCredentials: true }
      );
      if (res.data.success) {
        setStep(2);
      }
      console.log(res.data);
      toast.success(res?.data?.message);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error?.response?.data?.message || error?.message);
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${serverUrl}/api/v1/auth/verifyotpemailverification`,
        { email, otp: OTP },
        { withCredentials: true }
      );
      console.log(res.data);
      toast.success(res?.data?.message);
      dispatch(setVerifiedEmail(email));
      navigation("/signup");
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error?.response?.data?.message || error?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="card w-96 bg-base-100 shadow-md">
        <div className="card-body">
          <div className="text-center text-2xl font-semibold">
            Email Verification
          </div>
          <div
            className={`flex flex-col justify-center gap-3 mt-4 ${
              step > 1 && "px-6"
            }`}
          >
            <div className={`text-center ${step === 1 && "mb-2"}`}>
              <label className="input validator">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </g>
                </svg>
                <input
                  type="email"
                  id="email-input-for-verification"
                  placeholder="Enter your email..."
                  required
                  value={email}
                  disabled={step !== 1}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <div className="validator-hint hidden text-start pl-2">
                Enter valid email address
              </div>
            </div>
            {step === 1 && (
              <button
                className="btn btn-primary"
                onClick={sendOtp}
                disabled={!email}
              >
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Send OTP"
                )}
              </button>
            )}
          </div>
          {step > 1 && (
            <>
              <div className="divider px-6"></div>
              <div className="flex flex-col justify-center gap-6 px-6">
                <div className="flex gap-2 justify-center">
                  {Array.from({ length: 7 }).map((_, idx) => (
                    <input
                      key={idx}
                      type="text"
                      className="input w-8"
                      maxLength={1}
                      disabled={step !== 2}
                      value={otp[idx + 1]}
                      onChange={(e) =>
                        setOtp({ ...otp, [idx + 1]: e.target.value })
                      }
                    />
                  ))}
                </div>
                {step === 2 && (
                  <button
                    className="btn btn-primary"
                    onClick={verifyOtp}
                    disabled={OTP.length !== 7}
                  >
                    {loading ? (
                      <span className="loading loading-spinner"></span>
                    ) : (
                      "Verify"
                    )}
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default EmailVerification;
