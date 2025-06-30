import React, { useState } from 'react';

export default function ProgressTracker() {
  const [measurements, setMeasurements] = useState(() => {
    const saved = localStorage.getItem('measurements');
    return saved ? JSON.parse(saved) : [];
  });

  const [newMeasurement, setNewMeasurement] = useState({
    date: new Date().toISOString().split('T')[0],
    weight: '',
    chest: '',
    waist: '',
    hips: '',
    thighs: '',
    arms: '',
    notes: ''
  });

  const handleSaveMeasurement = () => {
    if (!newMeasurement.weight) return;

    const measurement = {
      ...newMeasurement,
      id: Date.now(),
      date: new Date(newMeasurement.date).toLocaleDateString()
    };

    const updated = [measurement, ...measurements];
    setMeasurements(updated);
    localStorage.setItem('measurements', JSON.stringify(updated));

    // Reset form
    setNewMeasurement({
      date: new Date().toISOString().split('T')[0],
      weight: '',
      chest: '',
      waist: '',
      hips: '',
      thighs: '',
      arms: '',
      notes: ''
    });
  };

  const deleteMeasurement = (id) => {
    const updated = measurements.filter(m => m.id !== id);
    setMeasurements(updated);
    localStorage.setItem('measurements', JSON.stringify(updated));
  };

  return (
    <div className="space-y-6">
      {/* Add New Measurement */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">Track Your Progress</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              value={newMeasurement.date}
              onChange={(e) => setNewMeasurement({
                ...newMeasurement,
                date: e.target.value
              })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Weight (kg)
            </label>
            <input
              type="number"
              value={newMeasurement.weight}
              onChange={(e) => setNewMeasurement({
                ...newMeasurement,
                weight: e.target.value
              })}
              placeholder="Enter weight"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {[
            { key: 'chest', label: 'Chest (cm)' },
            { key: 'waist', label: 'Waist (cm)' },
            { key: 'hips', label: 'Hips (cm)' },
            { key: 'thighs', label: 'Thighs (cm)' },
            { key: 'arms', label: 'Arms (cm)' }
          ].map(({ key, label }) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
              </label>
              <input
                type="number"
                value={newMeasurement[key]}
                onChange={(e) => setNewMeasurement({
                  ...newMeasurement,
                  [key]: e.target.value
                })}
                placeholder={`Enter ${key}`}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Notes
          </label>
          <textarea
            value={newMeasurement.notes}
            onChange={(e) => setNewMeasurement({
              ...newMeasurement,
              notes: e.target.value
            })}
            placeholder="Any additional notes..."
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="2"
          />
        </div>

        <button
          onClick={handleSaveMeasurement}
          disabled={!newMeasurement.weight}
          className={`w-full py-2 rounded-lg font-semibold ${
            newMeasurement.weight
              ? 'bg-blue-500 hover:bg-blue-600 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Save Measurements
        </button>
      </div>

      {/* Measurement History */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">Progress History</h2>
        <div className="space-y-4">
          {measurements.map((measurement) => (
            <div key={measurement.id} className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="font-semibold">{measurement.date}</div>
                <button
                  onClick={() => deleteMeasurement(measurement.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  ✕
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                <div>Weight: {measurement.weight} kg</div>
                {measurement.chest && <div>Chest: {measurement.chest} cm</div>}
                {measurement.waist && <div>Waist: {measurement.waist} cm</div>}
                {measurement.hips && <div>Hips: {measurement.hips} cm</div>}
                {measurement.thighs && <div>Thighs: {measurement.thighs} cm</div>}
                {measurement.arms && <div>Arms: {measurement.arms} cm</div>}
              </div>
              {measurement.notes && (
                <div className="mt-2 text-sm text-gray-600">
                  {measurement.notes}
                </div>
              )}
            </div>
          ))}
          {measurements.length === 0 && (
            <div className="text-center text-gray-500 py-4">
              No measurements logged yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 