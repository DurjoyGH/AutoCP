const yaml = require('js-yaml');

console.log('=== Testing YAML Boolean Serialization ===\n');

const testData = {
  success: true,
  data: {
    validationReport: {
      isValid: true,
      overallScore: 100,
      testCaseResults: [
        {
          testCaseNumber: 1,
          isValid: true,
          issues: []
        },
        {
          testCaseNumber: 2,
          isValid: false,
          issues: ['Some issue']
        }
      ]
    }
  }
};

console.log('Original data:');
console.log('testCaseResults[0].isValid:', testData.data.validationReport.testCaseResults[0].isValid);
console.log('Type:', typeof testData.data.validationReport.testCaseResults[0].isValid);
console.log();

// Dump to YAML
const yamlString = yaml.dump(testData);
console.log('YAML output:');
console.log(yamlString);
console.log();

// Load back from YAML
const parsedData = yaml.load(yamlString, { json: true });
console.log('Parsed data:');
console.log('testCaseResults[0].isValid:', parsedData.data.validationReport.testCaseResults[0].isValid);
console.log('Type:', typeof parsedData.data.validationReport.testCaseResults[0].isValid);
console.log('Comparison === true:', parsedData.data.validationReport.testCaseResults[0].isValid === true);
console.log('Comparison === false:', parsedData.data.validationReport.testCaseResults[0].isValid === false);
console.log();

console.log('testCaseResults[1].isValid:', parsedData.data.validationReport.testCaseResults[1].isValid);
console.log('Type:', typeof parsedData.data.validationReport.testCaseResults[1].isValid);
console.log('Comparison === false:', parsedData.data.validationReport.testCaseResults[1].isValid === false);
