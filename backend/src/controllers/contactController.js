const Contact = require('../models/Contact');

// @desc    Get all contact submissions
// @route   GET /api/contact
// @access  Private
const getAll = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    console.error('Get contacts error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create contact submission
// @route   POST /api/contact
// @access  Public
const create = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ message: 'Please fill in all required fields' });
    }

    await Contact.create({
      name,
      email,
      subject,
      message,
    });

    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Create contact error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Mark contact as read
// @route   PATCH /api/contact/:id/read
// @access  Private
const markAsRead = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    contact.read = true;
    await contact.save();

    res.json(contact);
  } catch (error) {
    console.error('Mark as read error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete contact
// @route   DELETE /api/contact/:id
// @access  Private
const remove = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    await Contact.findByIdAndDelete(req.params.id);

    res.json({ message: 'Contact removed' });
  } catch (error) {
    console.error('Delete contact error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getAll, create, markAsRead, remove };
