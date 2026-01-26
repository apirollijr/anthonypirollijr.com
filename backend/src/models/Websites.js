const mongoose = require('mongoose');

const websiteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    url: {
      type: String,
      required: [true, 'URL is required'],
      trim: true,
    },
    imageUrl: {
      type: String,
      trim: true,
    },
    readmeUrl: {
      type: String,
      trim: true,
    },
    technologies: [
      {
        type: String,
        trim: true,
      },
    ],
    featured: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['live', 'archived', 'in-progress'],
      default: 'live',
    },
  },
  {
    timestamps: true, // createdAt replaces your "date created"
  }
);

const Website = mongoose.model('Website', websiteSchema);

module.exports = Website;
