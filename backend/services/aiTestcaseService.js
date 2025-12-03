const { GoogleGenerativeAI } = require('@google/generative-ai');
const yaml = require('js-yaml');

// Initialize Gemini AI with testcase generator API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY_TEST_CASE_GENERATOR);

const generateTestcases = async ({ problemTitle, problemDescription, constraints, timeComplexity, spaceComplexity }) => {
  try {
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.5-flash',
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 16384, // Increased to ensure complete responses
      }
    });

    // Create a detailed prompt for testcase generation
    const prompt = `Generate 6 test cases for this competitive programming problem:

PROBLEM TITLE: ${problemTitle}

PROBLEM DESCRIPTION:
${problemDescription}

CONSTRAINTS:
${Array.isArray(constraints) ? constraints.join('\n') : constraints}

TIME COMPLEXITY: ${timeComplexity}
SPACE COMPLEXITY: ${spaceComplexity}

CRITICAL INSTRUCTIONS:
1. Return PURE YAML format (no markdown, no code blocks wrapping)
2. Generate exactly 6 test cases covering different categories:
   - Base Cases (2 test cases): Simple, straightforward inputs
   - Edge Cases (2 test cases): Boundary conditions, corner cases
   - Large Cases (2 test cases): Maximum constraint inputs, stress tests
3. Each test case must have input, expected output, and type (NO explanation needed)
4. Start directly with "testcases:" - NO extra text

Required YAML structure:
---
testcases:
  - type: "base"
    input: |
      Sample input as it would appear
    output: |
      Expected output
  - type: "base"
    input: |
      Another base case
    output: |
      Expected output
  - type: "edge"
    input: |
      Edge case input
    output: |
      Expected output
  - type: "edge"
    input: |
      Another edge case
    output: |
      Expected output
  - type: "large"
    input: |
      Large input near maximum constraints
    output: |
      Expected output
  - type: "large"
    input: |
      Another large case
    output: |
      Expected output

REQUIREMENTS:
- Exactly 6 test cases total
- 2 base cases (simple, straightforward)
- 2 edge cases (boundaries, special conditions, corner cases)
- 2 large cases (maximum constraints, stress tests)
- All inputs and outputs must be valid according to constraints
- Use pipe (|) for multi-line input/output when needed
- EVERY test case MUST have all 3 fields: type, input, output
- DO NOT include explanation field
- DO NOT truncate or leave any test case incomplete
- Ensure the YAML is complete and valid

REMEMBER: Start with "testcases:" directly. NO markdown code blocks, NO extra text before or after. Make sure ALL 6 test cases are COMPLETE with all required fields (type, input, output only).`;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });
    
    const response = await result.response;
    
    // Check for blocking
    if (response.promptFeedback?.blockReason) {
      console.error('Testcase generation blocked:', response.promptFeedback.blockReason);
      throw new Error(`Content blocked: ${response.promptFeedback.blockReason}`);
    }
    
    const text = response.text();
    console.log('Testcase response length:', text.length);
    console.log('Testcase response (first 500 chars):', text.substring(0, 500));
    console.log('Testcase response (last 300 chars):', text.substring(Math.max(0, text.length - 300)));
    
    if (!text || text.trim().length === 0) {
      console.error('Empty testcase response');
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

    let testcaseData;
    try {
      // Parse the YAML response
      testcaseData = yaml.load(cleanedText);
      console.log('Successfully parsed YAML testcase data');
      console.log('Found', testcaseData.testcases?.length || 0, 'test cases');
    } catch (parseError) {
      console.error('YAML Parse Error:', parseError.message);
      console.error('Problematic YAML (first 1000 chars):', cleanedText.substring(0, 1000));
      throw new Error(`Invalid YAML response from AI: ${parseError.message}`);
    }

    // Validate required fields
    if (!testcaseData.testcases || !Array.isArray(testcaseData.testcases)) {
      console.error('No testcases array found in response');
      throw new Error('Generated testcases have invalid format');
    }

    if (testcaseData.testcases.length === 0) {
      console.error('Empty testcases array');
      throw new Error('No test cases were generated');
    }

    // Validate and clean each testcase
    const validTestcases = [];
    for (let i = 0; i < testcaseData.testcases.length; i++) {
      const tc = testcaseData.testcases[i];
      
      // Check if testcase has required fields (type, input, output only - no explanation)
      if (tc.type && tc.input && tc.output) {
        // Ensure all fields are strings and have content
        const cleanedTc = {
          type: String(tc.type).trim(),
          input: String(tc.input).trim(),
          output: String(tc.output).trim()
        };
        
        // Verify all fields have actual content (not just whitespace)
        if (cleanedTc.type && cleanedTc.input && cleanedTc.output) {
          validTestcases.push(cleanedTc);
        } else {
          console.warn(`Testcase ${i + 1} has empty fields after trimming, skipping`);
        }
      } else {
        console.warn(`Testcase ${i + 1} missing required fields:`, {
          hasType: !!tc.type,
          hasInput: !!tc.input,
          hasOutput: !!tc.output
        });
      }
    }

    if (validTestcases.length === 0) {
      throw new Error('No valid test cases were generated');
    }

    // Log if we got fewer than 6 test cases
    if (validTestcases.length < 6) {
      console.warn(`Warning: Generated ${validTestcases.length} test cases instead of 6. Some test cases were incomplete.`);
    }

    console.log('Successfully generated', validTestcases.length, 'valid test cases out of', testcaseData.testcases.length, 'total');
    
    // Return cleaned testcases
    return { testcases: validTestcases };

  } catch (error) {
    console.error('Error generating testcases with Gemini:', error);
    throw new Error('Failed to generate testcases: ' + error.message);
  }
};

module.exports = {
  generateTestcases
};
