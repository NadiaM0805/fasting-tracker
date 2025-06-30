import React from 'react';
import { machines } from './GymEquipment';

function generateWorkout(selectedMachineIds) {
  const selectedMachines = machines.filter(m => selectedMachineIds.includes(m.id));
  
  // Group machines by category
  const machinesByCategory = selectedMachines.reduce((acc, machine) => {
    if (!acc[machine.category]) {
      acc[machine.category] = [];
    }
    acc[machine.category].push(machine);
    return acc;
  }, {});

  // Generate exercises for each category
  const workout = [];
  Object.entries(machinesByCategory).forEach(([category, machines]) => {
    // Randomly select 2-3 exercises from each category
    const numExercises = Math.floor(Math.random() * 2) + 2; // 2-3 exercises
    const selectedExercises = [...machines]
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.min(numExercises, machines.length));

    selectedExercises.forEach(machine => {
      const [minReps, maxReps] = machine.recommendedReps.split('-').map(Number);
      const [minSets, maxSets] = machine.recommendedSets.split('-').map(Number);
      
      workout.push({
        ...machine,
        sets: Math.floor(Math.random() * (maxSets - minSets + 1)) + minSets,
        reps: Math.floor(Math.random() * (maxReps - minReps + 1)) + minReps,
      });
    });
  });

  return workout;
}

export default function WorkoutPlan({ selectedMachines }) {
  const workout = generateWorkout(selectedMachines);

  if (selectedMachines.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        Please select some machines to generate a workout plan.
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Your Workout Plan</h2>
      <div className="space-y-6">
        {workout.map((exercise, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">{exercise.name}</h3>
              <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {exercise.category}
              </span>
            </div>
            <div className="text-gray-600 mb-3">
              {exercise.sets} sets × {exercise.reps} reps
            </div>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src={exercise.videoUrl}
                title={`How to do ${exercise.name}`}
                className="w-full rounded-md"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 