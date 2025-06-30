import React from 'react';
import DailyGreeting from './DailyGreeting';
import FastingTimer from './FastingTimer';

const WorkoutLibrary = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <DailyGreeting />
      <FastingTimer />
    </div>
  );
};

export default WorkoutLibrary; 