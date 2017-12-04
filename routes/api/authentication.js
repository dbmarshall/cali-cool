const router = require("express").Router();
const usersController = require("../../controllers/usersController");
const passport = require('passport');

 router.post('/signup', passport.authenticate('local-signup',{
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true, // allow flash messages
        session: false
    }));

// api/authentication/session
 router.get("/session", isLoggedIn, function(req,res) {
    // console.log("this is resonse from user ", res.session.passport.user)
    // console.log(req.user);
    console.log("user is logged in and we are in the get route");
    var obj = {
      "userName": req.user.userName,
      "loggedIn" : true,
      "userId" : req.user._id
    }

    // console.log(obj)
    res.send(obj);
  })

  router.post('/login', passport.authenticate('local-login', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    router.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

 function isLoggedIn(req, res, next) {
    
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    console.log("user not logged in");
    res.redirect('/');
}

module.exports = router;