const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const session = require("express-session");
dotenv.config({ path: "config.env" });
const { connectDB } = require("./database/connection");

const PORT = process.env.PORT || 8080;
const socketIO = require("socket.io");
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "PUT", "GET", "DELETE", "OPTIONS", "HEAD"],
    credentials: true,
  })
);
app.use(bodyParser.json());

app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 }, // 7 days
  })
);
connectDB();
app.use("/", require("./Router/router"));
const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const io = socketIO(server, {
  cors: {
    origin: "http://localhost:3000",
    method: ["GET", "POST"],
    credentials: true,
  },
});
io.on("connection", async (socket) => {
  socket.on("liveUpdate", async (data) => {
    console.log("Live News Received");
    io.emit("liveNewsUpdate", data);
  });
});
