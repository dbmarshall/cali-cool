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
app.use(bodyParser.json({limit: '10mb'})); // Reset default for data_uri blobs
app.use(bodyParser.urlencoded({ extended: false }));

// Passport ==============================
app.use(cookieParser()); // read cookies (needed for auth)
app.use( session( { secret: "crazystring",
                    cookie: { maxAge: 900000 },
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

app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
