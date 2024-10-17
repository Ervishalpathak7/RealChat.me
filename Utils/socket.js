import { Server } from "socket.io";
import Message from "../Schemas/message.js";

const onlineUsers = new Map();

// Function to check and return the user's WebSocket connection
function getUserSocket(userId, io) {
  const socketId = onlineUsers.get(userId);
  if (socketId) {
    return io.sockets.sockets.get(socketId); // Get the socket object for the user if they are online
  }
  return null; // Return null if user is not online
}

export const initializeSocket = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    socket.on('join', (userId) => {
      onlineUsers.set(userId, socket.id); // Store the user's socket ID
      console.log(`User ${userId} joined with socket ID ${socket.id}`);
    });

    // Event for sending a message
    socket.on('sendmessage', async (message) => {
      const { senderId, receiverId, text } = message; // Destructure the message object
      const receiverSocket = getUserSocket(receiverId, io); // Check if the recipient is online

      // If recipient is online, send them the message
      if (receiverSocket) {
        receiverSocket.emit('message', { senderId, receiverId, text }); // Emit the message to the recipient's socket
      }

      // Save the message to the database
      try {
        const newMessage = new Message({
          senderId,
          receiverId,
          message: text,
        });
    //     await newMessage.save();
        console.log('Message saved:', newMessage);
      } catch (error) {
        console.error('Error saving message:', error);
      }
     });

    // Event when user disconnects
    socket.on('disconnect', () => {
      onlineUsers.forEach((socketId, userId) => {
        if (socketId === socket.id) {
          onlineUsers.delete(userId); // Remove the user from the online users map
          console.log(`User ${userId} disconnected`);
        }
      });
    });
  });

  return io;
};

export default initializeSocket;
