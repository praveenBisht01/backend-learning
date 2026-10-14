import { Link } from "react-router-dom";
import "../style/auth.scss";

export default function Welcome() {
  return (
    <main className="auth-page">
      <section className="auth-card welcome-card">
        <span className="eyebrow">AI VISION PROJECT</span>
        <h1>FaceSense</h1>

        <p>
          Explore facial movements with real-time webcam analysis powered by
          Google MediaPipe.
        </p>

        <div className="auth-actions">
          <Link className="primary-btn" to="/login">
            Get Started
          </Link>

          <Link className="secondary-btn" to="/register">
            Create Account
          </Link>
        </div>
      </section>
    </main>
  );
}
