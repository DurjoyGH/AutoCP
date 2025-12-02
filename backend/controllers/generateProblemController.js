const Problem = require('../models/problem');
const { problemProvider } = require('../services/aiService');
const { validateTestCases } = require('../services/testCaseValidationService');
const yaml = require('js-yaml');

// Helper function to convert MongoDB document to plain object with string IDs
const convertProblemToPlainObject = (problem) => {
  const plainObj = problem.toObject();
  plainObj._id = plainObj._id.toString();
  if (plainObj.userId) {
    plainObj.userId = plainObj.userId.toString();
  }
  return plainObj;
};

// @desc    Generate a new problem using Gemini AI
// @route   POST /api/generate-problem
// @access  Private
const generateNewProblem = async (req, res) => {
  try {
    const { topics, rating, suggestion } = req.body;

    // Validation
    if (!topics || !Array.isArray(topics) || topics.length === 0) {
      return res.status(400)
        .set('Content-Type', 'application/x-yaml')
        .send(yaml.dump({
          success: false,
          message: 'Please provide at least one topic'
        }));
    }

    if (!rating) {
      return res.status(400)
        .set('Content-Type', 'application/x-yaml')
        .send(yaml.dump({
          success: false,
          message: 'Please provide a difficulty rating'
        }));
    }

    // Generate problem using Gemini AI
    const generatedProblemData = await problemProvider({
      topics,
      rating,
      suggestion: suggestion || ''
    });

    // Save problem to database with initial status
    const problem = new Problem({
      userId: req.user._id,
      title: generatedProblemData.title,
      description: generatedProblemData.description,
      topics,
      rating,
      suggestion: suggestion || '',
      examples: generatedProblemData.examples,
      constraints: generatedProblemData.constraints,
      hints: generatedProblemData.hints || [],
      tags: generatedProblemData.tags || [],
      difficulty: generatedProblemData.difficulty || rating,
      timeComplexity: generatedProblemData.timeComplexity,
      spaceComplexity: generatedProblemData.spaceComplexity,
      testCaseCount: generatedProblemData.testCaseCount || '5',
      approach: generatedProblemData.approach || '',
      keyInsights: generatedProblemData.keyInsights || [],
      isFavorited: false,
      validationStatus: 'running',
      testCases: [],
      generatedAt: new Date()
    });

    await problem.save();

    // Start async test case generation and validation (don't wait)
    generateAndValidateTestCases(problem._id, generatedProblemData).catch(err => {
      console.error('Background validation error:', err);
    });

    res.status(201)
      .set('Content-Type', 'application/x-yaml')
      .send(yaml.dump({
        success: true,
        message: 'Problem generated successfully. Test case validation in progress...',
        data: convertProblemToPlainObject(problem)
      }));

  } catch (error) {
    console.error('Generate problem error:', error);
    res.status(500)
      .set('Content-Type', 'application/x-yaml')
      .send(yaml.dump({
        success: false,
        message: 'Failed to generate problem',
        error: error.message
      }));
  }
};

// Helper function to generate and validate test cases in background
const generateAndValidateTestCases = async (problemId, problemData) => {
  try {
    console.log(`Starting test case validation for problem ${problemId}`);
    
    // Use the examples as test cases (AI already generated them!)
    const testCases = problemData.examples.map((example, index) => ({
      input: example.input,
      output: example.output,
      explanation: example.explanation || `Example ${index + 1}`
    }));
    
    console.log(`Using ${testCases.length} examples as test cases`);
    
    // Update problem with test cases
    await Problem.findByIdAndUpdate(problemId, {
      testCases: testCases
    });
    
    // Validate test cases
    console.log(`Starting validation for problem ${problemId}`);
    const validationReport = await validateTestCases({
      ...problemData,
      testCases: testCases
    });
    
    console.log(`Validation completed. Score: ${validationReport.overallScore}`);
    
    // Update problem with validation results
    await Problem.findByIdAndUpdate(problemId, {
      validationStatus: 'completed',
      validationReport: validationReport
    });
    
    console.log(`Validation report saved for problem ${problemId}`);
    
  } catch (error) {
    console.error(`Validation failed for problem ${problemId}:`, error);
    
    // Update problem with failed status
    await Problem.findByIdAndUpdate(problemId, {
      validationStatus: 'failed',
      'validationReport.summary': `Validation failed: ${error.message}`
    });
  }
};

// @desc    Get user's problem history
// @route   GET /api/generate-problem/history
// @access  Private
const getProblemHistory = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    
    const problems = await Problem.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-__v');

    const count = await Problem.countDocuments({ userId: req.user._id });

    res.status(200)
      .set('Content-Type', 'application/x-yaml')
      .send(yaml.dump({
        success: true,
        data: problems.map(p => convertProblemToPlainObject(p)),
        totalPages: Math.ceil(count / limit),
        currentPage: parseInt(page),
        total: count
      }));

  } catch (error) {
    console.error('Get problem history error:', error);
    res.status(500)
      .set('Content-Type', 'application/x-yaml')
      .send(yaml.dump({
        success: false,
        message: 'Failed to fetch problem history',
        error: error.message
      }));
  }
};

// @desc    Get user's favorite problems
// @route   GET /api/generate-problem/favorites
// @access  Private
const getFavoriteProblems = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    
    const problems = await Problem.find({ 
      userId: req.user._id,
      isFavorited: true 
    })
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-__v');

    const count = await Problem.countDocuments({ 
      userId: req.user._id,
      isFavorited: true 
    });

    res.status(200)
      .set('Content-Type', 'application/x-yaml')
      .send(yaml.dump({
        success: true,
        data: problems.map(p => convertProblemToPlainObject(p)),
        totalPages: Math.ceil(count / limit),
        currentPage: parseInt(page),
        total: count
      }));

  } catch (error) {
    console.error('Get favorite problems error:', error);
    res.status(500)
      .set('Content-Type', 'application/x-yaml')
      .send(yaml.dump({
        success: false,
        message: 'Failed to fetch favorite problems',
        error: error.message
      }));
  }
};

// @desc    Toggle favorite status of a problem
// @route   PUT /api/generate-problem/:id/favorite
// @access  Private
const toggleFavorite = async (req, res) => {
  try {
    const problem = await Problem.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!problem) {
      return res.status(404)
        .set('Content-Type', 'application/x-yaml')
        .send(yaml.dump({
          success: false,
          message: 'Problem not found'
        }));
    }

    problem.isFavorited = !problem.isFavorited;
    await problem.save();

    res.status(200)
      .set('Content-Type', 'application/x-yaml')
      .send(yaml.dump({
        success: true,
        message: problem.isFavorited ? 'Added to favorites' : 'Removed from favorites',
        data: convertProblemToPlainObject(problem)
      }));

  } catch (error) {
    console.error('Toggle favorite error:', error);
    res.status(500)
      .set('Content-Type', 'application/x-yaml')
      .send(yaml.dump({
        success: false,
        message: 'Failed to update favorite status',
        error: error.message
      }));
  }
};

// @desc    Get a single problem by ID
// @route   GET /api/generate-problem/:id
// @access  Private
const getProblemById = async (req, res) => {
  try {
    const problem = await Problem.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!problem) {
      return res.status(404)
        .set('Content-Type', 'application/x-yaml')
        .send(yaml.dump({
          success: false,
          message: 'Problem not found'
        }));
    }

    res.status(200)
      .set('Content-Type', 'application/x-yaml')
      .send(yaml.dump({
        success: true,
        data: convertProblemToPlainObject(problem)
      }));

  } catch (error) {
    console.error('Get problem by ID error:', error);
    res.status(500)
      .set('Content-Type', 'application/x-yaml')
      .send(yaml.dump({
        success: false,
        message: 'Failed to fetch problem',
        error: error.message
      }));
  }
};

// @desc    Delete a problem
// @route   DELETE /api/generate-problem/:id
// @access  Private
const deleteProblem = async (req, res) => {
  try {
    const problem = await Problem.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!problem) {
      return res.status(404)
        .set('Content-Type', 'application/x-yaml')
        .send(yaml.dump({
          success: false,
          message: 'Problem not found'
        }));
    }

    res.status(200)
      .set('Content-Type', 'application/x-yaml')
      .send(yaml.dump({
        success: true,
        message: 'Problem deleted successfully'
      }));

  } catch (error) {
    console.error('Delete problem error:', error);
    res.status(500)
      .set('Content-Type', 'application/x-yaml')
      .send(yaml.dump({
        success: false,
        message: 'Failed to delete problem',
        error: error.message
      }));
  }
};

// @desc    Get validation status and report for a problem
// @route   GET /api/generate-problem/:id/validation
// @access  Private
const getValidationStatus = async (req, res) => {
  try {
    console.log('getValidationStatus called with ID:', req.params.id);
    
    // Validate ObjectId format
    const mongoose = require('mongoose');
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      console.error('Invalid ObjectId format:', req.params.id);
      return res.status(400)
        .set('Content-Type', 'application/x-yaml')
        .send(yaml.dump({
          success: false,
          message: 'Invalid problem ID format'
        }));
    }

    const problem = await Problem.findOne({
      _id: req.params.id,
      userId: req.user._id
    }).select('validationStatus validationReport testCases');

    if (!problem) {
      console.error('Problem not found:', req.params.id);
      return res.status(404)
        .set('Content-Type', 'application/x-yaml')
        .send(yaml.dump({
          success: false,
          message: 'Problem not found'
        }));
    }

    console.log('Validation status:', problem.validationStatus);

    // Convert Mongoose document to plain object to ensure proper type serialization
    const problemData = problem.toObject();

    // Debug: Log the validation report structure
    if (problemData.validationReport?.testCaseResults?.length > 0) {
      console.log(`\nTotal test cases: ${problemData.validationReport.testCaseResults.length}`);
      console.log('All test case isValid values:');
      problemData.validationReport.testCaseResults.forEach((tc, idx) => {
        console.log(`  Test Case ${tc.testCaseNumber || (idx + 1)}: isValid = ${tc.isValid} (${typeof tc.isValid})`);
      });
      console.log();
    }

    const responseData = {
      success: true,
      data: {
        validationStatus: problemData.validationStatus,
        validationReport: problemData.validationReport,
        testCases: problemData.testCases
      }
    };

    // Log the actual YAML output (first 1000 chars)
    const yamlOutput = yaml.dump(responseData, {
      styles: {
        '!!bool': 'lowercase'
      }
    });
    console.log('YAML output (first 1000 chars):\n', yamlOutput.substring(0, 1000));
    console.log('\n');

    res.status(200)
      .set('Content-Type', 'application/x-yaml')
      .send(yamlOutput);

  } catch (error) {
    console.error('Get validation status error:', error);
    res.status(500)
      .set('Content-Type', 'application/x-yaml')
      .send(yaml.dump({
        success: false,
        message: 'Failed to fetch validation status',
        error: error.message
      }));
  }
};

module.exports = {
  generateNewProblem,
  getProblemHistory,
  getFavoriteProblems,
  toggleFavorite,
  getProblemById,
  deleteProblem,
  getValidationStatus
};