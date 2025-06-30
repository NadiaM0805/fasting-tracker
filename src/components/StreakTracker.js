import React, { useState, useEffect } from 'react';

export default function StreakTracker() {
  const [streakData, setStreakData] = useState(() => {
    const saved = localStorage.getItem('streakData');
    return saved ? JSON.parse(saved) : {
      currentStreak: 0,
      longestStreak: 0,
      lastWorkoutDate: null,
      workoutDates: []
    };
  });

  useEffect(() => {
    // Update streak when component mounts
    updateStreak();
  }, []);

  const updateStreak = () => {
    const today = new Date().toISOString().split('T')[0];
    const lastWorkout = streakData.lastWorkoutDate;
    
    if (!lastWorkout) return;

    const lastWorkoutDate = new Date(lastWorkout);
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate - lastWorkoutDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // If more than 1 day has passed, reset streak
    if (diffDays > 1) {
      setStreakData(prev => ({
        ...prev,
        currentStreak: 0
      }));
    }
  };

  // Call this function when a workout is completed
  const recordWorkout = () => {
    const today = new Date().toISOString().split('T')[0];
    
    // Don't record multiple workouts on the same day
    if (streakData.workoutDates.includes(today)) return;

    const newStreak = streakData.lastWorkoutDate === yesterday() 
      ? streakData.currentStreak + 1 
      : 1;

    const newStreakData = {
      currentStreak: newStreak,
      longestStreak: Math.max(newStreak, streakData.longestStreak),
      lastWorkoutDate: today,
      workoutDates: [...streakData.workoutDates, today]
    };

    setStreakData(newStreakData);
    localStorage.setItem('streakData', JSON.stringify(newStreakData));
  };

  const yesterday = () => {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    return date.toISOString().split('T')[0];
  };

  const getLastWorkoutText = () => {
    if (!streakData.lastWorkoutDate) return 'No workouts recorded';
    
    const lastWorkout = new Date(streakData.lastWorkoutDate);
    const today = new Date();
    const diffTime = Math.abs(today - lastWorkout);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Last workout: Today';
    if (diffDays === 1) return 'Last workout: Yesterday';
    return `Last workout: ${diffDays} days ago`;
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="text-4xl font-bold text-blue-500 mb-2">
              {streakData.currentStreak}
            </div>
            <div className="text-sm text-gray-600">Current Streak 🔥</div>
          </div>

          <div className="bg-purple-50 rounded-lg p-4">
            <div className="text-4xl font-bold text-purple-500 mb-2">
              {streakData.longestStreak}
            </div>
            <div className="text-sm text-gray-600">Longest Streak 🏆</div>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <div className="text-4xl font-bold text-green-500 mb-2">
              {streakData.workoutDates.length}
            </div>
            <div className="text-sm text-gray-600">Total Workouts 💪</div>
          </div>
        </div>

        <div className="mt-6 text-center text-gray-600">
          {getLastWorkoutText()}
        </div>
      </div>

      {/* Monthly Calendar View */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">Workout Calendar</h2>
        <div className="grid grid-cols-7 gap-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-sm font-medium text-gray-500">
              {day}
            </div>
          ))}
          {generateCalendarDays().map((day, index) => (
            <div
              key={index}
              className={`aspect-square rounded-lg flex items-center justify-center text-sm ${
                day.isCurrentMonth
                  ? streakData.workoutDates.includes(day.date)
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100'
                  : 'bg-gray-50 text-gray-400'
              }`}
            >
              {day.dayOfMonth}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function generateCalendarDays() {
  const today = new Date();
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  
  const days = [];
  
  // Add days from previous month
  const firstDayOfWeek = firstDay.getDay();
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const date = new Date(firstDay);
    date.setDate(-i);
    days.push({
      date: date.toISOString().split('T')[0],
      dayOfMonth: date.getDate(),
      isCurrentMonth: false
    });
  }
  
  // Add days of current month
  for (let i = 1; i <= lastDay.getDate(); i++) {
    const date = new Date(today.getFullYear(), today.getMonth(), i);
    days.push({
      date: date.toISOString().split('T')[0],
      dayOfMonth: i,
      isCurrentMonth: true
    });
  }
  
  // Add days from next month
  const remainingDays = 42 - days.length; // 6 rows × 7 days
  for (let i = 1; i <= remainingDays; i++) {
    const date = new Date(lastDay);
    date.setDate(lastDay.getDate() + i);
    days.push({
      date: date.toISOString().split('T')[0],
      dayOfMonth: date.getDate(),
      isCurrentMonth: false
    });
  }
  
  return days;
} 