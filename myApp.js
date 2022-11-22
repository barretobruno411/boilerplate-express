require("dotenv").config();
let express = require("express");
let app = express();
app.use("/public", express.static(__dirname + "/public"));
app.use("/json", function (req, res, next) {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});
app.get("/", function (req, res) {
  //   res.send("Hello Express");
  let absolutePath = __dirname + "/views/index.html";
  res.sendFile(absolutePath);
});
app.get("/json", function (req, res) {
  const style = process.env.MESSAGE_STYLE;
  if (style === "uppercase") {
    res.json({ message: "HELLO JSON" });
  } else {
    res.json({ message: "Hello json" });
  }
});
app.get(
  "/now",
  function (req, res, next) {
    req.time = new Date().toString();
    next();
  },
  function (req, res) {
    res.send({ time: req.time });
  }
);

module.exports = app;
