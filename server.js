var express = require("express");
var app = express();

var cors = require("cors");
app.use(cors({ optionSuccessStatus: 200 }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/timestamp/:date_string?", function (req, res) {
  let date;
  const numbersOnlyRegex = /^[0-9]*$/;
  if (req.params.date_string === undefined) {
    date = new Date();
  } else if (req.params.date_string.match(numbersOnlyRegex)) {
    date = new Date(Number(req.params.date_string));
  } else {
    date = new Date(req.params.date_string);
  }
  if (date instanceof Date && isFinite(date)) {
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString(),
    });
  } else {
    res.json({
      error: "Invalid Date",
    });
  }
});

var listener = app.listen(8080, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
