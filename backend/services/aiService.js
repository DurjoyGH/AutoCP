const { GoogleGenerativeAI } = require('@google/generative-ai');
const yaml = require('js-yaml');

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const problemProvider = async ({ topics, rating, suggestion }) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    // Construct the prompt
    const prompt = `Generate a competitive programming problem with the following specifications:

Topics: ${topics.join(', ')}
Difficulty Rating: ${rating} (on a scale of 800-3500, where 800 is easiest and 3500 is hardest)
${suggestion ? `Additional Suggestion: ${suggestion}` : ''}

CRITICAL: Return response in PURE YAML format (no markdown, no code blocks, no extra text).

Required structure:
---
title: "Problem Title"
description: "Detailed problem description with clear explanation"
examples:
  - input: "sample input"
    output: "sample output"
    explanation: "why this output"
  - input: "sample input 2"
    output: "sample output 2"
    explanation: "why this output"
constraints:
  - "constraint 1"
  - "constraint 2"
  - "constraint 3"
hints:
  - "hint 1"
  - "hint 2"
tags:
  - tag1
  - tag2
difficulty: ${rating}
timeComplexity: "O(n log n)"
spaceComplexity: "O(n)"
testCaseCount: 10
approach: "Brief description of the approach to solve this problem"
keyInsights:
  - "key insight 1"
  - "key insight 2"

Requirements:
- Clear and unambiguous problem statement
- At least 2-3 examples with explanations
- Proper constraints (time limits, memory, input ranges)
- Solvable and well-structured
- Matches difficulty rating ${rating}
- Covers topics: ${topics.join(', ')}

IMPORTANT: Start directly with "title:" - NO markdown code blocks, NO extra text before or after.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log('Raw AI response length:', text.length);
    console.log('Raw AI response (first 300 chars):', text.substring(0, 300));

    // Clean the response (remove markdown code blocks if present)
    let cleanedText = text.trim();
    
    // Remove YAML document separator if present
    if (cleanedText.startsWith('---')) {
      cleanedText = cleanedText.substring(3).trim();
    }
    
    // Remove markdown code blocks
    if (cleanedText.startsWith('```yaml')) {
      cleanedText = cleanedText.replace(/```yaml\n?/g, '').replace(/```\n?$/g, '');
    } else if (cleanedText.startsWith('```')) {
      cleanedText = cleanedText.replace(/```\n?/g, '').replace(/```\n?$/g, '');
    }
    
    // Remove any trailing markdown
    cleanedText = cleanedText.replace(/```\s*$/g, '').trim();

    console.log('Cleaned YAML (first 300 chars):', cleanedText.substring(0, 300));

    let problemData;
    try {
      // Parse the YAML response
      problemData = yaml.load(cleanedText);
      console.log('Successfully parsed YAML problem data');
    } catch (parseError) {
      console.error('YAML Parse Error:', parseError.message);
      console.error('Problematic YAML (first 1000 chars):', cleanedText.substring(0, 1000));
      throw new Error(`Invalid YAML response from AI: ${parseError.message}`);
    }

    // Validate required fields
    if (!problemData.title || !problemData.description) {
      throw new Error('Generated problem is missing required fields');
    }

    // Ensure array fields are arrays (YAML handles this better than JSON)
    problemData.constraints = Array.isArray(problemData.constraints) ? problemData.constraints : [];
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
