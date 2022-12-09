const express = require("express");
const path = require("path");
const cors = require("cors");
const cookie = require("cookie-parser");

var mysql = require("mysql");
var session = require("express-session");
const bcrypt = require("bcryptjs");

const createAppData = require("./tools/existsAppDataDir");
const options = require("./config/dbConfig.js");

const app = express();
const dotenv = require("dotenv");
const sessionConfig = require("./config/sessionConfig.js");





app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/App_Data'));
app.use(express.urlencoded({ extended: true }));
app.use(cookie());
app.use(express.json());
app.use(session(sessionConfig));

dotenv.config({
  path: "./.env",
});

const port = process.env.PORT || 3000;

//ROUTES
const downloadRoute = require("./routes/download.js");
const homeRoute = require("./routes/home.js");
const authRoute = require("./routes/auth.js");
const virtualDirRoute = require("./routes/virtualdir/virtualdir.js");
const user = require("./models/User");
const userRoute = require("./routes/users/index.js");
const filemanagerRoute = require("./routes/filemanager");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  }
);

app.set("view engine", "ejs");
app.use(cors());


app.use("/", homeRoute);
app.use("/download", downloadRoute);
app.use("/auth", authRoute);
app.use("/virtualdir", virtualDirRoute);
app.use("/users", userRoute);
app.use('/filemanager', filemanagerRoute)

app.listen(port, () => {
  console.log("Listening: " + port);
});
