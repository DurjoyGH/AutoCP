const Testcase = require('../models/testcase');
const Problem = require('../models/problem');
const pregeneratedTestcases = require('../pregenerated/testcases');

// Generate new testcases for a problem
const generateNewTestcases = async (req, res) => {
  try {
    const { problemId } = req.params;
    const userId = req.user._id;

    // Check if problem exists
    const problem = await Problem.findById(problemId);
    if (!problem) {
      return res.status(404).json({
        success: false,
        message: 'Problem not found'
      });
    }

    // Check if user already has testcases for this problem
    const existingTestcases = await Testcase.findOne({ problemId, userId });
    if (existingTestcases) {
      return res.status(200).json({
        success: true,
        message: 'Testcases already exist for this problem',
        data: existingTestcases
      });
    }

    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, Math.random() * 2000 + 5000)); // 5-7 seconds delay

    const testcaseData = pregeneratedTestcases[problem.title];

    if (!testcaseData) {
        return res.status(404).json({
            success: false,
            message: 'Pregenerated test cases not found for this problem'
        });
    }

    const formattedTestcases = testcaseData.map(tc => ({
        type: 'basic', // Assuming all are basic for now
        input: Array.isArray(tc.input) ? tc.input.join(', ') : tc.input,
        output: tc.output.toString()
    }));

    // Save testcases to database
    const newTestcases = new Testcase({
      problemId,
      userId,
      testcases: formattedTestcases
    });

    await newTestcases.save();

    res.status(201).json({
      success: true,
      message: 'Testcases generated successfully',
      data: newTestcases
    });

  } catch (error) {
    console.error('Generate testcases error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to generate testcases'
    });
  }
};

// Get testcases for a problem
const getTestcases = async (req, res) => {
  try {
    const { problemId } = req.params;
    const userId = req.user._id;

    const testcases = await Testcase.findOne({ problemId, userId });

    if (!testcases) {
      return res.status(404).json({
        success: false,
        message: 'Testcases not found. Generate them first.'
      });
    }

    res.status(200).json({
      success: true,
      data: testcases
    });

  } catch (error) {
    console.error('Get testcases error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch testcases'
    });
  }
};

// Delete testcases for a problem
const deleteTestcases = async (req, res) => {
  try {
    const { problemId } = req.params;
    const userId = req.user._id;

    const testcases = await Testcase.findOneAndDelete({ problemId, userId });

    if (!testcases) {
      return res.status(404).json({
        success: false,
        message: 'Testcases not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Testcases deleted successfully'
    });

  } catch (error) {
    console.error('Delete testcases error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete testcases'
    });
  }
};

// Regenerate testcases (delete old and create new)
const regenerateTestcases = async (req, res) => {
  try {
    const { problemId } = req.params;
    const userId = req.user._id;

    // Delete existing testcases
    await Testcase.findOneAndDelete({ problemId, userId });

    // Get problem details
    const problem = await Problem.findById(problemId);
    if (!problem) {
      return res.status(404).json({
        success: false,
        message: 'Problem not found'
      });
    }

    // Generate new testcases
    const testcaseData = await generateTestcases({
      problemTitle: problem.title,
      problemDescription: problem.description,
      examples: problem.examples || [],
      constraints: problem.constraints,
      inputFormat: problem.inputFormat,
      outputFormat: problem.outputFormat
    });

    // Save new testcases
    const newTestcases = new Testcase({
      problemId,
      userId,
      testcases: testcaseData.testcases
    });

    await newTestcases.save();

    res.status(201).json({
      success: true,
      message: 'Testcases regenerated successfully',
      data: newTestcases
    });

  } catch (error) {
    console.error('Regenerate testcases error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to regenerate testcases'
    });
  }
};

module.exports = {
  generateNewTestcases,
  getTestcases,
  deleteTestcases,
  regenerateTestcases
};
