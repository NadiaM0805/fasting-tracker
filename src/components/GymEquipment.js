import React, { useState } from 'react';
import GymWorkoutGenerator from './GymWorkoutGenerator';
import GymLogger from './GymLogger';

const VideoPlayer = ({ url, title }) => (
  <div className="relative w-full pb-[56.25%]">
    <iframe
      src={url}
      title={title}
      className="absolute top-0 left-0 w-full h-full rounded-xl"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  </div>
);

export const machines = [
  {
    id: 1,
    name: 'Leg Press',
    category: 'Lower Body',
    muscleGroups: ['Quadriceps', 'Hamstrings', 'Glutes'],
    description: 'Push the platform away while keeping your back against the pad',
    videoUrl: 'https://www.youtube.com/embed/IZxyjW7MPJQ',
    recommendedSets: '3-4',
    recommendedReps: '10-12',
    tips: [
      'Keep your back flat against the seat',
      'Don\'t lock your knees at the top',
      'Control the weight on the way down'
    ]
  },
  {
    id: 2,
    name: 'Lat Pulldown',
    category: 'Upper Body',
    muscleGroups: ['Lats', 'Biceps', 'Upper Back'],
    description: 'Pull the bar down to your upper chest while keeping your back straight',
    videoUrl: 'https://www.youtube.com/embed/CAwf7n6Luuc',
    recommendedSets: '3-4',
    recommendedReps: '12-15',
    tips: [
      'Keep your chest up',
      'Pull with your elbows, not your hands',
      'Squeeze your lats at the bottom'
    ]
  },
  {
    id: 3,
    name: 'Chest Press Machine',
    category: 'Upper Body',
    muscleGroups: ['Chest', 'Shoulders', 'Triceps'],
    description: 'Push the handles forward while keeping your back against the pad',
    videoUrl: 'https://www.youtube.com/embed/xUm0BiZCWlQ',
    recommendedSets: '3-4',
    recommendedReps: '10-12',
    tips: [
      'Keep your feet flat on the floor',
      'Don\'t arch your back',
      'Control the weight throughout'
    ]
  },
  {
    id: 4,
    name: 'Cable Row',
    category: 'Upper Body',
    muscleGroups: ['Upper Back', 'Biceps', 'Rear Deltoids'],
    description: 'Pull the handle to your lower chest while maintaining good posture',
    videoUrl: 'https://www.youtube.com/embed/GZbfZ033f74',
    recommendedSets: '3-4',
    recommendedReps: '12-15',
    tips: [
      'Keep your back straight',
      'Pull your shoulders back',
      'Squeeze your shoulder blades together'
    ]
  },
  {
    id: 5,
    name: 'Leg Extension',
    category: 'Lower Body',
    muscleGroups: ['Quadriceps'],
    description: 'Extend your legs until straight, then lower with control',
    videoUrl: 'https://www.youtube.com/embed/YyvSfVjQeL0',
    recommendedSets: '3',
    recommendedReps: '12-15',
    tips: [
      'Don\'t swing the weight',
      'Keep your back against the pad',
      'Pause briefly at the top'
    ]
  },
  {
    id: 6,
    name: 'Leg Curl',
    category: 'Lower Body',
    muscleGroups: ['Hamstrings'],
    description: 'Curl your legs up towards your glutes, then lower with control',
    videoUrl: 'https://www.youtube.com/embed/1Tq3QdYUuHs',
    recommendedSets: '3',
    recommendedReps: '12-15',
    tips: [
      'Don\'t lift your hips off the pad',
      'Keep your ankles flexed',
      'Control the negative portion'
    ]
  },
  {
    id: 7,
    name: 'Shoulder Press Machine',
    category: 'Upper Body',
    muscleGroups: ['Shoulders', 'Triceps'],
    description: 'Press the handles overhead while maintaining proper form',
    videoUrl: 'https://www.youtube.com/embed/Wqq43dKW1TU',
    recommendedSets: '3-4',
    recommendedReps: '10-12',
    tips: [
      'Keep your core tight',
      'Don\'t arch your back',
      'Control the weight on the way down'
    ]
  },
  {
    id: 8,
    name: 'Assisted Pull-up Machine',
    category: 'Upper Body',
    muscleGroups: ['Lats', 'Biceps', 'Upper Back'],
    description: 'Pull yourself up using the assisted platform',
    videoUrl: 'https://www.youtube.com/embed/y0qMWvz8yHk',
    recommendedSets: '3',
    recommendedReps: '8-12',
    tips: [
      'Keep your core engaged',
      'Don\'t swing your body',
      'Focus on proper form over weight'
    ]
  }
];

export default function GymEquipment() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [activeTab, setActiveTab] = useState('browse'); // 'browse', 'generate', 'log'
  const [generatedWorkout, setGeneratedWorkout] = useState(null);

  const categories = ['All', 'Upper Body', 'Lower Body'];

  const filteredMachines = machines.filter(machine => {
    return selectedCategory === 'All' || machine.category === selectedCategory;
  });

  const handleStartWorkout = (workout) => {
    setGeneratedWorkout(workout);
    setActiveTab('log');
  };

  const renderContent = () => {
    if (selectedMachine) {
      return (
        <div className="min-h-screen bg-gray-50 pb-20">
          <div className="bg-white shadow-sm">
            <div className="px-6 pt-6 pb-4">
              <button 
                onClick={() => setSelectedMachine(null)}
                className="text-blue-500 text-lg mb-4"
              >
                ← Back to Machines
              </button>
              
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {selectedMachine.name}
              </h1>
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedMachine.muscleGroups.map((muscle, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm"
                  >
                    {muscle}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="mb-8">
              <VideoPlayer url={selectedMachine.videoUrl} title={selectedMachine.name} />
            </div>

            <div className="bg-white rounded-2xl p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Instructions</h2>
              <p className="text-gray-600 mb-4">{selectedMachine.description}</p>
              
              <div className="flex gap-6 mb-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Sets</h3>
                  <p className="text-gray-600">{selectedMachine.recommendedSets}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Reps</h3>
                  <p className="text-gray-600">{selectedMachine.recommendedReps}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Pro Tips</h2>
              <ul className="space-y-3">
                {selectedMachine.tips.map((tip, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-500 mr-3">•</span>
                    <span className="text-gray-600">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      );
    }

    switch (activeTab) {
      case 'generate':
        return <GymWorkoutGenerator machines={machines} onStartWorkout={handleStartWorkout} />;
      case 'log':
        return <GymLogger machines={machines} />;
      default:
        return (
          <div className="min-h-screen bg-gray-50 pb-20">
            <div className="bg-white shadow-sm">
              <div className="px-6 pt-6 pb-4">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                  Gym Equipment Guide
                </h1>

                <div className="flex gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                        selectedCategory === category
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                {filteredMachines.map((machine) => (
                  <button
                    key={machine.id}
                    onClick={() => setSelectedMachine(machine)}
                    className="bg-white rounded-2xl p-6 text-left hover:shadow-lg transition-shadow"
                  >
                    <h2 className="text-lg font-medium text-gray-900 mb-2">
                      {machine.name}
                    </h2>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {machine.muscleGroups.map((muscle, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 rounded-full bg-blue-50 text-blue-600 text-xs"
                        >
                          {muscle}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-gray-600">
                      {machine.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div>
      {/* Tab Navigation */}
      {!selectedMachine && (
        <div className="bg-white border-b border-gray-200">
          <div className="flex px-6">
            <button
              onClick={() => setActiveTab('browse')}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'browse'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Browse Machines
            </button>
            <button
              onClick={() => setActiveTab('generate')}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'generate'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Generate Workout
            </button>
            <button
              onClick={() => setActiveTab('log')}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'log'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Log Workout
            </button>
          </div>
        </div>
      )}

      {/* Content */}
      {renderContent()}
    </div>
  );
} 