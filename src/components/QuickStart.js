import React, { useState } from 'react';
import WorkoutDetail from './WorkoutDetail';

export default function QuickStart({ onBack }) {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'strength', label: 'Strength' },
    { id: 'cardio', label: 'Cardio' },
    { id: 'flexibility', label: 'Flexibility' },
    { id: 'recovery', label: 'Recovery' }
  ];

  const workouts = [
    {
      id: 'full-body-burn',
      title: 'Full Body Burn',
      duration: '45 min',
      intensity: 'Medium',
      category: 'strength',
      equipment: ['Dumbbells', 'Exercise Mat'],
      focusAreas: ['Full Body', 'Strength', 'Endurance'],
      description: 'A comprehensive full-body workout combining strength training and cardio elements for maximum results.',
      calories: '300-400',
      difficulty: 'Intermediate'
    },
    {
      id: 'cardio-blast',
      title: 'Cardio Blast',
      duration: '30 min',
      intensity: 'High',
      category: 'cardio',
      equipment: ['None'],
      focusAreas: ['Cardio', 'Endurance', 'Fat Burn'],
      description: 'High-intensity cardio intervals designed to boost your heart rate and maximize calorie burn.',
      calories: '250-350',
      difficulty: 'Advanced'
    },
    {
      id: 'power-strength',
      title: 'Power Strength',
      duration: '50 min',
      intensity: 'High',
      category: 'strength',
      equipment: ['Dumbbells', 'Kettlebell', 'Bench'],
      focusAreas: ['Strength', 'Power', 'Muscle Building'],
      description: 'Focus on building strength and power with compound movements and progressive overload.',
      calories: '400-500',
      difficulty: 'Advanced'
    },
    {
      id: 'hiit-express',
      title: 'HIIT Express',
      duration: '25 min',
      intensity: 'Very High',
      category: 'cardio',
      equipment: ['Exercise Mat'],
      focusAreas: ['Cardio', 'Fat Burn', 'Endurance'],
      description: 'Short but intense workout combining bodyweight exercises with high-intensity intervals.',
      calories: '200-300',
      difficulty: 'Intermediate'
    },
    {
      id: 'yoga-flow',
      title: 'Power Yoga Flow',
      duration: '40 min',
      intensity: 'Low',
      category: 'flexibility',
      equipment: ['Yoga Mat'],
      focusAreas: ['Flexibility', 'Core', 'Balance'],
      description: 'Dynamic yoga sequence focusing on strength, flexibility, and mindful movement.',
      calories: '150-200',
      difficulty: 'All Levels'
    },
    {
      id: 'dynamic-stretch',
      title: 'Dynamic Stretch',
      duration: '20 min',
      intensity: 'Low',
      category: 'recovery',
      equipment: ['Exercise Mat', 'Foam Roller'],
      focusAreas: ['Mobility', 'Recovery', 'Flexibility'],
      description: 'Active recovery session combining dynamic stretches and mobility work.',
      calories: '100-150',
      difficulty: 'All Levels'
    },
    {
      id: 'core-crusher',
      title: 'Core Crusher',
      duration: '30 min',
      intensity: 'Medium',
      category: 'strength',
      equipment: ['Exercise Mat', 'Dumbbells'],
      focusAreas: ['Core', 'Abs', 'Stability'],
      description: 'Targeted core workout to build strength and definition in your midsection.',
      calories: '200-250',
      difficulty: 'Intermediate'
    },
    {
      id: 'active-recovery',
      title: 'Active Recovery',
      duration: '35 min',
      intensity: 'Low',
      category: 'recovery',
      equipment: ['Foam Roller', 'Exercise Mat'],
      focusAreas: ['Recovery', 'Mobility', 'Stress Relief'],
      description: 'Low-intensity workout focused on muscle recovery and stress reduction.',
      calories: '150-200',
      difficulty: 'All Levels'
    }
  ];

  if (selectedWorkout) {
    return (
      <WorkoutDetail 
        workout={selectedWorkout}
        onBack={() => setSelectedWorkout(null)}
      />
    );
  }

  const filteredWorkouts = workouts.filter(workout => 
    selectedFilter === 'all' || workout.category === selectedFilter
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 sticky top-0 bg-gray-50 z-10">
        <div className="flex items-center mb-6">
          <button 
            onClick={onBack}
            className="text-blue-500 text-lg"
          >
            ← Back
          </button>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Quick Start
        </h1>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-6 px-6">
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                selectedFilter === filter.id
                  ? 'bg-black text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Workout List */}
      <div className="px-6 pb-8">
        <div className="grid grid-cols-1 gap-4">
          {filteredWorkouts.map(workout => (
            <div
              key={workout.id}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {workout.title}
                  </h3>
                  <div className="text-sm text-gray-600 mt-1">
                    {workout.difficulty} • {workout.calories} cal
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>⏱ {workout.duration}</span>
                  <span>💪 {workout.intensity}</span>
                </div>

                <button 
                  onClick={() => setSelectedWorkout(workout)}
                  className="w-full bg-blue-500 text-white py-3 rounded-xl font-medium hover:bg-blue-600 transition-colors"
                >
                  Start Workout
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 