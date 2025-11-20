import { STATUS } from '../constants/statuscode.js';

// Erroe handler middleware have 4 parameters (err) catch the error and return
export const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.name === 'ValidationError') {
    return res.status(STATUS.BAD_REQUEST).json({ error: err.message });
  }

  if (err.name === 'MongoServerError' && err.code === 11000) {
    return res.status(STATUS.CONFLICT).json({ error: 'Code already exists' });
  }

  if (err.status) {
    return res.status(err.status).json({ error: err.message });
  }

  res.status(STATUS.SERVER_ERROR).json({ error: 'Internal server error' });
};

