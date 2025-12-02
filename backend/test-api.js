// Test API for Gemini Problem Generation
// Run this with: node test-api.js

const axios = require('axios');

const testProblemGeneration = async () => {
  try {
    console.log('🚀 Testing Problem Generation API...\n');

    const requestData = {
      topics: ['arrays', 'two-pointers'],
      rating: 1200,
      suggestion: 'Create a problem about finding pairs in an array'
    };

    console.log('📤 Sending request to: http://localhost:3000/api/generate-problem');
    console.log('📝 Request data:', JSON.stringify(requestData, null, 2));
    console.log('\n⏳ Waiting for response...\n');

    const response = await axios.post(
      'http://localhost:3000/api/generate-problem',
      requestData,
      {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 60000 // 60 second timeout
      }
    );

    console.log('✅ Success! Status:', response.status);
    console.log('\n📊 Generated Problem:');
    console.log('═══════════════════════════════════════════════════════════════');
    console.log(`\n🎯 Title: ${response.data.data.title}`);
    console.log(`\n📝 Description:\n${response.data.data.description}`);
    
    if (response.data.data.examples && response.data.data.examples.length > 0) {
      console.log(`\n💡 Examples:`);
      response.data.data.examples.forEach((example, index) => {
        console.log(`\nExample ${index + 1}:`);
        console.log(`Input: ${example.input}`);
        console.log(`Output: ${example.output}`);
        if (example.explanation) {
          console.log(`Explanation: ${example.explanation}`);
        }
      });
    }

    if (response.data.data.constraints && response.data.data.constraints.length > 0) {
      console.log(`\n⚠️  Constraints:`);
      response.data.data.constraints.forEach(constraint => {
        console.log(`  - ${constraint}`);
      });
    }

    if (response.data.data.hints && response.data.data.hints.length > 0) {
      console.log(`\n💭 Hints:`);
      response.data.data.hints.forEach((hint, index) => {
        console.log(`  ${index + 1}. ${hint}`);
      });
    }

    console.log(`\n⚡ Time Complexity: ${response.data.data.timeComplexity}`);
    console.log(`💾 Space Complexity: ${response.data.data.spaceComplexity}`);
    console.log(`🏷️  Tags: ${response.data.data.tags.join(', ')}`);
    console.log(`📊 Difficulty: ${response.data.data.difficulty}`);
    console.log(`🆔 Problem ID: ${response.data.data._id}`);
    
    console.log('\n═══════════════════════════════════════════════════════════════');
    console.log('\n✨ Problem generated successfully!');

  } catch (error) {
    console.error('❌ Error:', error.message);
    
    if (error.response) {
      console.error('\n📛 Response Status:', error.response.status);
      console.error('📛 Response Data:', JSON.stringify(error.response.data, null, 2));
    } else if (error.request) {
      console.error('\n📛 No response received from server');
      console.error('Make sure the backend is running on http://localhost:3000');
    }
  }
};

// Run the test
testProblemGeneration();
