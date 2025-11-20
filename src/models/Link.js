import mongoose from 'mongoose';

const linkSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  url: {
    type: String,
    required: true,
    trim: true
  },
  clicks: {
    type: Number,
    default: 0
  },
  lastClicked: {
    type: Date,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Link', linkSchema);

