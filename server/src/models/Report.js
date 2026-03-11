import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({

  category: { 
    type: String, 
    required: true 
  },
  urgency: { 
    type: String, 
    required: true,
    enum: ['low', 'medium', 'high'] 
  },
  message: { 
    type: String, 
    required: true 
  },
  

  imagePath: { 
    type: String, 
    default: null 
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  sourceType: { 
    type: String, 
    default: 'manual' 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

const Report = mongoose.model('Report', reportSchema);

export default Report;