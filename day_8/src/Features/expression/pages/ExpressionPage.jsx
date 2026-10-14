import { useAuth } from "../../auth/hooks/useAuth.js";
import { useFaceExpression } from "../hooks/useFaceExpression.js";
import "../styles/expression.scss";

export default function ExpressionPage() {
  const { user, handleLogout } = useAuth();

  const {
    videoRef,
    modelReady,
    cameraOn,
    status,
    data,
    error,
    startCamera,
    stopCamera,
  } = useFaceExpression();

  const movementNames = [
    ["mouthSmileLeft", "Left smile"],
    ["mouthSmileRight", "Right smile"],
    ["mouthFrownLeft", "Left frown"],
    ["mouthFrownRight", "Right frown"],
    ["jawOpen", "Jaw opening"],
    ["eyeBlinkLeft", "Left eye blink"],
    ["eyeBlinkRight", "Right eye blink"],
    ["browInnerUp", "Inner brow raised"],
  ];

  return (
    <main className="expression-page">
      <header className="expression-header">
        <div>
          <span className="expression-eyebrow">MEDIAPIPE · AI VISION</span>

          <h1>FaceSense</h1>

          <p>Live facial movement analysis</p>
        </div>

        <button
          className="logout-btn"
          onClick={() => {
            stopCamera();
            handleLogout();
            window.location.assign("/login");
          }}
        >
          Logout
        </button>
      </header>

      <section className="expression-layout">
        <div className="camera-card">
          <div className="card-heading">
            <h2>Live camera</h2>
            <span className={cameraOn ? "live-dot" : "idle-dot"}>
              {cameraOn ? "LIVE" : "OFF"}
            </span>
          </div>

          <div className="video-container">
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="webcam-video"
            />

            {!cameraOn && (
              <div className="camera-placeholder">
                <span className="camera-icon">◎</span>
                <p>Start the camera to begin</p>
              </div>
            )}
          </div>

          <p className="status-text">{status}</p>

          <div className="camera-actions">
            <button
              className="start-btn"
              onClick={startCamera}
              disabled={!modelReady || cameraOn}
            >
              {modelReady ? "Start Camera" : "Loading Model..."}
            </button>

            <button
              className="stop-btn"
              onClick={stopCamera}
              disabled={!cameraOn}
            >
              Stop Camera
            </button>
          </div>

          {error && <p className="expression-error">{error}</p>}
        </div>

        <aside className="results-card">
          <span className="expression-eyebrow">DETECTION RESULT</span>

          <h2>Facial movements</h2>

          <div className="result-label">
            <span>{data.faceDetected ? "●" : "○"}</span>
            {data.expression}
          </div>

          <p className="result-note">
            {data.faceDetected
              ? "Movement scores are estimated by MediaPipe."
              : "Position your face in front of the camera."}
          </p>

          <div className="movement-list">
            {movementNames.map(([key, label]) => {
              const score = data.scores[key] ?? 0;
              const percentage = Math.round(score * 100);

              return (
                <div className="movement-item" key={key}>
                  <div className="movement-label">
                    <span>{label}</span>
                    <span>{percentage}%</span>
                  </div>

                  <div className="score-track">
                    <div
                      className="score-fill"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <p className="privacy-note">
            Webcam frames are processed in your browser and are not uploaded by
            this feature.
          </p>

          {user && (
            <p className="user-note">
              Signed in as{" "}
              {user.Username ?? user.username ?? user.email ?? "User"}
            </p>
          )}
        </aside>
      </section>
    </main>
  );
}
