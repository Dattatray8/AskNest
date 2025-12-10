import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { setUserData } from "../redux/userSlice";
import { serverUrl } from "../App";
import axios from "axios";
import userPlaceholder from "../assets/user.png";
import { useContext } from "react";
import SocketContext from "../context/SocketContext";
import ThemeDropdown from "./ThemeDropdown";
import { themeList } from "../constants/themeList";
import useCurrentUser from "../hooks/auth/useCurrentUser";

function Navbar() {
  const { user } = useCurrentUser();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { theme, setTheme } = useContext(SocketContext);

  const handleLogOut = async () => {
    try {
      await axios.get(`${serverUrl}/api/v1/auth/logout`, {
        withCredentials: true,
      });

      dispatch(setUserData(null));
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="navbar fixed top-0 left-0 w-full z-50 bg-base-100 shadow-sm px-4">
      {/* Left: Logo */}
      <div className="flex-1">
        <Link to="/" className="font-semibold px-4 text-xl cursor-pointer">
          QuerySphere
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden sm:flex gap-4">
        <ul className="menu menu-horizontal gap-4">
          <li><button onClick={() => navigate("/search")}>Search</button></li>
          <li><button onClick={() => navigate("/chat")}>Chat</button></li>
          <li><button onClick={() => navigate("/feed")}>Feed</button></li>

          <li>
            <details>
              <summary>🎨 {theme}</summary>
              <ThemeDropdown themeList={themeList} setTheme={setTheme} />
            </details>
          </li>
        </ul>
      </div>

      {/* Right: User or Login */}
      <div className="flex items-center gap-4">

        {/* Mobile Theme Dropdown */}
        <div className="sm:hidden">
          <details>
            <summary>🎨 {theme}</summary>
            <ThemeDropdown themeList={themeList} setTheme={setTheme} />
          </details>
        </div>

        {/* Auth Section */}
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  src={user?.profileImage || userPlaceholder}
                  alt="User Avatar"
                />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-40 shadow"
            >
              <li className="hidden sm:block">
                <button onClick={() => navigate(`/profile/${user?._id}`)}>
                  Profile
                </button>
              </li>

              <li><button onClick={handleLogOut}>Logout</button></li>
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
