import { useNavigate } from "react-router-dom";
import { topHighlights, heroCards } from "../constants/heroFeatures";
import toast from "react-hot-toast";
import handleFeedNavigation from "../utils/handleFeedNavigation";
import handleChatNavigation from "../utils/handleChatNavigation";
import SocketContext from "../context/SocketContext";
import useCurrentUser from "../hooks/auth/useCurrentUser";
import { useContext } from "react";

function Hero() {
  const { user } = useCurrentUser();
  const navigate = useNavigate();
  let { setIsLoginned } = useContext(SocketContext);

  return (
    <div className="min-h-screen bg-base-200 mt-16">
      {/* Hero Section */}
      <div className="hero min-h-[70vh] bg-linear-to-br from-primary/10 via-base-200 to-secondary/10">
        <div className="hero-content text-center">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Welcome to <span className="text-primary">QuerySphere</span>
            </h1>

            <p className="text-xl text-base-content/70 mb-8 leading-relaxed">
              Your institution's private doubt-solving ecosystem. Get instant
              answers through peer collaboration, AI assistance, and
              teacher-verified solutions.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="btn btn-primary btn-lg"
                onClick={() =>
                  handleChatNavigation({
                    user: user?._id,
                    setIsLoginned,
                    navigate,
                  })
                }
              >
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" />
                  Start Asking
                </span>
              </button>

              <button
                className="btn btn-outline btn-lg"
                onClick={() =>
                  handleFeedNavigation({
                    user: user?._id,
                    setIsLoginned,
                    navigate,
                  })
                }
              >
                Explore Feed
              </button>
            </div>

            {/* Top Highlight Boxes */}
            <div className="flex flex-wrap gap-6 justify-center mt-12">
              {topHighlights.map(({ title, subtitle, icon: Icon, color }) => (
                <div
                  key={title}
                  className="flex items-center gap-3 bg-base-100 px-6 py-4 rounded-lg shadow-lg"
                >
                  <Icon className={`w-8 h-8 ${color}`} />
                  <div className="text-left">
                    <div className="text-sm text-base-content/60">
                      {subtitle}
                    </div>
                    <div className="font-bold text-lg">{title}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why QuerySphere?</h2>
            <p className="text-xl text-base-content/70">
              A complete solution for academic doubt resolution
            </p>
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {heroCards.map(({ title, desc, icon: Icon, bg, color }) => (
              <div
                key={title}
                className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow"
              >
                <div className="card-body items-center text-center">
                  <div className={`${bg} p-4 rounded-full mb-4`}>
                    <Icon className={`w-8 h-8 ${color}`} />
                  </div>

                  <h3 className="card-title">{title}</h3>
                  <p className="text-base-content/70">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-linear-to-r from-primary to-secondary py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-primary-content mb-4">
            Ready to Transform Your Learning?
          </h2>
          <p className="text-xl text-primary-content/80 mb-8">
            Join your institution's private Q&A network today
          </p>
          <button
            className="btn btn-lg bg-base-100 text-primary hover:bg-base-200"
            onClick={() => {
              if (!user) return navigate("/login");
              toast.success("Welcome back! You are already logged in");
              navigate("/feed");
            }}
          >
            Get Started Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
