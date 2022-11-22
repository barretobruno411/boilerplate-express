require("dotenv").config();
let express = require("express");
let app = express();
app.use("/public", express.static(__dirname + "/public"));
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

module.exports = app;
