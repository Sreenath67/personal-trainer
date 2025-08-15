import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";
import PoseDetector from "./components/PoseDetector";

function App() {
  const [pose, setPose] = useState(null);

  return (
    <div>
      <h1>Personal Trainer App</h1>
      <PoseDetector onPose={setPose} />
      {/* Here you can display pose data or pass it to other components */}
    </div>
  );
}

export default App;

