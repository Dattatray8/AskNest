import { useNavigate } from "react-router-dom";
import {
  MessageSquare,
  Users,
  CheckCircle,
  Zap,
  Shield,
  Bot,
} from "lucide-react";

function Hero() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-base-200 mt-16">
      <div className="hero min-h-[70vh] bg-gradient-to-br from-primary/10 via-base-200 to-secondary/10">
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
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="btn btn-primary btn-lg"
                onClick={() => navigate("/chat")}
              >
                <MessageSquare className="w-5 h-5" />
                Start Asking
              </button>
              <button
                className="btn btn-outline btn-lg"
                onClick={() => navigate("/feed")}
              >
                Explore Feed
              </button>
            </div>

            <div className="flex flex-wrap gap-6 justify-center mt-12">
              <div className="flex items-center gap-3 bg-base-100 px-6 py-4 rounded-lg shadow-lg">
                <Shield className="w-8 h-8 text-primary" />
                <div className="text-left">
                  <div className="text-sm text-base-content/60">Real-time</div>
                  <div className="font-bold text-lg">Spam-Free</div>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-base-100 px-6 py-4 rounded-lg shadow-lg">
                <Zap className="w-8 h-8 text-secondary" />
                <div className="text-left">
                  <div className="text-sm text-base-content/60">Instant</div>
                  <div className="font-bold text-lg">AI Help</div>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-base-100 px-6 py-4 rounded-lg shadow-lg">
                <CheckCircle className="w-8 h-8 text-accent" />
                <div className="text-left">
                  <div className="text-sm text-base-content/60">Private</div>
                  <div className="font-bold text-lg">Institution</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why QuerySphere?</h2>
            <p className="text-xl text-base-content/70">
              A complete solution for academic doubt resolution
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
              <div className="card-body items-center text-center">
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="card-title">Peer Collaboration</h3>
                <p className="text-base-content/70">
                  Connect with classmates and help each other learn. Build a
                  supportive academic community.
                </p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
              <div className="card-body items-center text-center">
                <div className="bg-secondary/10 p-4 rounded-full mb-4">
                  <Bot className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="card-title">AI-Powered</h3>
                <p className="text-base-content/70">
                  Instant AI fallback with @ai trigger. Get immediate help when
                  peers are unavailable.
                </p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
              <div className="card-body items-center text-center">
                <div className="bg-accent/10 p-4 rounded-full mb-4">
                  <CheckCircle className="w-8 h-8 text-accent" />
                </div>
                <h3 className="card-title">Teacher Verified</h3>
                <p className="text-base-content/70">
                  Answers verified by teachers for accuracy and credibility you
                  can trust.
                </p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
              <div className="card-body items-center text-center">
                <div className="bg-success/10 p-4 rounded-full mb-4">
                  <Shield className="w-8 h-8 text-success" />
                </div>
                <h3 className="card-title">Spam Control</h3>
                <p className="text-base-content/70">
                  Advanced flagging, moderation, and ban system keeps
                  discussions relevant and safe.
                </p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
              <div className="card-body items-center text-center">
                <div className="bg-warning/10 p-4 rounded-full mb-4">
                  <MessageSquare className="w-8 h-8 text-warning" />
                </div>
                <h3 className="card-title">Real-Time Chat</h3>
                <p className="text-base-content/70">
                  Socket.IO powered instant messaging for seamless, live doubt
                  resolution.
                </p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
              <div className="card-body items-center text-center">
                <div className="bg-info/10 p-4 rounded-full mb-4">
                  <Zap className="w-8 h-8 text-info" />
                </div>
                <h3 className="card-title">Institution Private</h3>
                <p className="text-base-content/70">
                  Your college's own network. Safe, secure, and accessible only
                  to verified students and teachers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-primary to-secondary py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-primary-content mb-4">
            Ready to Transform Your Learning?
          </h2>
          <p className="text-xl text-primary-content/80 mb-8">
            Join your institution's private Q&A network today
          </p>
          <button
            className="btn btn-lg bg-base-100 text-primary hover:bg-base-200"
            onClick={() => navigate("/login")}
          >
            Get Started Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
