const express = require('express');
const router = express.Router();

const {
  generateProblem
} = require('../controllers/generateProblemController');

// Generate new problem
router.post('/', generateProblem);

module.exports = router;