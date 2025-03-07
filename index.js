// index.js
// where your node app starts
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// ✅ API endpoint to return a JSON object
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

// ✅ Timestamp API
app.get("/api/:date?", function (req, res) {
  let { date } = req.params;

  // If no date is provided, use the current timestamp
  if (!date) {
    const now = new Date();
    return res.json({
      unix: now.getTime(),
      utc: now.toUTCString(),
    });
  }

  // If date is a valid UNIX timestamp (numeric), convert to integer
  if (/^\d+$/.test(date)) {
    date = parseInt(date);
  }

  const parsedDate = new Date(date);

  // Check if the date is valid
  if (parsedDate.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString(),
  });
});

// Listen on port set in environment variable or default to 3000
module.exports = app;
