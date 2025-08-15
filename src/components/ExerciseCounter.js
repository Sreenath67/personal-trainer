// src/components/ExerciseCounter.js
import React, { useEffect, useState } from "react";
import { getAngle } from "../utils/angleutils";

function ExerciseCounter({ pose }) {
  const [count, setCount] = useState(0);
  const [state, setState] = useState("down"); // Possible values: "down", "up"

  useEffect(() => {
    if (!pose) return;
    // PoseNet keypoints: leftShoulder(5), leftElbow(7), leftWrist(9)
    const leftShoulder = pose.keypoints[5].position;
    const leftElbow = pose.keypoints[7].position;
    const leftWrist = pose.keypoints[9].position;
    const angle = getAngle(leftShoulder, leftElbow, leftWrist);

    // Paper logic: Down >160°, Up <30°
    if (angle > 160 && state === "up") {
      setState("down");
    } else if (angle < 30 && state === "down") {
      setState("up");
      setCount(c => c + 1);
    }
  }, [pose, state]);

  return (
    <div>
      <h2>Reps: {count}</h2>
    </div>
  );
}

export default ExerciseCounter;
