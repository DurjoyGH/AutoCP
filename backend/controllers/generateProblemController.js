const Problem = require('../models/problem');
const { problemProvider } = require('../services/aiService');

const generateProblem = async (req, res) => {
  try {
    const { topics, rating, suggestion } = req.body;

    // Validation
    if (!topics || !Array.isArray(topics) || topics.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide at least one topic'
      });
    }

    if (!rating) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a difficulty rating'
      });
    }

    // Generate problem using Gemini AI
    const generatedProblemData = await problemProvider({
      topics,
      rating,
      suggestion: suggestion || ''
    });

    // Save problem to database
    const problem = new Problem({
      title: generatedProblemData.title,
      description: generatedProblemData.description,
      topics,
      rating,
      suggestion: suggestion || '',
      examples: generatedProblemData.examples,
      constraints: Array.isArray(generatedProblemData.constraints) 
        ? generatedProblemData.constraints.join('\n') 
        : generatedProblemData.constraints,
      hints: generatedProblemData.hints || [],
      tags: generatedProblemData.tags || [],
      difficulty: generatedProblemData.difficulty || rating,
      timeComplexity: generatedProblemData.timeComplexity,
      spaceComplexity: generatedProblemData.spaceComplexity,
      testCaseCount: generatedProblemData.testCaseCount || '5',
      approach: generatedProblemData.approach || '',
      keyInsights: generatedProblemData.keyInsights || [],
      isFavorited: false,
      generatedAt: new Date()
    });

    await problem.save();

    res.status(201).json({
      success: true,
      message: 'Problem generated successfully',
      data: problem
    });

  } catch (error) {
    console.error('Generate problem error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate problem',
      error: error.message
    });
  }
};


module.exports = {
  generateProblem,
};