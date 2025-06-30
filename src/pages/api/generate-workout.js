import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { equipment, profile } = req.body;

    const prompt = `Create a safe and effective workout plan for a ${profile.gender} who is ${profile.height}cm tall and weighs ${profile.weight}kg. 
    Their goals are ${profile.goals.join(' and ')}.
    Available equipment: ${equipment}.
    
    Please create a workout plan with 4-6 exercises. For each exercise, specify:
    1. Exercise name (matching the available equipment)
    2. Number of sets (3-4)
    3. Number of reps (8-15 range)
    4. Any specific notes about form or intensity
    
    Format the response as a JSON array of objects, each with properties: name, sets, reps, and notes.
    Only include exercises that can be done with the available equipment.
    Focus on compound movements and proper progression.
    Consider the person's measurements for safe and effective exercise selection.`;

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a certified personal trainer with expertise in creating safe, effective workouts for weight loss and strength training."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      model: "gpt-4",
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    // Parse the response and extract the workout plan
    const response = JSON.parse(completion.choices[0].message.content);
    
    return res.status(200).json({
      workout: response.exercises || response.workout || []
    });

  } catch (error) {
    console.error('Error generating workout:', error);
    return res.status(500).json({ error: 'Failed to generate workout' });
  }
} 