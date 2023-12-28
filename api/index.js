import cookieParser from "cookie-parser";
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import authRoute from './routes/auth.js';
import usersRoute from "./routes/users.js";
import roomsRoute from "./routes/rooms.js";
import hotelsRoute from "./routes/hotels.js";

const app = express();
dotenv.config();
const port = process.env.PORT || 3000;


// middlewares
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/hotels", hotelsRoute);


// Error handling
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";

  // Send the error response to the client
 return res.status(errorStatus).json({ error: errorMessage });
});

mongoose.connection.on("connection", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (error) => {
  console.error("Error connecting to MongoDB:", error);
});

mongoose.connection.on("disconnected", () => {
  console.log("Disconnected from MongoDB");
});

app.listen(port, () => {
  connect();
  console.log("Server is running");
});

async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_CONNECT);
  } catch (error) {
    // log the error
    console.error("Error connecting to MongoDB:", error);

    // Rethrow the exception
    throw error;
  }
}
