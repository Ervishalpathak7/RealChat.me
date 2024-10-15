import express from "express";
import { configDotenv } from "dotenv";
import connectDB from "./Database/db.js";
import authRouter from "./Routes/authRoutes.js";
import cors from "cors";

const app = express();

// Load environment variables
configDotenv();

// cors middleware
app.use(cors());


// auth middleware






// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Routes
app.use("/api/users", authRouter);



// Home route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the authentication API" });
});



connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
