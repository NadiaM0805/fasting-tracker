import React, { useState } from 'react';
import './App.css';
import Navigation from './components/Navigation';
import GymEquipment from './components/GymEquipment';
import WorkoutLibrary from './components/WorkoutLibrary';
import ProgressTracker from './components/ProgressTracker';
import Achievements from './components/Achievements';
import PasswordProtection from './components/PasswordProtection';
import PilatesLogger from './components/PilatesLogger';
import MachineGuide from './components/MachineGuide';
import FastingTimer from './components/FastingTimer';
import { Routes, Route } from 'react-router-dom';

function App() {
  // Simple state just to trigger re-renders
  const [, forceUpdate] = useState(0);

  return (
    <PasswordProtection>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-7xl mx-auto">
          <Routes>
            <Route path="/" element={
              <>
                <FastingTimer forceUpdate={() => forceUpdate(n => n + 1)} />
                <WorkoutLibrary />
              </>
            } />
            <Route path="/progress" element={<ProgressTracker />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/gym" element={<GymEquipment />} />
            <Route path="/pilates" element={<PilatesLogger />} />
            <Route path="/machines" element={<MachineGuide />} />
            <Route path="/fasting" element={
              <FastingTimer forceUpdate={() => forceUpdate(n => n + 1)} />
            } />
          </Routes>
        </div>
      </div>
    </PasswordProtection>
  );
}

export default App; 