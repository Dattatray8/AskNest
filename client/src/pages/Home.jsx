import { useState } from "react";
import Spline from "@splinetool/react-spline";

function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="w-full min-h-[100px] overflow-x-hidden relative">
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
      <div className="fixed bottom-0 w-full bg-white h-13"></div>
    </div>
  );
}

export default Home;
