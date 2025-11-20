
import dotenv from 'dotenv';
dotenv.config();

import connectDB from './config/config.js';
import app from './app.js';


const PORT = process.env.PORT || 5000;

// Connect to DataBase
connectDB();

// Start Server 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}).on('error', (err) => {  // Catches error if port already in use
  console.error('Server failed to start:', err);
});





