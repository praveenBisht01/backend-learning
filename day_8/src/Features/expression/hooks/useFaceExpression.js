import { useEffect, useRef, useState } from "react";
import {
  createFaceLandmarker,
  analyzeFace,
} from "../services/mediapipe.service";

export function useFaceExpression() {
  const videoRef = useRef(null);
  const detectorRef = useRef(null);
  const streamRef = useRef(null);
  const animationRef = useRef(null);
  const lastVideoTimeRef = useRef(-1);

  const [modelReady, setModelReady] = useState(false);
  const [cameraOn, setCameraOn] = useState(false);
  const [status, setStatus] = useState("Loading model...");
  const [data, setData] = useState({
    faceDetected: false,
    expression: "Waiting for camera",
    scores: {},
  });
  const [error, setError] = useState("");

  // Load MediaPipe once
  useEffect(() => {
    let active = true;
    let detector;

    async function initialize() {
      try {
        detector = await createFaceLandmarker();

        if (!active) {
          detector.close();
          return;
        }

        detectorRef.current = detector;
        setModelReady(true);
        setStatus("Model ready");
      } catch (err) {
        console.error(err);

        if (active) {
          setError(
            "Unable to load MediaPipe. Check the model file and internet connection.",
          );
          setStatus("Model failed to load");
        }
      }
    }

    initialize();

    return () => {
      active = false;
      cancelAnimationFrame(animationRef.current);

      streamRef.current?.getTracks().forEach((track) => {
        track.stop();
      });

      detector?.close();
      detectorRef.current = null;
    };
  }, []);

  // Analyze video frames while the camera is on
  useEffect(() => {
    if (!cameraOn) return;

    let active = true;

    function detectFrame() {
      if (!active) return;

      const video = videoRef.current;
      const detector = detectorRef.current;

      if (
        video &&
        detector &&
        video.readyState >= 2 &&
        video.currentTime !== lastVideoTimeRef.current
      ) {
        lastVideoTimeRef.current = video.currentTime;

        try {
          const result = analyzeFace(detector, video);
          setData(result);
        } catch (err) {
          console.error(err);
          setError("Face detection failed.");
        }
      }

      animationRef.current = requestAnimationFrame(detectFrame);
    }

    detectFrame();

    return () => {
      active = false;
      cancelAnimationFrame(animationRef.current);
    };
  }, [cameraOn]);

  async function startCamera() {
    try {
      setError("");

      if (!detectorRef.current) {
        setError("Please wait for the model to load.");
        return;
      }

      if (!navigator.mediaDevices?.getUserMedia) {
        setError("Camera requires HTTPS or localhost.");
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
        },
        audio: false,
      });

      streamRef.current = stream;

      if (!videoRef.current) {
        stream.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
        return;
      }

      videoRef.current.srcObject = stream;
      await videoRef.current.play();

      lastVideoTimeRef.current = -1;
      setCameraOn(true);
      setStatus("Camera running");
    } catch (err) {
      console.error(err);
      setError("Could not access the webcam. Check browser permissions.");
      setStatus("Camera unavailable");
    }
  }

  function stopCamera() {
    setCameraOn(false);
    cancelAnimationFrame(animationRef.current);

    streamRef.current?.getTracks().forEach((track) => {
      track.stop();
    });

    streamRef.current = null;

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setData({
      faceDetected: false,
      expression: "Camera stopped",
      scores: {},
    });

    setStatus("Camera stopped");
  }

  return {
    videoRef,
    modelReady,
    cameraOn,
    status,
    data,
    error,
    startCamera,
    stopCamera,
  };
}
