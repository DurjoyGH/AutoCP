const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const problemProvider = async ({ topics, rating, suggestion }) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    // Construct the prompt
    const prompt = `
Generate a competitive programming problem with the following specifications:

Topics: ${topics.join(', ')}
Difficulty Rating: ${rating} (on a scale of 800-3500, where 800 is easiest and 3500 is hardest)
${suggestion ? `Additional Suggestion: ${suggestion}` : ''}

Please provide a detailed problem in the following JSON format:
{
  "title": "Problem Title",
  "description": "Detailed problem description with clear explanation",
  "examples": [
    {
      "input": "sample input",
      "output": "sample output",
      "explanation": "why this output"
    }
  ],
  "constraints": [
    "constraint 1",
    "constraint 2"
  ],
  "hints": [
    "hint 1",
    "hint 2"
  ],
  "tags": ["tag1", "tag2"],
  "difficulty": "${rating}",
  "timeComplexity": "Expected time complexity (e.g., O(n log n))",
  "spaceComplexity": "Expected space complexity (e.g., O(n))",
  "testCaseCount": "Number of test cases to validate",
  "approach": "Brief description of the approach to solve this problem",
  "keyInsights": [
    "key insight 1",
    "key insight 2"
  ]
}

Make sure the problem is:
1. Clear and unambiguous
2. Has at least 2-3 examples
3. Includes proper constraints
4. Is solvable and well-structured
5. Matches the difficulty rating
6. Covers the specified topics

Return ONLY the JSON object, no additional text or markdown formatting.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Clean the response (remove markdown code blocks if present)
    let cleanedText = text.trim();
    if (cleanedText.startsWith('```json')) {
      cleanedText = cleanedText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    } else if (cleanedText.startsWith('```')) {
      cleanedText = cleanedText.replace(/```\n?/g, '');
    }

    // Parse the JSON response
    const problemData = JSON.parse(cleanedText);

    // Validate required fields
    if (!problemData.title || !problemData.description) {
      throw new Error('Generated problem is missing required fields');
    }

    // Ensure constraints is an array
    if (typeof problemData.constraints === 'string') {
      try {
        // Try to parse if it's a stringified array
        problemData.constraints = JSON.parse(problemData.constraints);
      } catch (e) {
        // If it's just a string, split by newlines or commas
        problemData.constraints = problemData.constraints
          .split(/\n|,/)
          .map(c => c.trim())
          .filter(c => c.length > 0);
      }
    }

    // Ensure other array fields are arrays
    problemData.hints = Array.isArray(problemData.hints) ? problemData.hints : [];
    problemData.tags = Array.isArray(problemData.tags) ? problemData.tags : [];
    problemData.keyInsights = Array.isArray(problemData.keyInsights) ? problemData.keyInsights : [];
    problemData.examples = Array.isArray(problemData.examples) ? problemData.examples : [];

    return problemData;

  } catch (error) {
    console.error('Error generating problem with Gemini AI:', error);
    throw new Error(`Failed to generate problem: ${error.message}`);
  }
};

module.exports = {
  problemProvider
};
