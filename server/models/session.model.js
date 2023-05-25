// Session.model.js
import mongoose from 'mongoose';

export const sessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  token: {
    type: String,
    required: true
  }
});

// const SessionModel = mongoose.model('Session', sessionSchema);

export default mongoose.model.Sessions || mongoose.model('Session', sessionSchema);
