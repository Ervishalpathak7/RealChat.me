import express from "express";
import { configDotenv } from "dotenv";
import connectDB from "./Database/db.js";
import authRouter from "./Routes/authRoutes.js";
import cors from "cors";
import { createServer } from 'http';
import initializeSocket from "./Utils/socket.js";
import cookieParser from "cookie-parser";



// Load environment variables early
configDotenv();

// Create express app
const app = express();


// Enable CORS
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));


// cookie parser
app.use(cookieParser());

// Create HTTP server
const server = createServer(app);
initializeSocket(server);


// Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/users", authRouter);

// Home route
app.get("/", (req, res) => {
  res.json("Welcome to the authentication API");
});

// Connect to DB and start server
connectDB()
  .then(() => {
    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("DB Connection Error:", error);
  });
