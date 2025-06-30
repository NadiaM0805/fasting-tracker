import React, { useState } from 'react';

const workoutTemplates = {
  'Full Body': {
    duration: '45-60 min',
    exercises: [
      { type: 'Upper Body', sets: 3, reps: '10-12' },
      { type: 'Lower Body', sets: 3, reps: '12-15' },
      { type: 'Upper Body', sets: 3, reps: '10-12' },
      { type: 'Lower Body', sets: 3, reps: '12-15' },
    ]
  },
  'Upper Body Focus': {
    duration: '40-50 min',
    exercises: [
      { type: 'Upper Body', sets: 4, reps: '8-10' },
      { type: 'Upper Body', sets: 4, reps: '8-10' },
      { type: 'Upper Body', sets: 3, reps: '10-12' },
      { type: 'Upper Body', sets: 3, reps: '10-12' },
    ]
  },
  'Lower Body Focus': {
    duration: '40-50 min',
    exercises: [
      { type: 'Lower Body', sets: 4, reps: '10-12' },
      { type: 'Lower Body', sets: 4, reps: '10-12' },
      { type: 'Lower Body', sets: 3, reps: '12-15' },
      { type: 'Lower Body', sets: 3, reps: '12-15' },
    ]
  }
};

export default function GymWorkoutGenerator({ machines, onStartWorkout }) {
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [generatedWorkout, setGeneratedWorkout] = useState(null);
  const [intensity, setIntensity] = useState('medium');

  const generateWorkout = () => {
    if (!selectedTemplate) return;

    const template = workoutTemplates[selectedTemplate];
    const workout = {
      title: `${selectedTemplate} Workout`,
      duration: template.duration,
      intensity: intensity.charAt(0).toUpperCase() + intensity.slice(1),
      exercises: []
    };

    // Filter machines by type and randomly select for each exercise slot
    template.exercises.forEach((exercise) => {
      const availableMachines = machines.filter(m => m.category === exercise.type);
      const randomMachine = availableMachines[Math.floor(Math.random() * availableMachines.length)];
      
      if (randomMachine) {
        workout.exercises.push({
          ...randomMachine,
          sets: exercise.sets,
          reps: exercise.reps
        });
      }
    });

    setGeneratedWorkout(workout);
  };

  if (generatedWorkout) {
    return (
      <div className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            {generatedWorkout.title}
          </h2>
          <button
            onClick={() => setGeneratedWorkout(null)}
            className="text-blue-500 hover:text-blue-600"
          >
            Generate Another
          </button>
        </div>

        <div className="bg-white rounded-2xl p-6 mb-6">
          <div className="flex gap-4 mb-4">
            <div>
              <span className="text-gray-600">Duration:</span>
              <span className="ml-2 font-medium">{generatedWorkout.duration}</span>
            </div>
            <div>
              <span className="text-gray-600">Intensity:</span>
              <span className="ml-2 font-medium">{generatedWorkout.intensity}</span>
            </div>
          </div>

          <div className="space-y-4">
            {generatedWorkout.exercises.map((exercise, index) => (
              <div key={index} className="border rounded-xl p-4">
                <h3 className="font-medium text-gray-900 mb-2">{exercise.name}</h3>
                <div className="flex gap-4 text-sm text-gray-600">
                  <span>{exercise.sets} sets</span>
                  <span>{exercise.reps} reps</span>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {exercise.muscleGroups.map((muscle, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs"
                    >
                      {muscle}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => onStartWorkout(generatedWorkout)}
          className="w-full bg-blue-500 text-white py-3 rounded-xl font-medium hover:bg-blue-600 transition-colors"
        >
          Start Workout
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Generate Gym Workout
      </h2>

      <div className="bg-white rounded-2xl p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Workout Type
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {Object.keys(workoutTemplates).map((template) => (
              <button
                key={template}
                onClick={() => setSelectedTemplate(template)}
                className={`p-4 rounded-xl border-2 transition-colors ${
                  selectedTemplate === template
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-200'
                }`}
              >
                <h3 className="font-medium text-gray-900">{template}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {workoutTemplates[template].duration}
                </p>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Intensity
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {['light', 'medium', 'high'].map((level) => (
              <button
                key={level}
                onClick={() => setIntensity(level)}
                className={`p-4 rounded-xl border-2 transition-colors ${
                  intensity === level
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-200'
                }`}
              >
                <h3 className="font-medium text-gray-900 capitalize">{level}</h3>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={generateWorkout}
          disabled={!selectedTemplate}
          className={`w-full py-3 rounded-xl font-medium transition-colors ${
            selectedTemplate
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          Generate Workout
        </button>
      </div>
    </div>
  );
} 