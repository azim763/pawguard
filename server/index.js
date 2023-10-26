const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const clinicRoutes = require("./routes/clinics");
const insuranceplansRoutes = require("./routes/insuranceplans");
const insurancecompanysRoutes = require("./routes/insurancecompanys");
const petsRoutes = require("./routes/pets");
const petappointmentsRoutes = require("./routes/petappointments");
const petfoodsRoutes = require("./routes/petfoods");
const petlogsRoutes = require("./routes/petlogs");
const petMedicationsRoutes = require("./routes/petmedications");
const petVaccinationsRoutes = require("./routes/petvaccination");

const app = express();
const socket = require("socket.io");
require("dotenv").config();

app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));


mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connection Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use("/api/auth", authRoutes);
app.use("/api/clinics", clinicRoutes);
app.use("/api/insuranceplans", insuranceplansRoutes);
app.use("/api/insurancecompanys", insurancecompanysRoutes);
app.use("/api/pets", petsRoutes);
app.use("/api/petappointments", petappointmentsRoutes);
app.use("/api/petfoods", petfoodsRoutes);
app.use("/api/petlogs", petlogsRoutes);
app.use("/api/petmedications", petMedicationsRoutes);
app.use("/api/petvaccination", petVaccinationsRoutes);

const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);
const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});
