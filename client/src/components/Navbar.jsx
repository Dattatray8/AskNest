import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserData } from "../redux/userSlice";
import { serverUrl } from "../App";
import axios from "axios";
import user from "../assets/user.png";
import { useContext } from "react";
import SocketContext from "../context/SocketContext";

function Navbar() {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { theme, setTheme } = useContext(SocketContext);

  const handleLogOut = async () => {
    try {
      await axios.get(`${serverUrl}/api/v1/auth/logout`, {
        withCredentials: true,
      });
      dispatch(setUserData(null));
    } catch (error) {
      console.log(error);
    }
  };

  const themeList = [
    "light",
    "dark",
    "dracula",
    "synthwave",
    "cyberpunk",
    "retro",
    "forest",
    "garden",
    "aqua",
    "nord",
    "luxury",
    "business",
    "black",
    "halloween",
    "valentine",
    "sunset",
    "coffee",
    "bumblebee",
    "emerald",
    "acid",
  ];

  return (
    <div className="navbar fixed top-0 left-0 w-full z-50 bg-base-100">
      <div className="flex-1">
        <a
          className="px-4 font-semibold cursor-pointer text-xl"
          onClick={() => navigate("/")}
        >
          QuerySphere
        </a>
      </div>

      {/* Desktop links */}
      <div className="hidden sm:flex gap-4">
        <ul className="menu menu-horizontal gap-4">
          <li>
            <a onClick={() => navigate("/search")}>Search</a>
          </li>
          <li>
            <a onClick={() => navigate("/chat")}>Chat</a>
          </li>
          <li>
            <a onClick={() => navigate("/feed")}>Feed</a>
          </li>
          <li>
            <details>
              <summary>🎨 {theme}</summary>
              <ul className="bg-base-100 p-2 w-40 max-h-60 overflow-y-auto">
                {themeList.map((t) => (
                  <li key={t}>
                    <a onClick={() => setTheme(t)}>{t}</a>
                  </li>
                ))}
              </ul>
            </details>
          </li>
        </ul>
      </div>

      <div className="flex items-center gap-4">
        <div className="sm:hidden">
          <ul className="menu menu-horizontal gap-4">
            <li>
              <details>
                <summary>🎨 {theme}</summary>
                <ul className="bg-base-100 p-2 w-40 max-h-60 overflow-y-auto">
                  {themeList.map((t) => (
                    <li key={t}>
                      <a onClick={() => setTheme(t)}>{t}</a>
                    </li>
                  ))}
                </ul>
              </details>
            </li>
          </ul>
        </div>
        {userData ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img src={userData?.profileImage || user} alt="profile" />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-40 shadow"
            >
              <li className="hidden sm:block">
                <a onClick={() => navigate(`/profile/${userData?.userName}`)}>
                  Profile
                </a>
              </li>
              <li>
                <a onClick={handleLogOut}>Logout</a>
              </li>
            </ul>
          </div>
        ) : (
          <button className="btn btn-sm" onClick={() => navigate("/login")}>
            Login
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
