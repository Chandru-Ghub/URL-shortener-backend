import Link from '../models/Link.js';
import { validateURL } from '../utils/validateURL.js';
import { generateCode } from '../utils/generateCode.js';

/**
 * Create a new link
 * check for custom code and generate
 *
 * @param {object} req - The HTTP request object containing body data
 * @param {object} res - The HTTP response object used to send responses
 * @param {function} next - Function to pass errors to error-handling middleware
 * @returns {Promise<void>} Sends HTTP response with status code and data
 */
export const createLink = async (req, res, next) => {
  try {
    const { url, code } = req.body;

    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    if (!validateURL(url)) {
      return res.status(400).json({ error: 'Invalid URL' });
    }

    let linkCode = code;

    // If Custom received 
    if (linkCode) {
      // Validate code format: [A-Za-z0-9]{6,8}
      const codeRegex = /^[A-Za-z0-9]{6,8}$/;
      if (!codeRegex.test(linkCode)) {
        return res.status(400).json({ error: 'Code must be 6-8 alphanumeric characters' });
      }

      // Check if code already exists
      const existingLink = await Link.findOne({ code: linkCode });
      if (existingLink) {
        return res.status(409).json({ error: 'Code already exists' });
      }
    } else {
      // Generate unique code
      // ckeck for CODE duplication inside the collection
      let isUnique = false;
      while (!isUnique) {
        linkCode = generateCode();
        const existing = await Link.findOne({ code: linkCode });
        if (!existing) {
          isUnique = true;
        }
      };
    }

    // Create new document inside the collection
    const link = new Link({
      code: linkCode,
      url: url.trim()
    });

    // Saved the document inside the collection
    await link.save();

    res.status(201).json(link);
  } catch (error) {
    next(error);
  }
};


/**
 * Get all link
 *
 * @param {object} req - The HTTP request object containing body data
 * @param {object} res - The HTTP response object used to send responses
 * @param {function} next - Function to pass errors to error-handling middleware
 * @returns {Promise<void>} Sends HTTP response with status code and data (list of all URL)
 */
export const listLinks = async (req, res, next) => {
  try {
    const links = await Link.find().sort({ createdAt: -1 });  // sort field specifies descending order (newest first)
    res.json(links);
  } catch (error) {
    next(error);
  }
};


/**
 * Get link by CODE
 *
 * @param {object} req - The HTTP request object containing body data
 * @param {object} res - The HTTP response object used to send responses
 * @param {function} next - Function to pass errors to error-handling middleware
 * @returns {Promise<void>} Sends HTTP response with status code and data
 */
export const getLink = async (req, res, next) => {
  try {
    const { code } = req.params;
    const link = await Link.findOne({ code });

    if (!link) {
      return res.status(404).json({ error: 'Link not found' });
    }

    res.json(link);
  } catch (error) {
    next(error);
  }
};


/**
 * Delete link by CODE
 *
 * @param {object} req - The HTTP request object containing body data
 * @param {object} res - The HTTP response object used to send responses
 * @param {function} next - Function to pass errors to error-handling middleware
 * @returns {Promise<void>} Sends HTTP response with status code and data
 */
export const deleteLink = async (req, res, next) => {
  try {
    const { code } = req.params;
    const link = await Link.findOneAndDelete({ code });

    if (!link) {
      return res.status(404).json({ error: 'Link not found' });
    }

    res.json({ message: 'Link deleted successfully' });
  } catch (error) {
    next(error);
  }
};


/**
 * Redirect to the temporary URL
 *
 * @param {object} req - The HTTP request object containing body data
 * @param {object} res - The HTTP response object used to send responses
 * @param {function} next - Function to pass errors to error-handling middleware
 * @returns {Promise<void>} Sends HTTP response with status code and redirect URL
 */
export const redirectLink = async (req, res, next) => {
  try {
    const { code } = req.params;
    const link = await Link.findOne({ code });

    if (!link) {
      return res.status(404).json({ error: 'Link not found' });
    }

    // Increment clicks and update lastClicked
    link.clicks += 1;
    link.lastClicked = new Date();
    await link.save();

    res.status(302).redirect(link.url);
  } catch (error) {
    next(error);
  }
};

