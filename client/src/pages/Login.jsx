import { useState } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { setUserData } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Login() {
  const [loading, setLoading] = useState(false);
  const [formValue, setFormValue] = useState({
    userName: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async () => {
    for (let key in formValue) {
      if (formValue[key] === "") {
        toast.error(`${key} is empty`);
        return;
      }
    }
    try {
      setLoading(true);
      const res = await axios.post(
        `${serverUrl}/api/v1/auth/login`,
        formValue,
        { withCredentials: true }
      );
      toast.success(res?.data?.message);
      dispatch(setUserData(res?.data?.safeUser));
      navigate("/");
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message || error?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-[100vh] w-full">
      <div className="card w-96 bg-base-100 shadow-md">
        <div className="card-body">
          <div className="text-center text-2xl font-semibold mb-4">
            Login to AskNest
          </div>
          <div className="text-center mb-2">
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
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </g>
              </svg>
              <input
                type="text"
                required
                placeholder="Username"
                pattern="[A-Za-z][A-Za-z0-9\-]*"
                minLength="3"
                maxLength="30"
                title="Only letters, numbers or dash"
                onChange={(e) =>
                  setFormValue({ ...formValue, userName: e.target.value })
                }
              />
            </label>
            <p className="validator-hint text-start pl-2 hidden">
              Must be 3 to 30 characters
              <br />
            </p>
          </div>
          <div className="text-center mb-2 relative">
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
                placeholder="Password"
                minLength="6"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                onChange={(e) =>
                  setFormValue({ ...formValue, password: e.target.value })
                }
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
              Must be more than 6 characters, including
              <br />
              At least one number <br />
              At least one lowercase letter <br />
              At least one uppercase letter
              <br />
            </p>
          </div>
          <div
            className="text-blue-500 cursor-pointer pb-2 pl-2"
            onClick={() => {
              toast("🚧 Feature under development!");
            }}
          >
            Forgot Password?
          </div>
          <div className="text-center">
            <button className="btn w-[95%]" onClick={handleSignup}>
              {loading ? (
                <span className="loading loading-spinner text-neutral"></span>
              ) : (
                "Login"
              )}
            </button>
          </div>
          <div className="text-center py-2">
            Don't Have an account?{" "}
            <span
              className="text-blue-500 hover:underline cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
