import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import useCurrentUser from "../hooks/useCurrentUser";
import Profile from "../pages/Profile";
import Chat from "../pages/Chat";
import EditProfile from "../pages/EditProfile";

function AppRoutes() {
  useCurrentUser();
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile/:userName" element={<Profile />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/editprofile" element={<EditProfile />} />
    </Routes>
  );
}

export default AppRoutes;
