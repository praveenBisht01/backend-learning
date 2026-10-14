import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

export async function createFaceLandmarker() {
  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm",
  );

  return FaceLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath: "/models/face_landmarker.task",
    },
    runningMode: "VIDEO",
    numFaces: 1,
    outputFaceBlendshapes: true,
  });
}

export function analyzeFace(detector, video) {
  const output = detector.detectForVideo(video, performance.now());

  if (!output.faceLandmarks?.length) {
    return {
      faceDetected: false,
      expression: "No face detected",
      scores: {},
    };
  }

  const categories = output.faceBlendshapes?.[0]?.categories ?? [];

  const scores = Object.fromEntries(
    categories.map(({ categoryName, score }) => [categoryName, score]),
  );

  const smile =
    ((scores.mouthSmileLeft ?? 0) + (scores.mouthSmileRight ?? 0)) / 2;

  const frown =
    ((scores.mouthFrownLeft ?? 0) + (scores.mouthFrownRight ?? 0)) / 2;

  const jawOpen = scores.jawOpen ?? 0;

  let expression = "No strong movement detected";

  if (smile > 0.5) {
    expression = "Smile-related movement";
  } else if (frown > 0.5) {
    expression = "Frown-related movement";
  } else if (jawOpen > 0.7) {
    expression = "Mouth open";
  }

  return {
    faceDetected: true,
    expression,
    scores,
  };
}
