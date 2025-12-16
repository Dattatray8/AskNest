import Navbar from "../components/Navbar";
import BottomBar from "../components/BottomBar";
import useCurrentUser from "../hooks/useCurrentUser";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import LoginMessage from "../components/LoginMessage";
import { useContext } from "react";
import SocketContext from "../context/SocketContext";

function Home() {
  const { loading } = useCurrentUser();
  const { isLoginned } = useContext(SocketContext);
  return (
    <div className="relative">
      {loading && (
        <div className="fixed inset-0 bg-base-100 z-10">
          <div className="navbar bg-base-200 px-4">
            <div className="navbar-start">
              <div className="skeleton w-20 h-6 ml-4"></div>
            </div>
            <div className="navbar-end gap-4">
              <div className="skeleton w-20 h-6 hidden sm:block"></div>
              <div className="skeleton w-20 h-6 hidden sm:block"></div>
              <div className="skeleton w-20 h-6 hidden sm:block"></div>
              <div className="skeleton w-20 h-6"></div>
              <div className="skeleton w-8 h-8 rounded-full"></div>
            </div>
          </div>
          <div className="dock dock-md sm:hidden m-auto h-18">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center gap-1"
              >
                <div className="skeleton w-5 h-5 rounded"></div>
                <div className="skeleton w-8 h-3"></div>
              </div>
            ))}
          </div>
        </div>
      )}
      {!loading && (
        <div>
          <Navbar />
          <Hero />
          <Footer />
          <BottomBar tabName={"Home"} />
          {!isLoginned && <LoginMessage />}
        </div>
      )}
    </div>
  );
}

export default Home;
