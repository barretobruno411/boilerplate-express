require("dotenv").config();
const bodyParser = require("body-parser");
let express = require("express");
let app = express();
app.use(bodyParser.urlencoded({ extended: false }));
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
app.get("/:word/echo", function (req, res) {
  // wen define a route with :value, this value become a key of params object
  //wath is inputed on toute becomes the value of key :value
  res.json({ echo: req.params.word });
});
app
  .route("/name")
  .get(function (req, res) {
    // if (!req.query.first || !req.query.last) {
    //   res.json({ name: "not a valid name" });
    // }
    res.json({ name: `${req.query.first} ${req.query.last}` });
  })
  .post(function (req, res) {
    res.json({ name: `${req.body.first} ${req.body.last}` });
  });

module.exports = app;
