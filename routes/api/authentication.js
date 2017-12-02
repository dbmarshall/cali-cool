const router = require("express").Router();
const path = require("path");
const usersController = require("../../controllers/usersController");

module.exports = function( router, passport) {

  console.log("This is in the authentica. js" , passport)

  router.post('/authentication/signup', passport.authenticate('local-signup', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/test', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

  // Login
  router.post('/login', passport.authenticate('local-login', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

  router.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

  router.get("/signup", isLoggedIn, function(req,res) {
    console.log("user is logged in");
    res.send("we logged in");

  });

  router.get("/publish", function(req, res) {

    console.log("publish get route hit");
  });

  // Dont know if we need this
  // router.use(function(req, res) {
  //   // res.sendFile(path.join(__dirname, "../client/build/index.html"));
  //   res.sendFile(path.join(__dirname, "../client/public/index.html"))
  // });

};

  function isLoggedIn(req, res, next) {
      
      // if user is authenticated in the session, carry on 
      if (req.isAuthenticated())
          return next();

      // if they aren't redirect them to the home page
      res.redirect('/');
  }

