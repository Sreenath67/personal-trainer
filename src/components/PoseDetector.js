import React, { useRef, useEffect, useState } from "react";
import * as posenet from "@tensorflow-models/posenet";
import "@tensorflow/tfjs";

const PoseDetector = ({ onPose }) => {
  const videoRef = useRef(null);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);

  useEffect(() => {
    let interval;
    
    async function setupCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { width: 640, height: 480 } 
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          
          // Wait for video metadata to load
          videoRef.current.onloadedmetadata = () => {
            videoRef.current.play();
            setIsVideoReady(true);
          };
        }
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    }

    async function loadPoseNet() {
      try {
        const net = await posenet.load();
        setIsModelLoaded(true);
        
        // Only start pose detection when both video and model are ready
        if (isVideoReady && isModelLoaded) {
          interval = setInterval(async () => {
            if (videoRef.current && 
                videoRef.current.readyState === 4 && // HAVE_ENOUGH_DATA
                videoRef.current.videoWidth > 0 && 
                videoRef.current.videoHeight > 0) {
              
              try {
                const pose = await net.estimateSinglePose(videoRef.current, {
                  flipHorizontal: false,
                });
                if (onPose) onPose(pose);
              } catch (error) {
                console.error("Error during pose estimation:", error);
              }
            }
          }, 100);
        }
      } catch (error) {
        console.error("Error loading PoseNet:", error);
      }
    }

    setupCamera();
    loadPoseNet();

    // Cleanup function
    return () => {
      if (interval) clearInterval(interval);
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, [onPose, isVideoReady, isModelLoaded]);

  return (
    <div>
      <video
        ref={videoRef}
        width="640"
        height="480"
        autoPlay
        muted
        playsInline
        style={{ transform: 'scaleX(-1)' }} // Mirror the video
      />
      <div>
        <p>Model Status: {isModelLoaded ? "✓ Loaded" : "⏳ Loading..."}</p>
        <p>Video Status: {isVideoReady ? "✓ Ready" : "⏳ Loading..."}</p>
      </div>
    </div>
  );
};

export default PoseDetector;

