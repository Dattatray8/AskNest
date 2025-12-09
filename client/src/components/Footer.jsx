import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();

  const platformLinks = [
    { label: "Search Doubts", to: "/search" },
    { label: "Chat Room", to: "/chat" },
    { label: "Answer Feed", to: "/feed" },
  ];

  const featureList = [
    "Peer Collaboration",
    "AI Assistant",
    "Teacher Verification",
    "Spam Control",
  ];

  const aboutList = [
    "Contact Us",
    "Privacy Policy",
    "Terms of Service",
  ];

  return (
    <footer className="bg-base-300 text-base-content mb-18 sm:mb-0">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Brand / Description */}
        <aside>
          <div className="text-2xl font-bold text-primary mb-2">QuerySphere</div>
          <p className="text-sm text-base-content/80">
            Empowering students with spam-free, verified answers through
            collaborative learning and AI assistance.
          </p>
        </aside>

        {/* Platform Links */}
        <nav>
          <h6 className="footer-title">Platform</h6>
          <ul className="flex flex-col gap-2 mt-2">
            {platformLinks.map((item) => (
              <li key={item.label}>
                <button
                  className="link link-hover text-sm"
                  onClick={() => navigate(item.to)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Features */}
        <nav>
          <h6 className="footer-title">Features</h6>
          <ul className="flex flex-col gap-2 mt-2">
            {featureList.map((item) => (
              <li key={item} className="link link-hover text-sm">
                {item}
              </li>
            ))}
          </ul>
        </nav>

        {/* About */}
        <nav>
          <h6 className="footer-title">About</h6>
          <ul className="flex flex-col gap-2 mt-2">
            {aboutList.map((item) => (
              <li key={item} className="link link-hover text-sm">
                {item}
              </li>
            ))}
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
