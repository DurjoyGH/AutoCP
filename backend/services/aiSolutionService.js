const { GoogleGenerativeAI } = require("@google/generative-ai");
const yaml = require('js-yaml');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateSolution = async ({ problemTitle, problemDescription, examples, constraints, timeComplexity, spaceComplexity, topics, rating }) => {
  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 8192,
      }
    });

    // Ensure safe string handling
    const safeDescription = (problemDescription || '').substring(0, 600);
    // Handle constraints as array or string
    const safeConstraints = Array.isArray(constraints) 
      ? constraints.join('; ').substring(0, 200)
      : (constraints || '').substring(0, 200);
    const safeExamples = Array.isArray(examples) ? examples.slice(0, 2) : [];

    // Create a concise prompt to avoid truncation
    const prompt = `Generate a complete solution for this competitive programming problem:

PROBLEM: ${problemTitle}
DESCRIPTION: ${safeDescription}

EXAMPLES:
${safeExamples.map((ex, i) => `${i + 1}. Input: ${ex.input}\n   Output: ${ex.output}`).join('\n')}

CONSTRAINTS: ${safeConstraints}

CRITICAL INSTRUCTIONS:
1. Return PURE YAML format (no markdown, no code blocks wrapping)
2. Provide COMPLETE, RUNNABLE code in all 3 languages
3. Use pipe (|) for multi-line code blocks
4. Start directly with "algorithmExplanation:" - NO extra text

Required YAML structure:
---
algorithmExplanation: |
  Write 2-3 detailed paragraphs explaining:
  - The key insight and approach
  - Why this approach works
  - Step-by-step algorithm

codes:
  - language: python
    code: |
      # Complete runnable Python code
      def solution():
          pass
    explanation: ""
  - language: cpp
    code: |
      // Complete runnable C++ code
      #include <iostream>
      using namespace std;
      int main() {}
    explanation: ""
  - language: java
    code: |
      // Complete runnable Java code
      class Solution {
          public static void main(String[] args) {}
      }
    explanation: ""

timeComplexity: "O(n log n)"
spaceComplexity: "O(n)"
keyPoints:
  - "Important point 1"
  - "Important point 2"
  - "Important point 3"

edgeCases:
  - "Edge case 1"
  - "Edge case 2"
  - "Edge case 3"

REMEMBER: Start with "algorithmExplanation:" directly. NO markdown code blocks.`;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });
    
    const response = await result.response;
    
    // Check for blocking
    if (response.promptFeedback?.blockReason) {
      console.error('Solution generation blocked:', response.promptFeedback.blockReason);
      throw new Error(`Content blocked: ${response.promptFeedback.blockReason}`);
    }
    
    const text = response.text();
    console.log('Solution response length:', text.length);
    console.log('Solution response (first 500 chars):', text.substring(0, 500));
    console.log('Solution response (last 500 chars):', text.substring(Math.max(0, text.length - 500)));
    
    if (!text || text.trim().length === 0) {
      console.error('Empty solution response');
      throw new Error('AI returned empty response. Please try again.');
    }

    // Clean the response (remove markdown code blocks if present)
    let cleanedText = text.trim();
    
    // Remove YAML document separator if present
    if (cleanedText.startsWith('---')) {
      cleanedText = cleanedText.substring(3).trim();
    }
    
    // Remove markdown code blocks wrapping the YAML
    if (cleanedText.startsWith('```yaml')) {
      cleanedText = cleanedText.replace(/^```yaml\n?/g, '').replace(/\n?```$/g, '');
    } else if (cleanedText.startsWith('```')) {
      cleanedText = cleanedText.replace(/^```\n?/g, '').replace(/\n?```$/g, '');
    }
    
    // Clean up any remaining markdown at the end
    cleanedText = cleanedText.replace(/```\s*$/g, '').trim();

    console.log('Cleaned YAML (first 500 chars):', cleanedText.substring(0, 500));

    let solutionData;
    try {
      // Parse the YAML response
      solutionData = yaml.load(cleanedText);
      console.log('Successfully parsed YAML solution data');
      console.log('Found', solutionData.codes?.length || 0, 'code implementations');
    } catch (parseError) {
      console.error('YAML Parse Error:', parseError.message);
      console.error('Problematic YAML (first 1000 chars):', cleanedText.substring(0, 1000));
      throw new Error(`Invalid YAML response from AI: ${parseError.message}`);
    }

    // Add default complexity values if not present
    if (!solutionData.timeComplexity) {
      solutionData.timeComplexity = timeComplexity || 'O(n)';
    }
    if (!solutionData.spaceComplexity) {
      solutionData.spaceComplexity = spaceComplexity || 'O(1)';
    }
    
    // Validate required fields with more detailed error messages
    if (!solutionData.algorithmExplanation || solutionData.algorithmExplanation.length < 20) {
      console.error('Missing or too short algorithm explanation:', solutionData.algorithmExplanation);
      throw new Error('Generated solution has invalid algorithm explanation');
    }
    
    if (!solutionData.codes || !Array.isArray(solutionData.codes) || solutionData.codes.length === 0) {
      console.error('No code implementations found in response');
      console.error('Parsed solution data:', JSON.stringify(solutionData, null, 2));
      throw new Error('Generated solution has no code implementations. Please try again.');
    }

    // Ensure array fields are arrays
    solutionData.keyPoints = Array.isArray(solutionData.keyPoints) ? solutionData.keyPoints : [];
    solutionData.edgeCases = Array.isArray(solutionData.edgeCases) ? solutionData.edgeCases : [];

    console.log('Successfully parsed solution with', solutionData.codes.length, 'code implementations');
    
    return solutionData;

  } catch (error) {
    console.error('Error generating solution with Gemini:', error);
    throw new Error('Failed to generate solution: ' + error.message);
  }
};

module.exports = {
   generateSolution
};