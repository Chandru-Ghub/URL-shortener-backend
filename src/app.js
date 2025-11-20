import express from 'express';
import cors from 'cors';
import linksRouter from './routes/links.js';
import { errorHandler } from './middleware/errorHandler.js';
import { redirectLink } from './controllers/linkController.js';
import {STATUS} from './constants/statuscode.js'

// initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/healthz', (req, res) => {
  res.status(STATUS.OK).json({ status: 'OK' });
});

// API routes
app.use('/api/links', linksRouter);

// Redirect route (must be after /api/links)
app.get('/:code', redirectLink);

// Error handler middleware have 4 parameters
app.use(errorHandler);



export default app;
