import { useContext, useState } from "react";
import Spline from "@splinetool/react-spline";
import Navbar from "../components/Navbar";
import BottomBar from "../components/BottomBar";
import SocketContext from "../context/SocketContext";

function Home() {
  const [loading, setLoading] = useState(true);
  const { theme } = useContext(SocketContext);

  return (
    <div className="relative">
      <Navbar />
      {loading && (
        <div className="absolute inset-0 bg-base-100 z-10">
          <div className="navbar bg-base-200 px-4">
            <div className="navbar-start">
              <div className="skeleton w-10 h-10 rounded-full"></div>
            </div>
            <div className="navbar-center">
              <div className="skeleton w-20 h-6"></div>
            </div>
            <div className="navbar-end">
              <div className="skeleton w-8 h-8 rounded-full mr-2"></div>
              <div className="skeleton w-8 h-8 rounded-full"></div>
            </div>
          </div>
          <div className="dock dock-md sm:w-1/2 m-auto h-18">
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

      <Spline
        scene="https://prod.spline.design/WXS2Z5qsrgWEAqOj/scene.splinecode"
        style={{ height: "100vh" }}
        onLoad={() => setLoading(false)}
      />
      <div className="fixed w-full h-18 bottom-0 right-0" data-theme={theme}>
        <BottomBar tabName={"Home"} />
      </div>
    </div>
  );
}

export default Home;
