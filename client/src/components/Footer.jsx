import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-base-300 text-base-content mb-18 sm:mb-0">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <aside>
          <div className="text-2xl font-bold text-primary mb-2">
            QuerySphere
          </div>
          <p className="text-sm text-base-content/80">
            Empowering students with spam-free, verified answers through
            collaborative learning and AI assistance.
          </p>
          <p className="text-xs text-base-content/60 mt-3">
            Smart India Hackathon 2025
          </p>
        </aside>

        <nav>
          <h6 className="footer-title">Platform</h6>
          <ul className="flex flex-col gap-2 mt-2">
            <li>
              <button
                className="link link-hover text-sm"
                onClick={() => navigate("/search")}
              >
                Search Doubts
              </button>
            </li>
            <li>
              <button
                className="link link-hover text-sm"
                onClick={() => navigate("/chat")}
              >
                Chat Room
              </button>
            </li>
            <li>
              <button
                className="link link-hover text-sm"
                onClick={() => navigate("/feed")}
              >
                Answer Feed
              </button>
            </li>
          </ul>
        </nav>

        <nav>
          <h6 className="footer-title">Features</h6>
          <ul className="flex flex-col gap-2 mt-2">
            <li className="link link-hover text-sm">Peer Collaboration</li>
            <li className="link link-hover text-sm">AI Assistant</li>
            <li className="link link-hover text-sm">Teacher Verification</li>
            <li className="link link-hover text-sm">Spam Control</li>
          </ul>
        </nav>

        <nav>
          <h6 className="footer-title">About</h6>
          <ul className="flex flex-col gap-2 mt-2">
            <li className="link link-hover text-sm">Team AskNest</li>
            <li className="link link-hover text-sm">Contact Us</li>
            <li className="link link-hover text-sm">Privacy Policy</li>
            <li className="link link-hover text-sm">Terms of Service</li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-base-content/10">
        <div className="footer footer-center py-4 text-sm">
          <p>© 2025 QuerySphere. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
