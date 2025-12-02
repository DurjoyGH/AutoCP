const express = require('express');
const router = express.Router();

const {
  generateProblem
} = require('../controllers/generateProblemController');

// Generate new problem
router.post('/generate-problem', generateProblem);

module.exports = router;