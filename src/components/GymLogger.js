import React, { useState, useEffect } from 'react';

export default function GymLogger({ machines }) {
  const [logs, setLogs] = useState(() => {
    const savedLogs = localStorage.getItem('gymLogs');
    return savedLogs ? JSON.parse(savedLogs) : [];
  });
  
  const [selectedMachine, setSelectedMachine] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    localStorage.setItem('gymLogs', JSON.stringify(logs));
  }, [logs]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const machine = machines.find(m => m.id === selectedMachine);
    if (!machine) return;

    const newLog = {
      id: Date.now(),
      date: new Date().toISOString(),
      machine: machine.name,
      muscleGroups: machine.muscleGroups,
      sets: parseInt(sets),
      reps: parseInt(reps),
      weight: weight ? parseInt(weight) : null,
      notes: notes
    };

    setLogs([newLog, ...logs]);
    
    // Reset form
    setSelectedMachine('');
    setSets('');
    setReps('');
    setWeight('');
    setNotes('');
  };

  const deleteLog = (logId) => {
    setLogs(logs.filter(log => log.id !== logId));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Log Gym Workout
      </h2>

      {/* Log Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 mb-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Machine
            </label>
            <select
              value={selectedMachine}
              onChange={(e) => setSelectedMachine(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a machine</option>
              {machines.map((machine) => (
                <option key={machine.id} value={machine.id}>
                  {machine.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sets
              </label>
              <input
                type="number"
                value={sets}
                onChange={(e) => setSets(e.target.value)}
                required
                min="1"
                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reps
              </label>
              <input
                type="number"
                value={reps}
                onChange={(e) => setReps(e.target.value)}
                required
                min="1"
                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Weight (lbs)
              </label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                min="0"
                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows="3"
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Optional notes about your workout..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-xl font-medium hover:bg-blue-600 transition-colors"
          >
            Log Exercise
          </button>
        </div>
      </form>

      {/* Workout History */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Recent Workouts
        </h3>
        
        <div className="space-y-4">
          {logs.map((log) => (
            <div key={log.id} className="bg-white rounded-2xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="font-medium text-gray-900">{log.machine}</h4>
                  <p className="text-sm text-gray-600">
                    {new Date(log.date).toLocaleDateString()} at {new Date(log.date).toLocaleTimeString()}
                  </p>
                </div>
                <button
                  onClick={() => deleteLog(log.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  Delete
                </button>
              </div>

              <div className="flex gap-4 text-sm text-gray-600 mb-2">
                <span>{log.sets} sets</span>
                <span>{log.reps} reps</span>
                {log.weight && <span>{log.weight} lbs</span>}
              </div>

              <div className="flex flex-wrap gap-2 mb-2">
                {log.muscleGroups.map((muscle, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs"
                  >
                    {muscle}
                  </span>
                ))}
              </div>

              {log.notes && (
                <p className="text-sm text-gray-600 mt-2">
                  {log.notes}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 