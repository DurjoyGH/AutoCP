const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const {
  generateNewTestcases,
  getTestcases,
  deleteTestcases,
  regenerateTestcases
} = require('../controllers/generateTestcaseController');

// All routes require authentication
router.use(authMiddleware);

// Generate new test cases for a problem
router.post('/generate/:problemId', generateNewTestcases);

// Get test cases for a problem
router.get('/:problemId', getTestcases);

// Delete test cases
router.delete('/:problemId', deleteTestcases);

// Regenerate test cases for a problem
router.put('/regenerate/:problemId', regenerateTestcases);

module.exports = router;
