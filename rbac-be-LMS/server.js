const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/auth");
const bookRoutes = require("./routes/book");

app.use("/api/auth", authRoutes);
app.use("/api/book", bookRoutes);

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("MongoDB Connected successfully!!");
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
});
