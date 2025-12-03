const Testcase = require('../models/testcase');
const Problem = require('../models/problem');
const { generateTestcases } = require('../services/aiTestcaseService');

// @desc    Generate test cases for a problem using Gemini AI
// @route   POST /api/generate-testcase/generate/:problemId
// @access  Private
const generateNewTestcases = async (req, res) => {
  try {
    const { problemId } = req.params;

    // Check if problem exists and belongs to user
    const problem = await Problem.findOne({
      _id: problemId,
      userId: req.user._id
    });

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: 'Problem not found'
      });
    }

    // Check if testcases already exist
    const existingTestcases = await Testcase.findOne({
      problemId,
      userId: req.user._id
    });

    if (existingTestcases) {
      return res.status(200).json({
        success: true,
        message: 'Test cases already exist',
        data: existingTestcases.toObject()
      });
    }

    // Generate test cases using Gemini AI
    const generatedTestcaseData = await generateTestcases({
      problemTitle: problem.title,
      problemDescription: problem.description,
      constraints: problem.constraints,
      timeComplexity: problem.timeComplexity,
      spaceComplexity: problem.spaceComplexity
    });

    // Save test cases to database
    const testcases = new Testcase({
      problemId,
      userId: req.user._id,
      testcases: generatedTestcaseData.testcases,
      generatedAt: new Date()
    });

    await testcases.save();

    res.status(201).json({
      success: true,
      message: 'Test cases generated successfully',
      data: testcases.toObject()
    });

  } catch (error) {
    console.error('Generate testcases error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate test cases',
      error: error.message
    });
  }
};

// @desc    Get test cases for a problem
// @route   GET /api/generate-testcase/:problemId
// @access  Private
const getTestcases = async (req, res) => {
  try {
    const { problemId } = req.params;

    const testcases = await Testcase.findOne({
      problemId,
      userId: req.user._id
    });

    if (!testcases) {
      return res.status(404).json({
        success: false,
        message: 'Test cases not found'
      });
    }

    res.status(200).json({
      success: true,
      data: testcases.toObject()
    });

  } catch (error) {
    console.error('Get testcases error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch test cases',
      error: error.message
    });
  }
};

// @desc    Delete test cases
// @route   DELETE /api/generate-testcase/:problemId
// @access  Private
const deleteTestcases = async (req, res) => {
  try {
    const { problemId } = req.params;

    const testcases = await Testcase.findOneAndDelete({
      problemId,
      userId: req.user._id
    });

    if (!testcases) {
      return res.status(404).json({
        success: false,
        message: 'Test cases not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Test cases deleted successfully'
    });

  } catch (error) {
    console.error('Delete testcases error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete test cases',
      error: error.message
    });
  }
};

// @desc    Regenerate test cases for a problem
// @route   PUT /api/generate-testcase/regenerate/:problemId
// @access  Private
const regenerateTestcases = async (req, res) => {
  try {
    const { problemId } = req.params;

    // Check if problem exists and belongs to user
    const problem = await Problem.findOne({
      _id: problemId,
      userId: req.user._id
    });

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: 'Problem not found'
      });
    }

    // Generate new test cases using Gemini AI
    const generatedTestcaseData = await generateTestcases({
      problemTitle: problem.title,
      problemDescription: problem.description,
      constraints: problem.constraints,
      timeComplexity: problem.timeComplexity,
      spaceComplexity: problem.spaceComplexity
    });

    // Update or create test cases in database
    const testcases = await Testcase.findOneAndUpdate(
      { problemId, userId: req.user._id },
      {
        testcases: generatedTestcaseData.testcases,
        generatedAt: new Date()
      },
      { new: true, upsert: true }
    );

    res.status(200).json({
      success: true,
      message: 'Test cases regenerated successfully',
      data: testcases.toObject()
    });

  } catch (error) {
    console.error('Regenerate testcases error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to regenerate test cases',
      error: error.message
    });
  }
};

module.exports = {
  generateNewTestcases,
  getTestcases,
  deleteTestcases,
  regenerateTestcases
};
