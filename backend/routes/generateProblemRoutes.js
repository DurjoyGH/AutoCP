const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const {
  generateNewProblem,
  getProblemHistory,
  getFavoriteProblems,
  toggleFavorite,
  getProblemById,
  deleteProblem,
  getValidationStatus
} = require('../controllers/generateProblemController');

// All routes require authentication
router.use(authMiddleware);

// Generate new problem
router.post('/', generateNewProblem);

// Get problem history
router.get('/history', getProblemHistory);

// Get favorite problems
router.get('/favorites', getFavoriteProblems);

// Get validation status for a problem (MUST be before /:id route)
router.get('/:id/validation', getValidationStatus);

// Toggle favorite status
router.put('/:id/favorite', toggleFavorite);

// Get single problem by ID
router.get('/:id', getProblemById);

// Delete problem
router.delete('/:id', deleteProblem);

module.exports = router;