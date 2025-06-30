import React, { useState } from 'react';
import ProgramDetail from './ProgramDetail';

export default function WorkoutBrowser({ onBack }) {
  const [selectedFilter, setSelectedFilter] = useState('popular');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProgram, setSelectedProgram] = useState(null);

  const filters = [
    { id: 'popular', label: '🔥 Popular' },
    { id: 'new', label: '✨ New' },
    { id: 'trending', label: '📈 Trending' },
    { id: 'saved', label: '❤️ Saved' }
  ];

  const workoutPrograms = [
    {
      id: 'summer-shred',
      title: '30-Day Summer Shred',
      image: '🌞',
      duration: '30 days',
      workoutsPerWeek: 5,
      category: 'Weight Loss',
      difficulty: 'Intermediate',
      saved: true,
      rating: 4.8,
      reviews: 1243,
      popular: true,
      new: false
    },
    {
      id: 'strength-master',
      title: 'Strength Mastery',
      image: '💪',
      duration: '8 weeks',
      workoutsPerWeek: 4,
      category: 'Strength',
      difficulty: 'Advanced',
      saved: false,
      rating: 4.9,
      reviews: 856,
      popular: true,
      trending: true
    },
    {
      id: 'beginner-basics',
      title: 'Beginner Basics',
      image: '🎯',
      duration: '4 weeks',
      workoutsPerWeek: 3,
      category: 'Fundamentals',
      difficulty: 'Beginner',
      saved: false,
      rating: 4.7,
      reviews: 2156,
      popular: true,
      new: false
    },
    {
      id: 'hiit-revolution',
      title: 'HIIT Revolution',
      image: '⚡',
      duration: '6 weeks',
      workoutsPerWeek: 4,
      category: 'Cardio',
      difficulty: 'Advanced',
      saved: true,
      rating: 4.6,
      reviews: 987,
      trending: true
    },
    {
      id: 'yoga-flow',
      title: 'Mindful Movement',
      image: '🧘‍♀️',
      duration: '4 weeks',
      workoutsPerWeek: 5,
      category: 'Yoga',
      difficulty: 'All Levels',
      saved: false,
      rating: 4.9,
      reviews: 654,
      new: true
    },
    {
      id: 'core-power',
      title: 'Core Power',
      image: '🎯',
      duration: '3 weeks',
      workoutsPerWeek: 4,
      category: 'Strength',
      difficulty: 'Intermediate',
      saved: false,
      rating: 4.7,
      reviews: 432,
      new: true
    }
  ];

  const filteredWorkouts = workoutPrograms.filter(program => {
    if (searchQuery) {
      return program.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
             program.category.toLowerCase().includes(searchQuery.toLowerCase());
    }
    
    switch (selectedFilter) {
      case 'popular':
        return program.popular;
      case 'new':
        return program.new;
      case 'trending':
        return program.trending;
      case 'saved':
        return program.saved;
      default:
        return true;
    }
  });

  if (selectedProgram) {
    return (
      <ProgramDetail 
        program={selectedProgram} 
        onBack={() => setSelectedProgram(null)} 
      />
    );
  }

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
          Workout Library
        </h1>

        {/* Search Bar */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search programs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pl-10 bg-white rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="absolute left-3 top-3.5 text-gray-400">
            🔍
          </span>
        </div>

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

      {/* Workout Programs Grid */}
      <div className="px-6 pb-8">
        <div className="grid grid-cols-1 gap-4">
          {filteredWorkouts.map(program => (
            <div
              key={program.id}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{program.image}</span>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {program.title}
                    </h3>
                    <div className="text-sm text-gray-600 mt-1">
                      {program.category} • {program.difficulty}
                    </div>
                  </div>
                </div>
                <button className={`text-2xl ${program.saved ? 'text-red-500' : 'text-gray-300'}`}>
                  ❤️
                </button>
              </div>

              <div className="space-y-3">
                {/* Program Stats */}
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>⏱ {program.duration}</span>
                  <span>📅 {program.workoutsPerWeek}x/week</span>
                  <span className="flex items-center gap-1">
                    ⭐ {program.rating}
                    <span className="text-gray-400">
                      ({program.reviews.toLocaleString()})
                    </span>
                  </span>
                </div>

                {/* Action Button */}
                <button 
                  onClick={() => setSelectedProgram(program)}
                  className="w-full bg-blue-500 text-white py-3 rounded-xl font-medium hover:bg-blue-600 transition-colors"
                >
                  View Program
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 