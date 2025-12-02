const mongoose = require('mongoose');

const exampleSchema = new mongoose.Schema({
  input: {
    type: String,
    required: true
  },
  output: {
    type: String,
    required: true
  },
  explanation: {
    type: String,
    required: true
  }
}, { _id: false });

const problemSchema = new mongoose.Schema({
  // User who generated this problem
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Problem metadata
  title: {
    type: String,
    required: true,
    trim: true
  },
  
  description: {
    type: String,
    required: true
  },
  
  // Input parameters used for generation
  topics: [{
    type: String,
    required: true
  }],
  
  rating: {
    type: String,
    required: true
  },
  
  suggestion: {
    type: String,
    default: ''
  },
  
  // Generated problem content
  examples: [exampleSchema],
  
  constraints: [{
    type: String
  }],
  
  hints: [{
    type: String
  }],
  
  tags: [{
    type: String
  }],
  
  difficulty: {
    type: String,
    required: true
  },
  
  timeComplexity: {
    type: String,
    required: true
  },
  
  spaceComplexity: {
    type: String,
    required: true
  },
  
  testCaseCount: {
    type: String,
    default: '5'
  },
  
  approach: {
    type: String,
    default: ''
  },
  
  keyInsights: [{
    type: String
  }],
  
  // User interaction
  isFavorited: {
    type: Boolean,
    default: false
  },
  
  // Test Case Validation
  testCases: [{
    input: String,
    output: String,
    explanation: String
  }],
  
  validationStatus: {
    type: String,
    enum: ['pending', 'running', 'completed', 'failed'],
    default: 'pending'
  },
  
  validationReport: {
    isValid: {
      type: Boolean,
      default: false
    },
    overallScore: {
      type: Number,
      default: 0
    },
    summary: {
      type: String,
      default: ''
    },
    testCaseResults: [{
      testCaseNumber: Number,
      isValid: Boolean,
      explanation: String,
      issues: [String]
    }],
    validatedAt: Date
  },
  
  // Metadata
  generatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for efficient queries
problemSchema.index({ userId: 1, createdAt: -1 });
problemSchema.index({ userId: 1, isFavorited: 1 });
problemSchema.index({ topics: 1 });
problemSchema.index({ rating: 1 });

const Problem = mongoose.model('Problem', problemSchema);

module.exports = Problem;