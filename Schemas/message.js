import mongoose from 'mongoose';


const messageSchema = new mongoose.Schema({
    senderId: {
        type: String,
        required: true, // Ensure this is required if needed
      },
      receiverId: {
        type: String,
        required: true, // Ensure this is required if needed
      },
      message: {
        type: String,
        required: true, // This should be required
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    });
    


const Message = mongoose.model('Message', messageSchema);

export default Message;
