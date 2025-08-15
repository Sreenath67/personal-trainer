import React, { useRef, useEffect } from "react";
import * as posenet from "@tensorflow-models/posenet";
import "@tensorflow/tfjs";

const PoseDetector = ({ onPose }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    async function setupCamera() {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    }
    setupCamera();

    const runPoseNet = async () => {
      const net = await posenet.load();
      setInterval(async () => {
        if (videoRef.current) {
          const pose = await net.estimateSinglePose(videoRef.current, {
            flipHorizontal: false,
          });
          if (onPose) onPose(pose);
        }
      }, 100); // every 100ms
    };
    runPoseNet();
  }, [onPose]);

  return (
    <div>
      <video ref={videoRef} width="640" height="480" autoPlay muted />
    </div>
  );
};

export default PoseDetector;
