import axios from "axios";
import { useState } from "react";
import { serverUrl } from "../config/config";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

function ForgotPass() {
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
  let [password, setPassword] = useState("");
  let [confirmPassword, setConfirmPassword] = useState("");
  let [showPassword, setShowPassword] = useState(false);
  let [showConfirmPassword, setShowConfirmPassword] = useState(false);
  let OTP = Object.values(otp).join("");
  const navigation = useNavigate();

  const sendOtp = async () => {
    const input = document.getElementById("email-input-for-otp");

    if (!input.checkValidity()) {
      input.reportValidity();
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(
        `${serverUrl}/api/v1/auth/sendotp`,
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
        `${serverUrl}/api/v1/auth/verifyotp`,
        { email, otp: OTP },
        { withCredentials: true }
      );
      if (res.data.success) {
        setStep(3);
      }
      console.log(res.data);
      toast.success(res?.data?.message);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error?.response?.data?.message || error?.message);
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async () => {
    const passwordInput = document.getElementById("reset-password");
    const confirmPasswordInput = document.getElementById(
      "reset-confirm-password"
    );
    if (!passwordInput.checkValidity()) {
      passwordInput.reportValidity();
      return;
    }
    if (!confirmPasswordInput.checkValidity()) {
      confirmPasswordInput.reportValidity();
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Password and Confirm Password do not match");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(
        `${serverUrl}/api/v1/auth/resetpassword`,
        { email, password },
        { withCredentials: true }
      );
      console.log(res.data);
      toast.success(res?.data?.message);
      navigation("/login");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || error?.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="card w-96 bg-base-100 shadow-md">
        <div className="card-body">
          <ul className="steps steps-horizontal">
            <li className={`step ${step >= 1 ? "step-primary" : ""}`}></li>
            <li className={`step ${step >= 2 ? "step-primary" : ""}`}></li>
            <li className={`step ${step >= 3 ? "step-primary" : ""}`}></li>
          </ul>
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
                  id="email-input-for-otp"
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
          {step > 2 && (
            <>
              <div className="divider px-6"></div>
              <div className="flex flex-col justify-center gap-3 px-6">
                <div className="text-center relative">
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
                        <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                        <circle
                          cx="16.5"
                          cy="7.5"
                          r=".5"
                          fill="currentColor"
                        ></circle>
                      </g>
                    </svg>
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      id="reset-password"
                      placeholder="New Password"
                      minLength="6"
                      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                      title="Must be more than 5 characters, including number, lowercase letter, uppercase letter"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {showPassword ? (
                      <EyeOff
                        className="absolute right-2 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    ) : (
                      <Eye
                        className="absolute right-2 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    )}
                  </label>
                  <p className="validator-hint hidden text-start pl-2">
                    Must be more than 5 characters, including
                    <br />
                    At least one number <br />
                    At least one lowercase letter <br />
                    At least one uppercase letter
                    <br />
                  </p>
                </div>
                <div className="text-center relative mb-2">
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
                        <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                        <circle
                          cx="16.5"
                          cy="7.5"
                          r=".5"
                          fill="currentColor"
                        ></circle>
                      </g>
                    </svg>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      id="reset-confirm-password"
                      placeholder="Confirm Password"
                      minLength="6"
                      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                      title="Must be more than 5 characters, including number, lowercase letter, uppercase letter"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {showConfirmPassword ? (
                      <EyeOff
                        className="absolute right-2 cursor-pointer"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      />
                    ) : (
                      <Eye
                        className="absolute right-2 cursor-pointer"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      />
                    )}
                  </label>
                  <p className="validator-hint hidden text-start pl-2">
                    Must be more than 5 characters, including
                    <br />
                    At least one number <br />
                    At least one lowercase letter <br />
                    At least one uppercase letter
                    <br />
                  </p>
                </div>
                <button
                  className="btn btn-primary"
                  disabled={!password || !confirmPassword}
                  onClick={resetPassword}
                >
                  {loading ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    "Reset Password"
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ForgotPass;
