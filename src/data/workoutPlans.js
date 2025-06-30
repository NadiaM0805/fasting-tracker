export const bodyAreas = {
  legs: 'Legs',
  glutes: 'Glutes',
  core: 'Core',
  back: 'Back',
  chest: 'Chest',
  shoulders: 'Shoulders',
  arms: 'Arms',
  cardio: 'Cardio'
};

export const workoutPlans = [
  {
    id: 1,
    name: "Lower Body Focus",
    targetAreas: ['legs', 'glutes'],
    exercises: [
      {
        name: "Leg Press",
        sets: 4,
        reps: "12-15",
        notes: "Start with a moderate weight. Focus on full range of motion.",
        videoId: "IZxyjW7MPJQ",
        targetAreas: ['legs', 'glutes']
      },
      {
        name: "Leg Extension",
        sets: 3,
        reps: "12-15",
        notes: "Keep movement controlled, avoid locking knees at top.",
        videoId: "YyvSfVjQeL0",
        targetAreas: ['legs']
      },
      {
        name: "Leg Curl",
        sets: 3,
        reps: "12-15",
        notes: "Focus on hamstring contraction, control the negative.",
        videoId: "ELOCsoDSmrg",
        targetAreas: ['legs']
      },
      {
        name: "Smith Machine Squat",
        sets: 3,
        reps: "10-12",
        notes: "Keep feet shoulder-width apart, control descent.",
        videoId: "Iwe6AmxVf7o",
        targetAreas: ['legs', 'glutes']
      }
    ]
  },
  {
    id: 2,
    name: "Upper Body Push",
    exercises: [
      {
        name: "Chest Press Machine",
        sets: 4,
        reps: "12-15",
        notes: "Keep shoulders back, focus on chest engagement.",
        videoId: "xUm0BiZCWzQ"
      },
      {
        name: "Shoulder Press",
        sets: 3,
        reps: "12-15",
        notes: "Start light, focus on form over weight.",
        videoId: "Wqq43dKW1TU"
      },
      {
        name: "Smith Machine Incline Press",
        sets: 3,
        reps: "10-12",
        notes: "Set bench to 30-45 degree angle.",
        videoId: "Iwe6AmxVf7o"
      },
      {
        name: "Cable Tricep Pushdown",
        sets: 3,
        reps: "15-20",
        notes: "Keep elbows at sides, focus on tricep contraction.",
        videoId: "2-LAMcpzODU"
      }
    ]
  },
  {
    id: 3,
    name: "Pull Focus",
    exercises: [
      {
        name: "Lat Pulldown",
        sets: 4,
        reps: "12-15",
        notes: "Focus on pulling with lats, not arms.",
        videoId: "CAwf7n6Luuc"
      },
      {
        name: "Cable Row",
        sets: 4,
        reps: "12-15",
        notes: "Keep chest up, pull to lower chest.",
        videoId: "GZbfZ033f74"
      },
      {
        name: "Face Pulls",
        sets: 3,
        reps: "15-20",
        notes: "Pull to forehead level, focus on rear delts.",
        videoId: "V8dZ3pyiCBo"
      },
      {
        name: "Cable Bicep Curl",
        sets: 3,
        reps: "12-15",
        notes: "Keep elbows at sides, control the movement.",
        videoId: "NFzO1cVROnM"
      }
    ]
  },
  {
    id: 4,
    name: "Full Body Circuit",
    exercises: [
      {
        name: "Leg Press",
        sets: 3,
        reps: "15-20",
        notes: "Moderate weight, minimal rest between exercises.",
        videoId: "IZxyjW7MPJQ"
      },
      {
        name: "Chest Press Machine",
        sets: 3,
        reps: "15-20",
        notes: "Focus on controlled movement.",
        videoId: "xUm0BiZCWzQ"
      },
      {
        name: "Lat Pulldown",
        sets: 3,
        reps: "15-20",
        notes: "Keep chest up throughout movement.",
        videoId: "CAwf7n6Luuc"
      },
      {
        name: "Shoulder Press",
        sets: 3,
        reps: "12-15",
        notes: "Control the negative portion.",
        videoId: "Wqq43dKW1TU"
      }
    ]
  },
  {
    id: 5,
    name: "Lower Body Power",
    exercises: [
      {
        name: "Smith Machine Squat",
        sets: 4,
        reps: "10-12",
        notes: "Focus on form and depth.",
        videoId: "Iwe6AmxVf7o"
      },
      {
        name: "Leg Press",
        sets: 4,
        reps: "12-15",
        notes: "Progressive weight increase each set.",
        videoId: "IZxyjW7MPJQ"
      },
      {
        name: "Leg Extension",
        sets: 3,
        reps: "15-20",
        notes: "Light weight, focus on squeeze at top.",
        videoId: "YyvSfVjQeL0"
      },
      {
        name: "Leg Curl",
        sets: 3,
        reps: "15-20",
        notes: "Control throughout movement.",
        videoId: "ELOCsoDSmrg"
      }
    ]
  },
  {
    id: 6,
    name: "Upper Body Volume",
    exercises: [
      {
        name: "Cable Row",
        sets: 4,
        reps: "15-20",
        notes: "Light weight, high volume for endurance.",
        videoId: "GZbfZ033f74"
      },
      {
        name: "Chest Press Machine",
        sets: 4,
        reps: "15-20",
        notes: "Focus on muscle connection.",
        videoId: "xUm0BiZCWzQ"
      },
      {
        name: "Shoulder Press",
        sets: 3,
        reps: "12-15",
        notes: "Keep core engaged throughout.",
        videoId: "Wqq43dKW1TU"
      },
      {
        name: "Lat Pulldown",
        sets: 3,
        reps: "15-20",
        notes: "Wide grip for back engagement.",
        videoId: "CAwf7n6Luuc"
      }
    ]
  },
  {
    id: 7,
    name: "Leg Focus",
    exercises: [
      {
        name: "Leg Press",
        sets: 4,
        reps: "12-15",
        notes: "Feet high on platform for glute focus.",
        videoId: "IZxyjW7MPJQ"
      },
      {
        name: "Smith Machine Split Squat",
        sets: 3,
        reps: "10-12 each leg",
        notes: "Keep torso upright.",
        videoId: "Iwe6AmxVf7o"
      },
      {
        name: "Leg Extension",
        sets: 3,
        reps: "15-20",
        notes: "Pause at top of movement.",
        videoId: "YyvSfVjQeL0"
      },
      {
        name: "Leg Curl",
        sets: 3,
        reps: "15-20",
        notes: "Focus on hamstring squeeze.",
        videoId: "ELOCsoDSmrg"
      }
    ]
  },
  {
    id: 8,
    name: "Push Strength",
    exercises: [
      {
        name: "Smith Machine Bench Press",
        sets: 4,
        reps: "10-12",
        notes: "Control bar path.",
        videoId: "Iwe6AmxVf7o"
      },
      {
        name: "Shoulder Press",
        sets: 4,
        reps: "12-15",
        notes: "Keep core tight.",
        videoId: "Wqq43dKW1TU"
      },
      {
        name: "Chest Press Machine",
        sets: 3,
        reps: "12-15",
        notes: "Focus on chest squeeze.",
        videoId: "xUm0BiZCWzQ"
      },
      {
        name: "Cable Tricep Extension",
        sets: 3,
        reps: "15-20",
        notes: "Keep elbows still.",
        videoId: "2-LAMcpzODU"
      }
    ]
  },
  {
    id: 9,
    name: "Pull Power",
    exercises: [
      {
        name: "Cable Row",
        sets: 4,
        reps: "10-12",
        notes: "Heavy weight, maintain form.",
        videoId: "GZbfZ033f74"
      },
      {
        name: "Lat Pulldown",
        sets: 4,
        reps: "12-15",
        notes: "Full stretch at top.",
        videoId: "CAwf7n6Luuc"
      },
      {
        name: "Face Pulls",
        sets: 3,
        reps: "15-20",
        notes: "Focus on rear delts.",
        videoId: "V8dZ3pyiCBo"
      },
      {
        name: "Cable Bicep Curl",
        sets: 3,
        reps: "12-15",
        notes: "Slow negatives.",
        videoId: "NFzO1cVROnM"
      }
    ]
  },
  {
    id: 10,
    name: "Full Body Strength",
    exercises: [
      {
        name: "Smith Machine Squat",
        sets: 4,
        reps: "10-12",
        notes: "Focus on depth and control.",
        videoId: "Iwe6AmxVf7o"
      },
      {
        name: "Chest Press Machine",
        sets: 4,
        reps: "12-15",
        notes: "Progressive overload.",
        videoId: "xUm0BiZCWzQ"
      },
      {
        name: "Cable Row",
        sets: 4,
        reps: "12-15",
        notes: "Squeeze shoulder blades.",
        videoId: "GZbfZ033f74"
      },
      {
        name: "Shoulder Press",
        sets: 3,
        reps: "12-15",
        notes: "Control throughout.",
        videoId: "Wqq43dKW1TU"
      }
    ]
  },
  {
    id: 11,
    name: "Lower Body Endurance",
    exercises: [
      {
        name: "Leg Press",
        sets: 4,
        reps: "15-20",
        notes: "Moderate weight, focus on endurance.",
        videoId: "IZxyjW7MPJQ"
      },
      {
        name: "Leg Extension",
        sets: 3,
        reps: "20",
        notes: "Light weight, high reps.",
        videoId: "YyvSfVjQeL0"
      },
      {
        name: "Leg Curl",
        sets: 3,
        reps: "20",
        notes: "Maintain form throughout.",
        videoId: "ELOCsoDSmrg"
      },
      {
        name: "Smith Machine Calf Raise",
        sets: 4,
        reps: "20-25",
        notes: "Full range of motion.",
        videoId: "Iwe6AmxVf7o"
      }
    ]
  },
  {
    id: 12,
    name: "Upper Body Endurance",
    exercises: [
      {
        name: "Lat Pulldown",
        sets: 4,
        reps: "15-20",
        notes: "Light weight, perfect form.",
        videoId: "CAwf7n6Luuc"
      },
      {
        name: "Chest Press Machine",
        sets: 4,
        reps: "15-20",
        notes: "Controlled tempo.",
        videoId: "xUm0BiZCWzQ"
      },
      {
        name: "Cable Row",
        sets: 3,
        reps: "20",
        notes: "Focus on back squeeze.",
        videoId: "GZbfZ033f74"
      },
      {
        name: "Shoulder Press",
        sets: 3,
        reps: "15-20",
        notes: "Light weight, high reps.",
        videoId: "Wqq43dKW1TU"
      }
    ]
  },
  {
    id: 13,
    name: "Leg Power",
    exercises: [
      {
        name: "Smith Machine Squat",
        sets: 5,
        reps: "8-10",
        notes: "Heavier weight, perfect form.",
        videoId: "Iwe6AmxVf7o"
      },
      {
        name: "Leg Press",
        sets: 4,
        reps: "10-12",
        notes: "Progressive weight increase.",
        videoId: "IZxyjW7MPJQ"
      },
      {
        name: "Leg Extension",
        sets: 3,
        reps: "12-15",
        notes: "Control the negative.",
        videoId: "YyvSfVjQeL0"
      },
      {
        name: "Leg Curl",
        sets: 3,
        reps: "12-15",
        notes: "Focus on hamstring engagement.",
        videoId: "ELOCsoDSmrg"
      }
    ]
  },
  {
    id: 14,
    name: "Push Endurance",
    exercises: [
      {
        name: "Chest Press Machine",
        sets: 4,
        reps: "15-20",
        notes: "Light to moderate weight.",
        videoId: "xUm0BiZCWzQ"
      },
      {
        name: "Shoulder Press",
        sets: 4,
        reps: "15-20",
        notes: "Focus on shoulder burn.",
        videoId: "Wqq43dKW1TU"
      },
      {
        name: "Cable Tricep Pushdown",
        sets: 3,
        reps: "20",
        notes: "Light weight, high reps.",
        videoId: "2-LAMcpzODU"
      },
      {
        name: "Smith Machine Incline Press",
        sets: 3,
        reps: "15-20",
        notes: "30-degree angle.",
        videoId: "Iwe6AmxVf7o"
      }
    ]
  },
  {
    id: 15,
    name: "Pull Endurance",
    exercises: [
      {
        name: "Cable Row",
        sets: 4,
        reps: "15-20",
        notes: "Light weight, focus on form.",
        videoId: "GZbfZ033f74"
      },
      {
        name: "Lat Pulldown",
        sets: 4,
        reps: "15-20",
        notes: "Wide grip, full range.",
        videoId: "CAwf7n6Luuc"
      },
      {
        name: "Face Pulls",
        sets: 3,
        reps: "20",
        notes: "High reps for shoulder health.",
        videoId: "V8dZ3pyiCBo"
      },
      {
        name: "Cable Bicep Curl",
        sets: 3,
        reps: "15-20",
        notes: "Light weight, perfect form.",
        videoId: "NFzO1cVROnM"
      }
    ]
  },
  {
    id: 16,
    name: "Full Body Tone",
    exercises: [
      {
        name: "Leg Press",
        sets: 3,
        reps: "20",
        notes: "Light weight, minimal rest.",
        videoId: "IZxyjW7MPJQ"
      },
      {
        name: "Chest Press Machine",
        sets: 3,
        reps: "20",
        notes: "Continuous tension.",
        videoId: "xUm0BiZCWzQ"
      },
      {
        name: "Lat Pulldown",
        sets: 3,
        reps: "20",
        notes: "Focus on squeeze.",
        videoId: "CAwf7n6Luuc"
      },
      {
        name: "Shoulder Press",
        sets: 3,
        reps: "20",
        notes: "Light weight, high reps.",
        videoId: "Wqq43dKW1TU"
      },
      {
        name: "Cable Row",
        sets: 3,
        reps: "20",
        notes: "Maintain form throughout.",
        videoId: "GZbfZ033f74"
      }
    ]
  },
  {
    id: 17,
    name: "Lower Body Focus Plus",
    exercises: [
      {
        name: "Smith Machine Squat",
        sets: 4,
        reps: "12-15",
        notes: "Moderate weight, full depth.",
        videoId: "Iwe6AmxVf7o"
      },
      {
        name: "Leg Press",
        sets: 4,
        reps: "15-20",
        notes: "Focus on quad engagement.",
        videoId: "IZxyjW7MPJQ"
      },
      {
        name: "Leg Extension",
        sets: 3,
        reps: "20",
        notes: "Squeeze at top.",
        videoId: "YyvSfVjQeL0"
      },
      {
        name: "Leg Curl",
        sets: 3,
        reps: "20",
        notes: "Control the movement.",
        videoId: "ELOCsoDSmrg"
      },
      {
        name: "Cable Kickback",
        sets: 3,
        reps: "20 each leg",
        notes: "Focus on glute squeeze.",
        videoId: "04Qa3-OV6Qs"
      }
    ]
  },
  {
    id: 18,
    name: "Upper Body Sculpt",
    exercises: [
      {
        name: "Cable Row",
        sets: 4,
        reps: "15-20",
        notes: "Squeeze shoulder blades.",
        videoId: "GZbfZ033f74"
      },
      {
        name: "Chest Press Machine",
        sets: 4,
        reps: "15-20",
        notes: "Focus on chest squeeze.",
        videoId: "xUm0BiZCWzQ"
      },
      {
        name: "Lat Pulldown",
        sets: 3,
        reps: "15-20",
        notes: "Wide grip focus.",
        videoId: "CAwf7n6Luuc"
      },
      {
        name: "Shoulder Press",
        sets: 3,
        reps: "15-20",
        notes: "Control the movement.",
        videoId: "Wqq43dKW1TU"
      },
      {
        name: "Face Pulls",
        sets: 3,
        reps: "20",
        notes: "Rear delt focus.",
        videoId: "V8dZ3pyiCBo"
      }
    ]
  },
  {
    id: 19,
    name: "Strength and Tone",
    exercises: [
      {
        name: "Smith Machine Squat",
        sets: 4,
        reps: "12-15",
        notes: "Moderate weight, good form.",
        videoId: "Iwe6AmxVf7o"
      },
      {
        name: "Cable Row",
        sets: 4,
        reps: "12-15",
        notes: "Back engagement focus.",
        videoId: "GZbfZ033f74"
      },
      {
        name: "Chest Press Machine",
        sets: 3,
        reps: "12-15",
        notes: "Even tempo.",
        videoId: "xUm0BiZCWzQ"
      },
      {
        name: "Leg Press",
        sets: 3,
        reps: "15-20",
        notes: "Control the movement.",
        videoId: "IZxyjW7MPJQ"
      }
    ]
  },
  {
    id: 20,
    name: "Full Body Conditioning",
    exercises: [
      {
        name: "Leg Press",
        sets: 3,
        reps: "15-20",
        notes: "Moderate weight, minimal rest.",
        videoId: "IZxyjW7MPJQ"
      },
      {
        name: "Lat Pulldown",
        sets: 3,
        reps: "15-20",
        notes: "Full range of motion.",
        videoId: "CAwf7n6Luuc"
      },
      {
        name: "Chest Press Machine",
        sets: 3,
        reps: "15-20",
        notes: "Controlled movement.",
        videoId: "xUm0BiZCWzQ"
      },
      {
        name: "Shoulder Press",
        sets: 3,
        reps: "15-20",
        notes: "Light weight, perfect form.",
        videoId: "Wqq43dKW1TU"
      },
      {
        name: "Cable Row",
        sets: 3,
        reps: "15-20",
        notes: "Focus on back engagement.",
        videoId: "GZbfZ033f74"
      }
    ]
  }
]; 