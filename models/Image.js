const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  imageName: {
    type: String,
    default: 'none',
    required: true
  },
  imageData: {
    type: String,
    required: true
  }
});

module.exports = Image = mongoose.model('Image', ImageSchema);
