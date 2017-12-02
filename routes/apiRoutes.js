const path = require("path");
const router = require("express").Router();

module.exports = function(router, passport) {

  // Sign a user
  router.post('/api/signup', passport.authenticate('local-signup', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

  router.get("/signup", function(req,res) {
    console.log("passport send me here");
    res.end();

  })

  // Login in section
  router.post('/api/login', passport.authenticate('local-login', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

  router.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

  // router.get('/signup', function(req, res) {
  //       console.log("hellow work");

  //       // console.log("This is the sessiong foruser ", req.session.passport.user);
  //       // req.logout();
  //       // res.redirect('/');
  //   });

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