import React from 'react';
import { motivationalGreetings } from '../data/motivationalGreetings';

const DailyGreeting = () => {
  // Get a consistent greeting for the entire day based on the date
  const getDailyGreeting = () => {
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    const greetingIndex = dayOfYear % motivationalGreetings.length;
    return motivationalGreetings[greetingIndex];
  };

  return (
    <div className="text-center py-8 px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Hello Nadia
      </h1>
      <p className="text-xl text-gray-600 italic">
        {getDailyGreeting()}
      </p>
    </div>
  );
};

export default DailyGreeting; 