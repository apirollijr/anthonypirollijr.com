const Website = require('../models/Websites');

// @desc    Get all websites
// @route   GET /api/websites
// @access  Public
const getAll = async (req, res) => {
  try {
    const websites = await Website.find().sort({ order: 1, createdAt: -1 });
    res.json(websites);
  } catch (error) {
    console.error('Get websites error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single website
// @route   GET /api/websites/:id
// @access  Public
const getOne = async (req, res) => {
  try {
    const website = await Website.findById(req.params.id);

    if (!website) {
      return res.status(404).json({ message: 'Website not found' });
    }

    res.json(website);
  } catch (error) {
    console.error('Get website error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create website
// @route   POST /api/websites
// @access  Private
const create = async (req, res) => {
  try {
    const {
      title,
      description,
      url,
      imageUrl,
      readmeUrl,
      technologies,
      featured,
      order,
      status,
    } = req.body;

    const website = await Website.create({
      title,
      description,
      url,
      imageUrl,
      readmeUrl,
      technologies,
      featured,
      order,
      status,
    });

    res.status(201).json(website);
  } catch (error) {
    console.error('Create website error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update website
// @route   PUT /api/websites/:id
// @access  Private
const update = async (req, res) => {
  try {
    const website = await Website.findById(req.params.id);

    if (!website) {
      return res.status(404).json({ message: 'Website not found' });
    }

    const updatedWebsite = await Website.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updatedWebsite);
  } catch (error) {
    console.error('Update website error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete website
// @route   DELETE /api/websites/:id
// @access  Private
const remove = async (req, res) => {
  try {
    const website = await Website.findById(req.params.id);

    if (!website) {
      return res.status(404).json({ message: 'Website not found' });
    }

    await Website.findByIdAndDelete(req.params.id);

    res.json({ message: 'Website removed' });
  } catch (error) {
    console.error('Delete website error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getAll, getOne, create, update, remove };
