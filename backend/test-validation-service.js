// Quick test to verify test case validation service
const { validateTestCases, generateTestCases } = require('./services/testCaseValidationService');

const testProblemData = {
  title: "Two Sum Problem",
  description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
  constraints: [
    "2 <= nums.length <= 10^4",
    "-10^9 <= nums[i] <= 10^9",
    "-10^9 <= target <= 10^9",
    "Only one valid answer exists"
  ],
  timeComplexity: "O(n)",
  spaceComplexity: "O(n)",
  examples: [
    {
      input: "nums = [2,7,11,15], target = 9",
      output: "[0,1]",
      explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]"
    },
    {
      input: "nums = [3,2,4], target = 6",
      output: "[1,2]",
      explanation: "Because nums[1] + nums[2] == 6, we return [1, 2]"
    }
  ],
  testCaseCount: 5
};

async function testValidation() {
  console.log('🚀 Testing Test Case Validation Service\n');
  console.log('=' .repeat(60));
  
  try {
    // Step 1: Generate test cases
    console.log('\n📝 Step 1: Generating test cases...');
    const testCases = await generateTestCases(testProblemData);
    console.log(`✅ Generated ${testCases.length} test cases\n`);
    
    testCases.forEach((tc, i) => {
      console.log(`Test Case ${i + 1}:`);
      console.log(`  Input: ${tc.input.substring(0, 50)}...`);
      console.log(`  Output: ${tc.output}`);
    });
    
    // Step 2: Validate test cases
    console.log('\n\n🔍 Step 2: Validating test cases...');
    const validationReport = await validateTestCases({
      ...testProblemData,
      testCases: testCases
    });
    
    console.log('\n' + '=' .repeat(60));
    console.log('📊 VALIDATION REPORT');
    console.log('=' .repeat(60));
    console.log(`\n✅ Valid: ${validationReport.isValid}`);
    console.log(`📈 Overall Score: ${validationReport.overallScore}/100`);
    console.log(`📝 Summary: ${validationReport.summary}\n`);
    
    if (validationReport.strengths?.length > 0) {
      console.log('💪 STRENGTHS:');
      validationReport.strengths.forEach((s, i) => console.log(`  ${i + 1}. ${s}`));
      console.log();
    }
    
    if (validationReport.weaknesses?.length > 0) {
      console.log('⚠️  WEAKNESSES:');
      validationReport.weaknesses.forEach((w, i) => console.log(`  ${i + 1}. ${w}`));
      console.log();
    }
    
    if (validationReport.recommendations?.length > 0) {
      console.log('💡 RECOMMENDATIONS:');
      validationReport.recommendations.forEach((r, i) => console.log(`  ${i + 1}. ${r}`));
      console.log();
    }
    
    if (validationReport.testCaseResults?.length > 0) {
      console.log('🔍 TEST CASE ANALYSIS:');
      validationReport.testCaseResults.forEach((result) => {
        console.log(`\n  Test Case ${result.testCaseNumber}: ${result.isValid ? '✅ VALID' : '❌ INVALID'}`);
        if (result.issues?.length > 0) {
          console.log('    Issues:');
          result.issues.forEach(issue => console.log(`      - ${issue}`));
        }
        if (result.suggestions?.length > 0) {
          console.log('    Suggestions:');
          result.suggestions.forEach(sug => console.log(`      - ${sug}`));
        }
      });
    }
    
    console.log('\n' + '=' .repeat(60));
    console.log('✅ Test completed successfully!');
    console.log('=' .repeat(60));
    
  } catch (error) {
    console.error('\n❌ Error during testing:');
    console.error(error.message);
    console.error('\nStack trace:');
    console.error(error.stack);
  }
}

// Run the test if executed directly
if (require.main === module) {
  testValidation();
}

module.exports = { testValidation };
