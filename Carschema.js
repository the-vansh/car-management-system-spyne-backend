const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  tags: {
    type: [String],
    required: true
  },
  images: {
    type: [Buffer],  // Array of image buffers
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Car', carSchema);
