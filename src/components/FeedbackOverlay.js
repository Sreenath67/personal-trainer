// src/components/FeedbackOverlay.js
import React from "react";

const FeedbackOverlay = ({ message, repCount, angle, isGoodForm }) => {
  return (
    <div style={{
      position: 'absolute',
      top: '20px',
      left: '20px',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      color: 'white',
      padding: '15px',
      borderRadius: '10px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>
        REPS: {repCount}
      </div>
      <div style={{ fontSize: '16px', marginBottom: '5px' }}>
        Angle: {angle}°
      </div>
      <div style={{ 
        fontSize: '18px', 
        fontWeight: 'bold',
        color: isGoodForm ? '#00ff00' : '#ff0000'
      }}>
        {message}
      </div>
    </div>
  );
};

export default FeedbackOverlay;
