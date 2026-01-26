const express = require('express');
const router = express.Router();
const {
  getAll,
  create,
  markAsRead,
  remove,
} = require('../controllers/contactController');
const { protect } = require('../middleware/authMiddleware');

// Public route (visitors submit form)
router.post('/', create);

// Protected routes (admin only)
router.get('/', protect, getAll);
router.patch('/:id/read', protect, markAsRead);
router.delete('/:id', protect, remove);

module.exports = router;
