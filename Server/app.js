const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const colors = require("colors");
const morgan = require("morgan");
const connectDB = require("./config/db");

//dot.env file
dotenv.config();

//Database

connectDB();

//REST API

const app = express();

//middleware

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//PORT

const PORT = process.env.PORT || 80;

//Routes

app.get("/", require("./routes/homeRoute"));

app.use("/api/v1/auth", require("./routes/Auth/userRoutes"));

app.use("/api/v1/post", require("./routes/postRoutes"));
//listen

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`.bgGreen.bold);
});
