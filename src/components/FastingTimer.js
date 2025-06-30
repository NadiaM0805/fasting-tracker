import React, { useState, useEffect } from 'react';

export default function FastingTimer() {
  const [startTime, setStartTime] = useState(() => {
    const saved = localStorage.getItem('fastingStartTime');
    return saved ? parseInt(saved) : null;
  });
  const [endTime, setEndTime] = useState(null);
  const [isFasting, setIsFasting] = useState(() => {
    return localStorage.getItem('isFasting') === 'true';
  });
  const [duration, setDuration] = useState(() => {
    if (startTime && localStorage.getItem('isFasting') === 'true') {
      return Date.now() - startTime;
    }
    return 0;
  });
  const [fastHistory, setFastHistory] = useState(() => {
    const saved = localStorage.getItem('fastHistory');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    let timer;
    if (isFasting && startTime) {
      timer = setInterval(() => {
        const newDuration = Date.now() - startTime;
        setDuration(newDuration);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isFasting, startTime]);

  useEffect(() => {
    if (startTime) {
      localStorage.setItem('fastingStartTime', startTime.toString());
    } else {
      localStorage.removeItem('fastingStartTime');
    }
    localStorage.setItem('isFasting', isFasting.toString());
  }, [startTime, isFasting]);

  const formatTime = ms => {
    const totalSec = Math.floor(ms / 1000);
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startFast = () => {
    const now = Date.now();
    setStartTime(now);
    setIsFasting(true);
  };

  const endFast = () => {
    const now = Date.now();
    setEndTime(now);
    setIsFasting(false);
    const fastDuration = now - startTime;
    const newLog = {
      id: Date.now(),
      start: new Date(startTime).toLocaleString(),
      end: new Date(now).toLocaleString(),
      duration: formatTime(fastDuration),
    };
    const updated = [newLog, ...fastHistory];
    setFastHistory(updated);
    localStorage.setItem('fastHistory', JSON.stringify(updated));
    setStartTime(null);
    setDuration(0);
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
                {formatTime(duration)}
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
              {fastHistory.length > 0
                ? Math.max(...fastHistory.map(f => {
                    const [h, m] = f.duration.split(':');
                    return parseInt(h) * 60 + parseInt(m);
                  })) + 'm'
                : '0m'
              }
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