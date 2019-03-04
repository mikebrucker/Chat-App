const express = require("express");
const mongoose = require("mongoose");

const users = require("./routes/api/users");
const messages = require("./routes/api/messages");
const chatroom = require("./routes/api/chatroom");

const app = express();

// Database Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("Hello World"));

// Use Routes
app.use("/api/users", users);
app.use("/api/messages", messages);
app.use("/api/chatroom", chatroom);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
