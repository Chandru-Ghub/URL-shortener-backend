/**
 * Validate the given URL
 * @param {String} url 
 * @returns boolean
 */
export const validateURL = (url) => {
  if (!url || typeof url !== 'string') {
    return false;
  }

  try {
    // Converts it into a structured URL object 
    // Makes it easy to access parts of the URL
    const urlObj = new URL(url);
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch (error) {
    return false;
  }
};

