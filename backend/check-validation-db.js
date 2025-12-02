const mongoose = require('mongoose');
const Problem = require('./models/problem');
require('dotenv').config();

async function checkValidationData() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log('Connected to MongoDB');

    // Find a problem with validation data
    const problem = await Problem.findOne({
      validationStatus: 'completed'
    }).select('validationReport');

    if (!problem) {
      console.log('No validated problems found');
      return;
    }

    console.log('\n=== Validation Report from DB ===');
    console.log('isValid:', problem.validationReport.isValid);
    console.log('Type:', typeof problem.validationReport.isValid);
    console.log();

    if (problem.validationReport.testCaseResults?.length > 0) {
      console.log('First test case:');
      console.log('testCaseNumber:', problem.validationReport.testCaseResults[0].testCaseNumber);
      console.log('isValid:', problem.validationReport.testCaseResults[0].isValid);
      console.log('Type:', typeof problem.validationReport.testCaseResults[0].isValid);
      console.log('Comparison === true:', problem.validationReport.testCaseResults[0].isValid === true);
      console.log('Comparison === false:', problem.validationReport.testCaseResults[0].isValid === false);
      console.log();
      
      // Check if toObject() changes anything
      const plainObj = problem.toObject();
      console.log('After toObject():');
      console.log('isValid:', plainObj.validationReport.testCaseResults[0].isValid);
      console.log('Type:', typeof plainObj.validationReport.testCaseResults[0].isValid);
    }

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
  }
}

checkValidationData();
