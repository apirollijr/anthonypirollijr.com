const express = require('express');
const router = express.Router();
const {
  getAll,
  getOne,
  create,
  update,
  remove,
} = require('../controllers/websiteController');
const { protect } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getAll);
router.get('/:id', getOne);

// Protected routes (admin only)
router.post('/', protect, create);
router.put('/:id', protect, update);
router.delete('/:id', protect, remove);

module.exports = router;
