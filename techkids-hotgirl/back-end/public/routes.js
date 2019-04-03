const express = require("express");
const brcyptjs = require("bcryptjs");
const path = require("path");
const bodyParser = require("body-parser");

const registerRouter = express();

//register

registerRouter.use(express.static("public"));

registerRouter.get("/register", (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname + "/register.html"));
});
registerRouter.get("/login", (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname + "/login.html"));
});

module.exports = registerRouter;