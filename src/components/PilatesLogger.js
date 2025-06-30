import React, { useState, useEffect } from 'react';

const PilatesLogger = () => {
  const [logs, setLogs] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const savedLogs = localStorage.getItem('pilatesLogs');
    if (savedLogs) {
      setLogs(JSON.parse(savedLogs));
    }
  }, []);

  const saveToLocalStorage = (newLogs) => {
    localStorage.setItem('pilatesLogs', JSON.stringify(newLogs));
    setLogs(newLogs);
  };

  const toggleLog = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    const newLogs = { ...logs };
    newLogs[dateStr] = !logs[dateStr];
    saveToLocalStorage(newLogs);
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1));
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const changeMonth = (offset) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + offset);
    setSelectedDate(newDate);
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toISOString().split('T')[0] === today.toISOString().split('T')[0];
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-6">Reformer Pilates Logger</h2>
      
      {/* Month Navigation */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => changeMonth(-1)}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Previous Month
        </button>
        <h3 className="text-xl font-semibold">
          {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </h3>
        <button
          onClick={() => changeMonth(1)}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Next Month
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center font-semibold p-2">
            {day}
          </div>
        ))}
        
        {/* Empty cells for days before the 1st */}
        {Array.from({ length: new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay() }).map((_, i) => (
          <div key={`empty-${i}`} className="p-2"></div>
        ))}

        {/* Calendar days */}
        {getDaysInMonth(selectedDate).map(date => {
          const dateStr = date.toISOString().split('T')[0];
          const completed = logs[dateStr];
          
          return (
            <div
              key={dateStr}
              onClick={() => toggleLog(date)}
              className={`p-2 border rounded cursor-pointer transition-colors ${
                isToday(date) ? 'border-blue-500' : 'border-gray-200'
              } ${
                completed
                  ? 'bg-green-100 hover:bg-green-200'
                  : 'bg-white hover:bg-gray-100'
              }`}
            >
              <div className="text-sm">{date.getDate()}</div>
              {completed && (
                <div className="text-xs text-green-600 mt-1">✓ Done</div>
              )}
            </div>
          );
        })}
      </div>

      {/* Today's Quick Log */}
      <div className="mt-8 p-4 bg-white rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Quick Log for Today</h3>
        <button
          onClick={() => toggleLog(new Date())}
          className={`w-full py-3 rounded-lg transition-colors ${
            logs[new Date().toISOString().split('T')[0]]
              ? 'bg-green-500 text-white hover:bg-green-600'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          {logs[new Date().toISOString().split('T')[0]]
            ? '✓ Completed Today'
            : 'Log Today\'s Session'}
        </button>
      </div>
    </div>
  );
};

export default PilatesLogger; 