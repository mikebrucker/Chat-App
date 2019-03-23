const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

const users = require("./routes/api/users");
const chatroom = require("./routes/api/chatroom");

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Database Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Use Routes
app.use("/api/users", users);
app.use("/api/chatroom", chatroom);

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendfile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

const server = require("http").Server(app);
const io = require("socket.io")(server);

io.on("connection", function(socket) {
  console.log("socket connected", socket.id);
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("message", chatroomName => {
    console.log(`new message in ${chatroomName}`);
  });
});

server.listen(port, () => console.log(`Server running on port ${port}`));
