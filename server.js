const express = require('express');
const bodyParser = require('body-parser');

var ImageRouter = require('./routes/posts');

// Keeps the connection string in a different directory
const connectDB = require('./config/db');

// Init app
const app = express();

// Connect to Database
connectDB();

// Set global app headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', '*');
  return next();
});

// Init middleware
app.use(express.json({ extended: false }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Reference to 'uploads' folder
app.use('./uploads', express.static('uploads'));

// Define routes
app.use('/posts', ImageRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
