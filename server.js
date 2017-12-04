// Requirements ==============================
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;
const passport = require('passport');
const flash = require('connect-flash');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const keys = require("./config/keys");

// Middleware ==============================
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Passport ==============================
app.use(cookieParser()); // read cookies (needed for auth)
app.use( session( { secret: keys.secret,
                    cookie: { maxAge: 60000 },
                    rolling: true,
                    resave: true, 
                    saveUninitialized: false
                  }
         )
);
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());

// Serve static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

//Config ==============================
const db = require("./models");
require('./config/passport')(passport);
app.use(routes);

// Set up promises with mongoose
mongoose.Promise = global.Promise;

// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/calicool_db",
  {
    useMongoClient: true
  }
);

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
