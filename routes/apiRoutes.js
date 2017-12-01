const path = require("path");
const router = require("express").Router();

module.exports = function(router, passport) {

  // router.post("/api/signup", function(req,res) {
  //   console.log(req.body);
  //   res.send("route hit today")
  // });

  router.post('/api/signup', passport.authenticate('local-signup', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

  router.get("/signup", function(req,res) {
    console.log("passport send me here");
    res.end();

  })


  router.use(function(req, res) {
    // res.sendFile(path.join(__dirname, "../client/build/index.html"));
    res.sendFile(path.join(__dirname, "../client/public/index.html"));
  });
}

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}