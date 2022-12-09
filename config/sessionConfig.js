const options = require("../config/dbConfig.js");
const mysql = require('mysql')
const oneDay = 1000 * 60 * 60 * 24;
var session = require("express-session");
var MySQLStore = require("express-mysql-session")(session);
var connection = mysql.createConnection(options); // or mysql.createPool(options);
var sessionStore = new MySQLStore({} /* session store options */, connection);


module.exports = {
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: false,
    cookie: { maxAge: oneDay },
    resave: true,
    store: sessionStore,   
}