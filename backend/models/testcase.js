const mongoose = require('mongoose');

const testcaseItemSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['base', 'edge', 'large'],
    required: true
  },
  input: {
    type: String,
    required: true
  },
  output: {
    type: String,
    required: true
  }
}, { _id: false });

const testcaseSchema = new mongoose.Schema({
  // Reference to the problem
  problemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Problem',
    required: true
  },
  
  // User who generated these testcases
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Generated test cases
  testcases: [testcaseItemSchema],
  
  // Metadata
  generatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for efficient queries
testcaseSchema.index({ problemId: 1, userId: 1 }, { unique: true });
testcaseSchema.index({ userId: 1, createdAt: -1 });

const Testcase = mongoose.model('Testcase', testcaseSchema);

module.exports = Testcase;
