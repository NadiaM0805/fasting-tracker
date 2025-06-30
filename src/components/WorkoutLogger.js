import React, { useState, useEffect } from 'react';

export default function WorkoutLogger({ selectedWorkout }) {
  const [workoutLogs, setWorkoutLogs] = useState(() => {
    const saved = localStorage.getItem('workoutLogs');
    return saved ? JSON.parse(saved) : [];
  });

  const [lastWorkoutDate, setLastWorkoutDate] = useState(() => {
    const saved = localStorage.getItem('lastWorkoutDate');
    return saved || null;
  });

  const [mood, setMood] = useState('');
  const [notes, setNotes] = useState('');
  const [energyLevel, setEnergyLevel] = useState(5);

  const moodOptions = ['😊 Great', '😌 Good', '😐 Okay', '😓 Tired', '😫 Exhausted'];

  const handleLogWorkout = () => {
    const now = new Date();
    const newLog = {
      id: Date.now(),
      date: now.toLocaleString(),
      timestamp: now.getTime(),
      workoutName: selectedWorkout.name,
      exercises: selectedWorkout.exercises.map(ex => ({
        name: ex.name,
        sets: ex.sets,
        reps: ex.reps,
      })),
      mood,
      energyLevel,
      notes,
    };

    const updatedLogs = [newLog, ...workoutLogs];
    setWorkoutLogs(updatedLogs);
    setLastWorkoutDate(now.toLocaleString());
    
    localStorage.setItem('workoutLogs', JSON.stringify(updatedLogs));
    localStorage.setItem('lastWorkoutDate', now.toLocaleString());

    // Reset form
    setMood('');
    setNotes('');
    setEnergyLevel(5);
  };

  const deleteLog = (logId) => {
    const updatedLogs = workoutLogs.filter(log => log.id !== logId);
    setWorkoutLogs(updatedLogs);
    localStorage.setItem('workoutLogs', JSON.stringify(updatedLogs));
    
    // Update last workout date to the most recent remaining log
    if (updatedLogs.length > 0) {
      const lastLog = updatedLogs[0];
      setLastWorkoutDate(lastLog.date);
      localStorage.setItem('lastWorkoutDate', lastLog.date);
    } else {
      setLastWorkoutDate(null);
      localStorage.removeItem('lastWorkoutDate');
    }
  };

  // Add a section to show time since last workout
  const getTimeSinceLastWorkout = () => {
    if (!lastWorkoutDate) return null;
    
    const lastDate = new Date(lastWorkoutDate);
    const now = new Date();
    const diffHours = Math.floor((now - lastDate) / (1000 * 60 * 60));
    
    if (diffHours < 24) {
      return `${diffHours} hours ago`;
    } else {
      const diffDays = Math.floor(diffHours / 24);
      return `${diffDays} days ago`;
    }
  };

  return (
    <div className="space-y-6">
      {/* Last Workout Info */}
      {lastWorkoutDate && (
        <div className="bg-blue-50 rounded-xl p-4 text-blue-800">
          <p className="font-medium">Last workout: {getTimeSinceLastWorkout()}</p>
        </div>
      )}

      {/* Logging Form */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">Log Your Workout</h2>
        
        {/* Mood Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            How do you feel after the workout?
          </label>
          <div className="flex gap-2 flex-wrap">
            {moodOptions.map((option) => (
              <button
                key={option}
                onClick={() => setMood(option)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  mood === option
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Energy Level Slider */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Energy Level (1-10)
          </label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="1"
              max="10"
              value={energyLevel}
              onChange={(e) => setEnergyLevel(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-lg font-semibold">{energyLevel}</span>
          </div>
        </div>

        {/* Notes */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Workout Notes
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="How was the workout? Any achievements or challenges?"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
          />
        </div>

        {/* Log Button */}
        <button
          onClick={handleLogWorkout}
          disabled={!selectedWorkout || !mood}
          className={`w-full py-2 rounded-lg font-semibold ${
            selectedWorkout && mood
              ? 'bg-blue-500 hover:bg-blue-600 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Log Workout
        </button>
      </div>

      {/* Workout History */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">Workout History</h2>
        <div className="space-y-4">
          {workoutLogs.map((log) => (
            <div key={log.id} className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold">{log.workoutName}</h3>
                  <p className="text-sm text-gray-500">{log.date}</p>
                </div>
                <button
                  onClick={() => deleteLog(log.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  ✕
                </button>
              </div>
              <div className="text-sm text-gray-600 mb-2">
                Mood: {log.mood} | Energy Level: {log.energyLevel}/10
              </div>
              {log.notes && (
                <div className="text-sm bg-white p-3 rounded">
                  {log.notes}
                </div>
              )}
              <div className="mt-2 text-sm text-gray-500">
                <strong>Exercises:</strong>
                <ul className="list-disc list-inside">
                  {log.exercises.map((ex, idx) => (
                    <li key={idx}>
                      {ex.name}: {ex.sets} sets × {ex.reps}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
          {workoutLogs.length === 0 && (
            <div className="text-center text-gray-500 py-4">
              No workouts logged yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 