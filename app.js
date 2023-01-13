require('dotenv').config();
const express = require('express');
const app = express();

const ApiError = require('./src/utils/ApiError');
const httpStatus = require('http-status');

const cors = require('cors');

const { urbanAreaRoute } = require('./src/routes');

const { errorConverter, errorHandler } = require('./src/middleware/error');
const corsOptions = {
  origin: '*',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions)); // Use this after the variable declaration
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/v1', urbanAreaRoute);

app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

app.use(errorConverter);
app.use(errorHandler);

module.exports = app;
