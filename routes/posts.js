var express = require('express');
var Image = require('../models/image');
var ImageRouter = express.Router();
const multer = require('multer');

// Multer configuration
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    // Rejects storing a file
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

// Stores image in uploads folder
// using multer and creates a
// reference to the file
ImageRouter.route('/uploadmulter').post(
  upload.single('imageData'),
  (req, res, next) => {
    console.log(req.body);
    const newImage = new Image({
      imageName: req.body.imageName,
      imageData: req.file.path
    });

    newImage
      .save()
      .then(result => {
        console.log(result);
        res.status(200).json({
          success: true,
          document: result
        });
      })
      .catch(err => next(err));
  }
);

ImageRouter.route('/image/:image_id').get((req, res) => {
  try {
    const image = Image.findOne({
      image_id: req.params.id
    });

    res.render(image);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = ImageRouter;
