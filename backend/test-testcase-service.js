// Test script for testcase generation service
require('dotenv').config();
const { generateTestcases } = require('./services/aiTestcaseService');

const testData = {
  problemTitle: "Two Sum",
  problemDescription: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
  constraints: [
    "2 <= nums.length <= 10^4",
    "-10^9 <= nums[i] <= 10^9",
    "-10^9 <= target <= 10^9",
    "Only one valid answer exists"
  ],
  timeComplexity: "O(n)",
  spaceComplexity: "O(n)"
};

async function test() {
  try {
    console.log('Testing testcase generation...\n');
    console.log('Input data:', JSON.stringify(testData, null, 2));
    console.log('\nGenerating testcases...\n');
    
    const result = await generateTestcases(testData);
    
    console.log('✓ Successfully generated testcases!');
    console.log(`\nTotal testcases: ${result.testcases.length}`);
    
    // Count by type
    const baseCount = result.testcases.filter(tc => tc.type === 'base').length;
    const edgeCount = result.testcases.filter(tc => tc.type === 'edge').length;
    const largeCount = result.testcases.filter(tc => tc.type === 'large').length;
    
    console.log(`- Base cases: ${baseCount}`);
    console.log(`- Edge cases: ${edgeCount}`);
    console.log(`- Large cases: ${largeCount}`);
    
    // Show validation status
    if (result.testcases.length === 6) {
      console.log('\n✓ Perfect: Got all 6 test cases!');
    } else {
      console.log(`\n✓ Generated ${result.testcases.length} test cases (target: 6)`);
    }
    
    console.log('\nAll testcases:\n');
    result.testcases.forEach((tc, idx) => {
      console.log(`Testcase ${idx + 1} (${tc.type}):`);
      console.log(`Input: ${tc.input.substring(0, 100)}${tc.input.length > 100 ? '...' : ''}`);
      console.log(`Output: ${tc.output.substring(0, 100)}${tc.output.length > 100 ? '...' : ''}`);
      console.log('---');
    });
    
  } catch (error) {
    console.error('✗ Test failed:', error.message);
    console.error('Stack:', error.stack);
  }
}

test();
