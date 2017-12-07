const router = require("express").Router();
const usersController = require("../../controllers/usersController");
const passport = require('passport');


router.route('/signup')
.post(function(req, res, next) {
  passport.authenticate('local-signup', function(err, user, info) {
    if (err) {
      return next(err); // will generate a 500 error
    }

    if (!user) {
      return res.status(409).json({ errMessage: info.errMsg});
    }

    req.login(user, function(err){
      if(err){
        return next(err);
      }
      return res.status(200).json({"successRedirect" : "/user/" + user._id});
    });
  })(req, res, next);
});


// api/authentication/session
router.get("/session", isLoggedIn, function(req,res) {
  var obj = {
    "userName": req.user.userName,
    "loggedIn" : true,
    "userId" : req.user._id
  }
  res.send(obj);
})

router.route('/login')
.post(function(req, res, next) {
  passport.authenticate('local-login', function(err, user, info) {
    if (err) {
      return next(err); // will generate a 500 error
    }

    if (!user) {
      return res.status(409).json({errMessage: info.errMsg});
    }

    req.login(user, function(err){
      if(err){
        return next(err);
      }
      return res.status(200).json({"successRedirect" : "/user/" + user._id });
    });
  })(req, res, next);
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on 
  if (req.isAuthenticated())
    return next();

  // if they aren't redirect them to the home page
  res.redirect('/');
}

module.exports = router;