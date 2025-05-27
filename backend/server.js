const express = require("express");
const notes = require("./data/notes");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const path = require("path");

const app = express();
dotenv.config();
app.use(cors());
connectDB();
app.use(express.json());

// app.get("/api/notes", (req, res) => {
//   res.json(notes);
// });

// app.get("/", (req, res) => {
//   res.send("API is running");
// });

app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);

// -------------------Diployement---------------------

const rootDir = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(rootDir, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(rootDir, "frontend", "dist", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running");
  });
}

// -------------------Diployement---------------------
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5001;

app.listen(PORT, console.log(`Server is starting on Port ${PORT}`));
