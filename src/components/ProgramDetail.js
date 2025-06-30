import React from 'react';

export default function ProgramDetail({ program, onBack }) {
  if (!program) return null;

  const weeks = Array.from({ length: Math.ceil(parseInt(program.duration) / 7) }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="px-6 pt-6 pb-4">
          <button 
            onClick={onBack}
            className="text-blue-500 text-lg mb-4"
          >
            ← Back to Library
          </button>
          
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">{program.image}</span>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {program.title}
              </h1>
              <div className="text-gray-600 mt-1">
                {program.category} • {program.difficulty}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm text-gray-600">
            <span>⏱ {program.duration}</span>
            <span>📅 {program.workoutsPerWeek}x/week</span>
            <span className="flex items-center gap-1">
              ⭐ {program.rating}
              <span className="text-gray-400">
                ({program.reviews.toLocaleString()})
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-8">
        {/* Overview Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Overview</h2>
          <div className="bg-white rounded-2xl p-6">
            <p className="text-gray-600 mb-6">
              This {program.duration.toLowerCase()} program is designed to {program.category.toLowerCase() === 'weight loss' 
                ? 'help you achieve sustainable weight loss through a combination of strength training and cardio'
                : `improve your ${program.category.toLowerCase()} through progressive workouts`
              }. Perfect for {program.difficulty.toLowerCase()} level fitness enthusiasts.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-medium text-gray-900 mb-2">What you'll need</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>✓ Dumbbells (optional)</li>
                  <li>✓ Exercise mat</li>
                  <li>✓ Water bottle</li>
                  <li>✓ Comfortable clothes</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-medium text-gray-900 mb-2">You'll improve</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>✓ {program.category} fitness</li>
                  <li>✓ Overall endurance</li>
                  <li>✓ Core strength</li>
                  <li>✓ Mental resilience</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Weekly Schedule */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Weekly Schedule</h2>
          <div className="space-y-4">
            {weeks.map(week => (
              <div key={week} className="bg-white rounded-2xl p-6">
                <h3 className="font-medium text-gray-900 mb-4">Week {week}</h3>
                <div className="space-y-3">
                  {Array.from({ length: program.workoutsPerWeek }, (_, i) => (
                    <div 
                      key={i}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                    >
                      <div>
                        <h4 className="font-medium text-gray-900">Workout {i + 1}</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {getWorkoutDescription(program.category, i)}
                        </p>
                      </div>
                      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors">
                        Start
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="max-w-lg mx-auto flex gap-4">
          <button className="flex-1 bg-gray-100 text-gray-900 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors">
            Save Program
          </button>
          <button className="flex-1 bg-blue-500 text-white py-3 rounded-xl font-medium hover:bg-blue-600 transition-colors">
            Start Week 1
          </button>
        </div>
      </div>
    </div>
  );
}

function getWorkoutDescription(category, index) {
  const descriptions = {
    'Weight Loss': [
      '30 min HIIT + Core',
      '45 min Strength Training',
      '35 min Cardio + Abs',
      '40 min Full Body Circuit',
      '30 min HIIT Cardio'
    ],
    'Strength': [
      'Upper Body Focus',
      'Lower Body Power',
      'Core & Stability',
      'Full Body Strength',
      'Functional Training'
    ],
    'Cardio': [
      'HIIT Intervals',
      'Endurance Training',
      'Speed & Agility',
      'Power Cardio',
      'Recovery Cardio'
    ],
    'Yoga': [
      'Flow & Balance',
      'Power Yoga',
      'Flexibility Focus',
      'Core & Strength',
      'Restorative Practice'
    ],
    'Fundamentals': [
      'Basic Movement Patterns',
      'Strength Foundations',
      'Cardio Basics',
      'Core Essentials',
      'Mobility Work'
    ]
  };

  return descriptions[category]?.[index] || `${category} Workout ${index + 1}`;
} 