import React, { useState } from 'react';

export default function Achievements() {
  const [achievements, setAchievements] = useState(() => {
    const saved = localStorage.getItem('achievements');
    return saved ? JSON.parse(saved) : [];
  });

  const [newAchievement, setNewAchievement] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    category: 'strength',
    description: ''
  });

  const categories = {
    strength: '💪 Strength',
    endurance: '🏃‍♀️ Endurance',
    flexibility: '🧘‍♀️ Flexibility',
    wellness: '🌟 Wellness',
    habit: '✅ Habit Formation',
    energy: '⚡ Energy & Mood'
  };

  const handleSaveAchievement = () => {
    if (!newAchievement.title) return;

    const achievement = {
      ...newAchievement,
      id: Date.now(),
      date: new Date(newAchievement.date).toLocaleDateString()
    };

    const updated = [achievement, ...achievements];
    setAchievements(updated);
    localStorage.setItem('achievements', JSON.stringify(updated));

    // Reset form
    setNewAchievement({
      title: '',
      date: new Date().toISOString().split('T')[0],
      category: 'strength',
      description: ''
    });
  };

  const deleteAchievement = (id) => {
    const updated = achievements.filter(a => a.id !== id);
    setAchievements(updated);
    localStorage.setItem('achievements', JSON.stringify(updated));
  };

  const achievementSuggestions = {
    strength: [
      "Increased weight on leg press",
      "Did more reps than last time",
      "Maintained perfect form throughout",
      "Tried a new machine successfully",
      "Completed full workout without breaks"
    ],
    endurance: [
      "Worked out longer than usual",
      "Recovered faster between sets",
      "Increased cardio duration",
      "Maintained consistent pace",
      "Less fatigue than before"
    ],
    flexibility: [
      "Better range of motion",
      "Improved stretch depth",
      "Less stiffness after workout",
      "Better posture throughout day",
      "Easier to do daily movements"
    ],
    wellness: [
      "Slept better after workout",
      "More energy throughout day",
      "Clothes fitting differently",
      "Feeling stronger overall",
      "Better mood after exercise"
    ],
    habit: [
      "Consistent workout schedule",
      "Packed gym bag night before",
      "Planned meals around workout",
      "Stayed hydrated all day",
      "Logged all exercises"
    ],
    energy: [
      "High energy all day",
      "Positive mood after workout",
      "Motivated to do extra set",
      "Felt strong during workout",
      "Great focus throughout"
    ]
  };

  return (
    <div className="space-y-6">
      {/* Add Achievement */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">Log New Achievement</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              value={newAchievement.date}
              onChange={(e) => setNewAchievement({
                ...newAchievement,
                date: e.target.value
              })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              value={newAchievement.category}
              onChange={(e) => setNewAchievement({
                ...newAchievement,
                category: e.target.value
              })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {Object.entries(categories).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Achievement Title
          </label>
          <input
            type="text"
            value={newAchievement.title}
            onChange={(e) => setNewAchievement({
              ...newAchievement,
              title: e.target.value
            })}
            placeholder="What did you achieve?"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* Achievement Suggestions */}
          <div className="mt-2 flex flex-wrap gap-2">
            {achievementSuggestions[newAchievement.category]?.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => setNewAchievement({
                  ...newAchievement,
                  title: suggestion
                })}
                className="text-sm px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Details (Optional)
          </label>
          <textarea
            value={newAchievement.description}
            onChange={(e) => setNewAchievement({
              ...newAchievement,
              description: e.target.value
            })}
            placeholder="Add any additional details about your achievement..."
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="2"
          />
        </div>

        <button
          onClick={handleSaveAchievement}
          disabled={!newAchievement.title}
          className={`w-full py-2 rounded-lg font-semibold ${
            newAchievement.title
              ? 'bg-blue-500 hover:bg-blue-600 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Save Achievement
        </button>
      </div>

      {/* Achievement History */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">Your Achievements</h2>
        <div className="space-y-4">
          {achievements.map((achievement) => (
            <div key={achievement.id} className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-semibold">{achievement.title}</div>
                  <div className="text-sm text-gray-500">
                    {categories[achievement.category]} • {achievement.date}
                  </div>
                </div>
                <button
                  onClick={() => deleteAchievement(achievement.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  ✕
                </button>
              </div>
              {achievement.description && (
                <div className="mt-2 text-sm text-gray-600">
                  {achievement.description}
                </div>
              )}
            </div>
          ))}
          {achievements.length === 0 && (
            <div className="text-center text-gray-500 py-4">
              No achievements logged yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 