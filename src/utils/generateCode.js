/**
 * Generate the random 6 -8 digit alphanumeric code
 * @returns the code
 */

export const generateCode = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; // 62
  const length = Math.floor(Math.random() * 3) + 6; // 6-8 characters
  let code = '';
  
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return code;
};




