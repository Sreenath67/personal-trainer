// src/components/ExerciseCounter.js
import React, { useEffect, useState } from "react";
import { getAngle } from "../utils/angleutils";

function ExerciseCounter({ pose, exerciseType = "bicep_curl" }) {
  const [count, setCount] = useState(0);
  const [state, setState] = useState("down");
  const [currentAngle, setCurrentAngle] = useState(0);
  const [formMessage, setFormMessage] = useState("Start exercising!");

  useEffect(() => {
    if (!pose || !pose.keypoints) return;

    const keypoints = pose.keypoints;
    
    // Check if required keypoints are detected with sufficient confidence
    const leftShoulder = keypoints[5];
    const leftElbow = keypoints[7];
    const leftWrist = keypoints[9];
    const rightShoulder = keypoints[6];
    const rightElbow = keypoints[8];
    const rightWrist = keypoints[10];

    if (leftShoulder.score < 0.5 || leftElbow.score < 0.5 || leftWrist.score < 0.5) {
      setFormMessage("Position yourself so your arms are visible");
      return;
    }

    // Calculate angles for bicep curl 
    const leftAngle = getAngle(leftShoulder.position, leftElbow.position, leftWrist.position);
    const rightAngle = getAngle(rightShoulder.position, rightElbow.position, rightWrist.position);
    
    setCurrentAngle(Math.round(leftAngle));

    // Form correction logic
    const angleDifference = Math.abs(leftAngle - rightAngle);
    if (angleDifference > 30) {
      setFormMessage("Correct your form!");
    } else {
      setFormMessage("Good form!");
    }

    // Rep counting logic Down >160°, Up <30°
    if (leftAngle > 160 && state === "up") {
      setState("down");
    } else if (leftAngle < 30 && state === "down") {
      setState("up");
      setCount(prevCount => prevCount + 1);
    }
      if (props.onUpdate) {
    props.onUpdate(count, formMessage, currentAngle);
  }
}, [pose, state, count, formMessage, currentAngle]);

  return (
    <div style={{ 
      padding: "20px", 
      backgroundColor: "#f0f0f0", 
      borderRadius: "10px", 
      margin: "20px" 
    }}>
      <h2>Bicep Curl Counter</h2>
      <div style={{ fontSize: "24px", fontWeight: "bold", margin: "10px 0" }}>
        Reps: {count}
      </div>
      <div style={{ fontSize: "18px", margin: "10px 0" }}>
        Left Arm Angle: {currentAngle}°
      </div>
      <div style={{ fontSize: "18px", margin: "10px 0" }}>
        State: {state}
      </div>
      <div style={{ 
        fontSize: "20px", 
        fontWeight: "bold",
        color: formMessage === "Good form!" ? "green" : "red",
        margin: "10px 0" 
      }}>
        {formMessage}
      </div>
    </div>
  );
}

export default ExerciseCounter;
