# Real-Time Chat System with Voice and Video Call

## Overview

The **Real-Time Chat System with Voice and Video Call** is a dynamic, web-based communication platform developed using the **MERN Stack** (MongoDB, Express.js, React.js, Node.js) and enhanced with **Socket.io** for real-time messaging and **WebRTC** for voice and video calls. The application allows users to engage in seamless text-based conversations, make voice calls, and initiate video conferencing – all in real time.

This platform provides a comprehensive, interactive solution for users who need efficient communication in a single application.

---

## Features

- **Real-Time Messaging**: Instant messaging between users with live updates using **Socket.io**.
- **Voice Calls**: High-quality voice calling between users, implemented using **WebRTC**.
- **Video Calls**: Real-time video conferencing with support for multiple participants.
- **User Authentication**: Secure login system (sign up, sign in) for user identification.
- **Responsive UI**: A modern, mobile-friendly interface built with **React.js**.
- **Real-Time Notifications**: Push notifications for new messages and incoming calls.
- **File Sharing**: Share images, videos, and other files during conversations.
- **User Profiles**: Option to customize user profile information and status.
- **Offline Support**: Messages are stored in MongoDB and delivered when users are online.

---

## Tech Stack

- **MongoDB**: NoSQL database to store user data, messages, and media files.
- **Express.js**: Web application framework for building the backend server.
- **React.js**: Frontend JavaScript library for creating the user interface.
- **Node.js**: JavaScript runtime environment for building the server-side application.
- **Socket.io**: Enables real-time, bidirectional communication between clients and the server.
- **WebRTC**: Provides peer-to-peer communication for voice and video calls.
- **JWT (JSON Web Token)**: For secure user authentication and session management.

---

## Installation

### Prerequisites

Ensure you have the following installed on your system:

- **Node.js**: [Download and Install Node.js](https://nodejs.org/)
- **MongoDB**: [Download and Install MongoDB](https://www.mongodb.com/try/download/community)
- **npm**: Node package manager (usually installed with Node.js)

### Clone the Repository

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/yourusername/realtime-chat-app.git
   cd realtime-chat-app
   ```

### Backend Setup

1. Navigate to the `server` folder:

   ```bash
   cd server
   ```

2. Install the required dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root of the `server` folder to store your environment variables:

   ```bash
   touch .env
   ```

4. Add your MongoDB URI and any other necessary credentials to the `.env` file:

   ```bash
   MONGO_URI=mongodb://localhost:27017/realtime-chat
   JWT_SECRET=your_jwt_secret_key
   ```

5. Start the backend server:

   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the `client` folder:

   ```bash
   cd client
   ```

2. Install the required dependencies:

   ```bash
   npm install
   ```

3. Start the frontend application:

   ```bash
   npm start
   ```

4. The application will be available at `http://localhost:3000`.

---

## Usage

1. **Sign Up / Sign In**: Create an account or sign in with your existing credentials to start using the platform.
2. **Start Chatting**: Search for users and start text-based conversations.
3. **Voice & Video Calls**: Initiate voice or video calls by clicking the respective buttons on the chat screen.
4. **Notifications**: You’ll receive real-time notifications for incoming messages and calls.
5. **Profile Customization**: Customize your profile by updating your picture, status, and bio.

---

## Contributing

1. Fork this repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Contact

For any questions or feedback, feel free to open an issue or reach out to the project maintainers.

--- 

Happy chatting! 👋
