const router = require("express").Router();
const bcrypt = require("bcryptjs");
const user = require("../models/User.js");
const { v4: uuidv4 } = require("uuid");
const userController = require("../controller/userController.js");

const express = require("express");
const cookieParser = require("cookie-parser");

router.post("/register", async (req, res) => {
  var salt = bcrypt.genSaltSync(10);
  const { email, password, passwordconfirm } = req.body;
  if (password == passwordconfirm) {
    const hashedPassword = bcrypt.hashSync(password, salt);
    const user_uid =  uuidv4()
    user.create({
      email_Address: email,
      password: hashedPassword,
      user_id: user_uid,
    });
    var fs = require("fs");
    var dir = "./App_Data/"+user_uid;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    res.redirect('/login')
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userr = await user.findOne({ where: { email_Address: email } });
  if (await bcrypt.compare(password, userr.password)) {
    req.session.loggedin = true;
    req.session.useruId = userr.user_id;
    req.session.userId = userr.id;
    console.log(userr.id);
    res.redirect("/");
  }
});

router.get("/logout", async (req, res) => {
  userController.logOut(req);
  res.redirect("/");
});
module.exports = router;
