import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";
import PoseDetector from "./components/PoseDetector";
import ExerciseCounter from "./components/ExerciseCounter";

function App() {
  const [pose, setPose] = useState(null);

  return (
    <div>
      <h1>Personal Trainer App</h1>
      <PoseDetector onPose={setPose} />
      <ExerciseCounter pose={pose} />
    </div>
  );
}

export default App;

