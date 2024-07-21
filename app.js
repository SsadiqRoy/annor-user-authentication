const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
const origin = ['http://localhost:8100'];

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin }));
app.use(cookieParser());

const globalError = require('./utils/globalError');
const userRoutes = require('./routes/userRoutes');

app.use('/api/users', userRoutes);

app.use('*', (req, res) => {
  res.status(404).json({
    status: 'failed',
    message: `No url found for ${req.originalUrl}`,
    url: req.originalUrl,
  });
});

app.use(globalError);

module.exports = app;
