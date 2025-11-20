// Erroe handler middleware have 4 parameters (err) catch the error and return
export const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  }

  if (err.name === 'MongoServerError' && err.code === 11000) {
    return res.status(409).json({ error: 'Code already exists' });
  }

  if (err.status) {
    return res.status(err.status).json({ error: err.message });
  }

  res.status(500).json({ error: 'Internal server error' });
};

