import { useState } from "react";
import Spline from "@splinetool/react-spline";
import Navbar from "../components/Navbar";
import BottomBar from "../components/BottomBar";

function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative">
      <Navbar />
      <div
        className={`absolute inset-0 flex items-center justify-center bg-white z-10 transition-opacity duration-700 ${
          loading ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <p className="">Loading 3D scene...</p>
      </div>

      <Spline
        scene="https://prod.spline.design/WXS2Z5qsrgWEAqOj/scene.splinecode"
        style={{ height: "100vh" }}
        onLoad={() => setLoading(false)}
      />
      <BottomBar tabName={"Home"} />
    </div>
  );
}

export default Home;
