import { Link } from "react-router";
import { MessageCircle } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen dark bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <MessageCircle className="w-4 h-4 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold text-foreground">Whisper Stone</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
            >
              Sign up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Connect, Share, <span className="text-primary">Whisper</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join a modern broadcast chat experience where everyone can see and
              hear each other. Real-time conversations, connected community.
            </p>
            <div className="flex gap-4">
              <Link
                to="/signup"
                className="px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="px-8 py-3 rounded-lg border border-border text-foreground font-semibold hover:bg-secondary transition-colors"
              >
                Log In
              </Link>
            </div>
          </div>
          <div className="rounded-xl overflow-hidden">
            <img src="/message.png" alt="message illustration" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
