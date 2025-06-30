import React, { useState } from 'react';
import { gymEquipmentGuides } from '../data/gymEquipmentGuides';

const MachineGuide = () => {
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [skillLevel, setSkillLevel] = useState('beginner');

  const handleMachineSelect = (machineId) => {
    setSelectedMachine(machineId);
  };

  const getRecommendations = (machine) => {
    if (!machine) return null;
    const reps = machine.recommendations[`${skillLevel}Reps`];
    const sets = machine.recommendations[`${skillLevel}Sets`];
    return { reps, sets };
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-6">Gym Machine Guide</h2>
      
      {/* Machine Selection */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {Object.entries(gymEquipmentGuides).map(([id, machine]) => (
          <button
            key={id}
            onClick={() => handleMachineSelect(id)}
            className={`p-4 rounded-lg text-left transition-colors ${
              selectedMachine === id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <h3 className="font-semibold">{machine.name}</h3>
          </button>
        ))}
      </div>

      {/* Skill Level Selection */}
      <div className="flex justify-center gap-4 mb-8">
        {['beginner', 'intermediate', 'advanced'].map((level) => (
          <button
            key={level}
            onClick={() => setSkillLevel(level)}
            className={`px-4 py-2 rounded-lg capitalize ${
              skillLevel === level
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {level}
          </button>
        ))}
      </div>

      {/* Machine Details */}
      {selectedMachine && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-2xl font-bold mb-4">
            {gymEquipmentGuides[selectedMachine].name}
          </h3>
          
          <p className="text-gray-600 mb-6">
            {gymEquipmentGuides[selectedMachine].description}
          </p>

          {/* YouTube Video */}
          <div className="aspect-w-16 aspect-h-9 mb-6">
            <iframe
              src={`https://www.youtube.com/embed/${gymEquipmentGuides[selectedMachine].videoId}`}
              title={`How to use ${gymEquipmentGuides[selectedMachine].name}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-lg"
            ></iframe>
          </div>

          {/* Instructions */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-3">Instructions:</h4>
            <ol className="list-decimal list-inside space-y-2">
              {gymEquipmentGuides[selectedMachine].instructions.map((instruction, index) => (
                <li key={index} className="text-gray-700">{instruction}</li>
              ))}
            </ol>
          </div>

          {/* Recommendations */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Recommended for {skillLevel}:</h4>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">
                <span className="font-medium">Sets:</span>{' '}
                {getRecommendations(gymEquipmentGuides[selectedMachine]).sets}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Reps:</span>{' '}
                {getRecommendations(gymEquipmentGuides[selectedMachine]).reps}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Rest:</span>{' '}
                {gymEquipmentGuides[selectedMachine].recommendations.restTime}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MachineGuide; 