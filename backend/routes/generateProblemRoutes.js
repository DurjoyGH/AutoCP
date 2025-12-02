const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const {
  generateNewProblem,
  getProblemHistory,
  getFavoriteProblems,
  toggleFavorite,
  getProblemById,
  deleteProblem
} = require('../controllers/generateProblemController');

// All routes require authentication
router.use(authMiddleware);

// Generate new problem
router.post('/', generateNewProblem);

// Get problem history - must be before /:id
router.get('/history', getProblemHistory);

// Get favorite problems - must be before /:id
router.get('/favorites', getFavoriteProblems);

// Toggle favorite status - must be before /:id
router.put('/:id/favorite', toggleFavorite);

// Delete problem
router.delete('/:id', deleteProblem);

// Get single problem by ID - must be last
router.get('/:id', getProblemById);

module.exports = router;