import React, { useState, useEffect } from 'react';

export default function FastingTimer({ forceUpdate }) {
  const [fastHistory, setFastHistory] = useState(() => {
    const saved = localStorage.getItem('fastHistory');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    // Update the timer every second if we're fasting
    const isFasting = localStorage.getItem('isFasting') === 'true';
    if (isFasting) {
      const interval = setInterval(() => {
        forceUpdate();
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [forceUpdate]);

  const getTimerState = () => {
    const isFasting = localStorage.getItem('isFasting') === 'true';
    const startTime = localStorage.getItem('fastingStartTime');
    return {
      isFasting,
      startTime: startTime ? parseInt(startTime) : null,
      currentTime: Date.now()
    };
  };

  const formatTime = ms => {
    const totalSec = Math.floor(ms / 1000);
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startFast = () => {
    const now = Date.now();
    localStorage.setItem('isFasting', 'true');
    localStorage.setItem('fastingStartTime', now.toString());
    forceUpdate();
  };

  const endFast = () => {
    const now = Date.now();
    const startTime = parseInt(localStorage.getItem('fastingStartTime'));
    const fastDuration = now - startTime;

    // Create new log entry
    const newLog = {
      id: now,
      start: new Date(startTime).toLocaleString(),
      end: new Date(now).toLocaleString(),
      duration: formatTime(fastDuration),
      durationMs: fastDuration
    };

    // Update history
    const updated = [newLog, ...fastHistory];
    setFastHistory(updated);
    localStorage.setItem('fastHistory', JSON.stringify(updated));

    // Clear fasting state
    localStorage.setItem('isFasting', 'false');
    localStorage.removeItem('fastingStartTime');
    forceUpdate();
  };

  const { isFasting, startTime, currentTime } = getTimerState();
  const currentDuration = isFasting && startTime ? currentTime - startTime : 0;

  const getLongestFast = () => {
    if (fastHistory.length === 0) return '0h 0m';
    const longestDuration = Math.max(...fastHistory.map(f => f.durationMs || 0));
    const hours = Math.floor(longestDuration / (1000 * 60 * 60));
    const minutes = Math.floor((longestDuration % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Intermittent Fasting
        </h1>

        <div className="mb-8">
          {isFasting ? (
            <div>
              <div className="text-6xl font-bold text-blue-500 mb-4">
                {formatTime(currentDuration)}
              </div>
              <p className="text-lg text-gray-600 mb-6">
                Current Fast Duration
              </p>
              <button
                onClick={endFast}
                className="bg-red-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-red-600 transition-colors"
              >
                End Fast
              </button>
            </div>
          ) : (
            <div>
              <div className="text-6xl font-bold text-gray-300 mb-4">
                00:00:00
              </div>
              <p className="text-lg text-gray-600 mb-6">
                Ready to start fasting?
              </p>
              <button
                onClick={startFast}
                className="bg-blue-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-600 transition-colors"
              >
                Start Fast
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="text-2xl font-bold text-gray-900">
              {fastHistory.length}
            </div>
            <div className="text-sm text-gray-600">
              Total Fasts
            </div>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="text-2xl font-bold text-gray-900">
              {fastHistory[0]?.duration || '0h 0m'}
            </div>
            <div className="text-sm text-gray-600">
              Last Fast
            </div>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="text-2xl font-bold text-gray-900">
              {getLongestFast()}
            </div>
            <div className="text-sm text-gray-600">
              Longest Fast
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Fasting History
        </h2>
        <div className="space-y-4">
          {fastHistory.map(fast => (
            <div key={fast.id} className="border-b pb-4">
              <div className="flex justify-between items-start mb-2">
                <div className="font-semibold text-gray-900">
                  {fast.duration}
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(fast.start).toLocaleDateString()}
                </div>
              </div>
              <div className="text-sm text-gray-600">
                {new Date(fast.start).toLocaleTimeString()} - {new Date(fast.end).toLocaleTimeString()}
              </div>
            </div>
          ))}
          {fastHistory.length === 0 && (
            <div className="text-center text-gray-500 py-4">
              No fasting history yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 