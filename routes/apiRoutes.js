const path = require("path");
const router = require("express").Router();

module.exports = function(router, passport) {

  // Sign a user
  router.post('/api/signup', 
    passport.authenticate('local-signup',{
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true, // allow flash messages
        session: false
    }));

  router.get("/session", isLoggedIn, function(req,res) {
    // console.log("this is resonse from user ", res.session.passport.user)
    console.log(req.user);
    console.log("user is logged in and we are in the get route");
    var obj = {
      "userName": req.user.userName,
      "loggedIn" : true,
      "userId" : req.user._id
    }

    console.log(obj)
    res.send(obj);
  })

// Flash message test
  // router.get('/login', function(req, res) {
  //   console.log(req.session.message)
  // })

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
    console.log("user not logged in");
    res.redirect('/');
}

