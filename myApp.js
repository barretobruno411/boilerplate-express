let express = require("express");
let app = express();
app.get("/", function (req, res) {
  //   res.send("Hello Express");
  let absolutePath = __dirname + "/views/index.html";
  res.sendFile(absolutePath);
});

module.exports = app;
