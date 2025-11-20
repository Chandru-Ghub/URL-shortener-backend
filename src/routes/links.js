import express from 'express';
import {
  createLink,
  listLinks,
  getLink, 
  deleteLink,
  redirectLink
} from '../controllers/linkController.js';

const router = express.Router();


// Generate Link route
router.post('/', createLink);

// Get Link route
router.get('/', listLinks);

// Get Link by CODE route
router.get('/:code', getLink);

// Delete Link by CODE route
router.delete('/:code', deleteLink);

export default router;

