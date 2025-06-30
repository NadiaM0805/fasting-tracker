import React, { useState } from 'react';

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

export default function WorkoutDetail({ workout, onBack }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentExercise, setCurrentExercise] = useState(0);

  const exercises = [
    {
      name: 'Warm-up',
      duration: '5 min',
      description: 'Dynamic stretches and mobility work',
      sets: null,
      reps: null,
      type: 'warm-up',
      videoUrl: 'https://www.youtube.com/embed/rnxqyJG6Wgg'
    },
    {
      name: 'Bodyweight Squats',
      duration: null,
      description: 'Stand with feet shoulder-width apart, lower your body as if sitting back into a chair',
      sets: 3,
      reps: 15,
      type: 'exercise',
      videoUrl: 'https://www.youtube.com/embed/aclHkVaku9U'
    },
    {
      name: 'Push-ups',
      duration: null,
      description: 'Keep your body in a straight line, lower chest to ground',
      sets: 3,
      reps: 12,
      type: 'exercise',
      videoUrl: 'https://www.youtube.com/embed/IODxDxX7oi4'
    },
    {
      name: 'Mountain Climbers',
      duration: '45 sec',
      description: 'Start in plank position, alternate bringing knees to chest',
      sets: 3,
      reps: null,
      type: 'exercise',
      videoUrl: 'https://www.youtube.com/embed/nmwgirgXLYM'
    },
    {
      name: 'Dumbbell Rows',
      duration: null,
      description: 'Bend over with back straight, pull dumbbells to sides',
      sets: 3,
      reps: 12,
      type: 'exercise',
      videoUrl: 'https://www.youtube.com/embed/roCP6wCXPqo'
    },
    {
      name: 'Plank Hold',
      duration: '45 sec',
      description: 'Maintain straight body position, engage core',
      sets: 3,
      reps: null,
      type: 'exercise',
      videoUrl: 'https://www.youtube.com/embed/ASdvN_XEl_c'
    },
    {
      name: 'Jumping Jacks',
      duration: '1 min',
      description: 'Full body cardio movement',
      sets: 3,
      reps: null,
      type: 'cardio',
      videoUrl: 'https://www.youtube.com/embed/c4DAnQ6DtF8'
    },
    {
      name: 'Cool-down Stretches',
      duration: '5 min',
      description: 'Static stretches for major muscle groups',
      sets: null,
      reps: null,
      type: 'cool-down',
      videoUrl: 'https://www.youtube.com/embed/qULTwquOuT4'
    }
  ];

  const getExerciseTypeColor = (type) => {
    switch (type) {
      case 'warm-up':
        return 'bg-yellow-100 text-yellow-800';
      case 'exercise':
        return 'bg-blue-100 text-blue-800';
      case 'cardio':
        return 'bg-red-100 text-red-800';
      case 'cool-down':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isPlaying) {
    const exercise = exercises[currentExercise];
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="px-6 pt-6 pb-4">
            <button 
              onClick={() => setIsPlaying(false)}
              className="text-blue-500 text-lg mb-4"
            >
              ← Back to Overview
            </button>
            
            <div className="mb-4">
              <h1 className="text-2xl font-bold text-gray-900">
                {exercise.name}
              </h1>
              <div className="text-sm text-gray-600 mt-1">
                Exercise {currentExercise + 1} of {exercises.length}
              </div>
            </div>
          </div>
        </div>

        {/* Exercise Content */}
        <div className="p-6">
          {/* Video */}
          <div className="mb-8">
            <VideoPlayer url={exercise.videoUrl} title={exercise.name} />
          </div>

          {/* Exercise Details */}
          <div className="bg-white rounded-2xl p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Instructions</h2>
            <p className="text-gray-600 mb-4">{exercise.description}</p>
            
            <div className="flex items-center gap-4 text-sm text-gray-600">
              {exercise.sets && <span>{exercise.sets} sets</span>}
              {exercise.reps && <span>{exercise.reps} reps</span>}
              {exercise.duration && <span>{exercise.duration}</span>}
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
          <div className="max-w-lg mx-auto flex gap-4">
            <button
              onClick={() => setCurrentExercise(Math.max(0, currentExercise - 1))}
              disabled={currentExercise === 0}
              className={`flex-1 py-3 rounded-xl font-medium ${
                currentExercise === 0
                  ? 'bg-gray-100 text-gray-400'
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              }`}
            >
              Previous
            </button>
            <button
              onClick={() => {
                if (currentExercise < exercises.length - 1) {
                  setCurrentExercise(currentExercise + 1);
                } else {
                  setIsPlaying(false);
                  setCurrentExercise(0);
                }
              }}
              className="flex-1 bg-blue-500 text-white py-3 rounded-xl font-medium hover:bg-blue-600"
            >
              {currentExercise === exercises.length - 1 ? 'Finish Workout' : 'Next Exercise'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="px-6 pt-6 pb-4">
          <button 
            onClick={onBack}
            className="text-blue-500 text-lg mb-4"
          >
            ← Back
          </button>
          
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-gray-900">
              {workout.title}
            </h1>
            <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
              <span>⏱ {workout.duration}</span>
              <span>•</span>
              <span>💪 {workout.intensity} Intensity</span>
            </div>
          </div>

          <div className="flex gap-2 flex-wrap">
            {workout.equipment.map((item, index) => (
              <span 
                key={index}
                className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Workout Content */}
      <div className="p-6">
        {/* Overview */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Overview</h2>
          <div className="bg-white rounded-2xl p-6">
            <p className="text-gray-600 mb-4">{workout.description}</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-medium text-gray-900 mb-2">You'll need</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  {workout.equipment.map((item, index) => (
                    <li key={index}>✓ {item}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-medium text-gray-900 mb-2">Focus Areas</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  {workout.focusAreas.map((area, index) => (
                    <li key={index}>✓ {area}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Exercise List */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Exercises</h2>
          <div className="space-y-4">
            {exercises.map((exercise, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {exercise.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {exercise.description}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${getExerciseTypeColor(exercise.type)}`}>
                    {exercise.type}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  {exercise.sets && (
                    <span className="text-gray-600">
                      {exercise.sets} sets
                    </span>
                  )}
                  {exercise.reps && (
                    <span className="text-gray-600">
                      {exercise.reps} reps
                    </span>
                  )}
                  {exercise.duration && (
                    <span className="text-gray-600">
                      {exercise.duration}
                    </span>
                  )}
                </div>
                <div className="mt-4">
                  <VideoPlayer url={exercise.videoUrl} title={exercise.name} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="max-w-lg mx-auto">
          <button 
            onClick={() => {
              setCurrentExercise(0);
              setIsPlaying(true);
            }}
            className="w-full bg-blue-500 text-white py-3 rounded-xl font-medium hover:bg-blue-600 transition-colors"
          >
            Start Workout
          </button>
        </div>
      </div>
    </div>
  );
} 