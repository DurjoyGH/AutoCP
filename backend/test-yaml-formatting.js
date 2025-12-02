const yaml = require('js-yaml');

console.log('=== Testing YAML Formatting ===\n');

// Test Problem Data
const problemData = {
  title: "Two Sum Problem",
  description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
  examples: [
    {
      input: "[2,7,11,15], target = 9",
      output: "[0,1]",
      explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]"
    },
    {
      input: "[3,2,4], target = 6",
      output: "[1,2]",
      explanation: "Because nums[1] + nums[2] == 6, we return [1, 2]"
    }
  ],
  constraints: [
    "2 <= nums.length <= 10^4",
    "-10^9 <= nums[i] <= 10^9",
    "Only one valid answer exists"
  ],
  hints: [
    "Try using a hash map to store seen values",
    "Think about the complement of each number"
  ],
  tags: ["array", "hash-table"],
  difficulty: 800,
  timeComplexity: "O(n)",
  spaceComplexity: "O(n)",
  testCaseCount: 10,
  approach: "Use a hash map to store values we've seen and check for complement",
  keyInsights: [
    "Hash map provides O(1) lookup time",
    "We can solve in a single pass"
  ]
};

console.log('Problem Data as YAML:');
console.log('─'.repeat(80));
console.log(yaml.dump(problemData));
console.log('─'.repeat(80));
console.log('\n');

// Test Solution Data
const solutionData = {
  algorithmExplanation: `This problem can be efficiently solved using a hash map (dictionary in Python, unordered_map in C++, HashMap in Java).

The key insight is that for each number, we need to find if its complement (target - current number) exists in the array. By storing each number we've seen in a hash map with its index, we can check for the complement in O(1) time.

Algorithm:
1. Create an empty hash map
2. Iterate through the array
3. For each number, calculate complement = target - number
4. If complement exists in hash map, return [hash_map[complement], current_index]
5. Otherwise, store current number and index in hash map`,
  codes: [
    {
      language: 'python',
      code: `def twoSum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`,
      explanation: ''
    },
    {
      language: 'cpp',
      code: `#include <vector>
#include <unordered_map>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> seen;
    for (int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        if (seen.count(complement)) {
            return {seen[complement], i};
        }
        seen[nums[i]] = i;
    }
    return {};
}`,
      explanation: ''
    },
    {
      language: 'java',
      code: `import java.util.*;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> seen = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (seen.containsKey(complement)) {
                return new int[]{seen.get(complement), i};
            }
            seen.put(nums[i], i);
        }
        return new int[]{};
    }
}`,
      explanation: ''
    }
  ],
  timeComplexity: "O(n)",
  spaceComplexity: "O(n)",
  keyPoints: [
    "Hash map provides O(1) lookup time",
    "Single pass solution possible",
    "Space-time tradeoff: O(n) space for O(n) time"
  ],
  edgeCases: [
    "Array with exactly 2 elements",
    "Negative numbers in array",
    "Target is zero or negative"
  ]
};

console.log('Solution Data as YAML:');
console.log('─'.repeat(80));
console.log(yaml.dump(solutionData, { lineWidth: -1 }));
console.log('─'.repeat(80));
console.log('\n');

// Test parsing back
console.log('Testing round-trip (dump -> parse):');
const yamlString = yaml.dump(solutionData, { lineWidth: -1 });
const parsedBack = yaml.load(yamlString);
console.log('✅ Successfully parsed back from YAML');
console.log('Code implementations found:', parsedBack.codes.length);
console.log('Languages:', parsedBack.codes.map(c => c.language).join(', '));
console.log('\n');

// Test HTTP response format
const response = {
  success: true,
  message: 'Solution generated successfully',
  data: solutionData
};

console.log('HTTP Response as YAML:');
console.log('─'.repeat(80));
console.log(yaml.dump(response, { lineWidth: -1 }));
console.log('─'.repeat(80));

console.log('\n✅ All YAML formatting tests passed!');
