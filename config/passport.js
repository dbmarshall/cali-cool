const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/Users');

module.exports = function(passport) {

  // passport session setup ==================================================
  // =========================================================================
  // required for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session

  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  // =========================================================================
  // LOCAL SIGNUP ============================================================
  // =========================================================================
  // we are using named strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local'

  passport.use('local-signup', new LocalStrategy({
      // by default, local strategy uses username and password, we will override with email
      userName : 'username',
      passWord : 'password',
      
      passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, userName, passWord, done) {

      // asynchronous
      // User.findOne wont fire unless data is sent back
      process.nextTick(function() {

      // find a user whose userName is the same as the forms userName
      User.findOne({ userName : userName }, function(err, user) {
        // if there are any errors, return the error
        if (err) {
          return done(err);
        }

        // check to see if theres already a user with that email
        if (user) {
          return done(null, false, {'errMsg': 'This User Name is already taken'});
        } else {
          // if there is no user with that userName, create the user
          var newUser = new User();
          
          // set the user's local credentials
          newUser.email = req.body.email;
          newUser.passWord = newUser.generateHash(passWord);
          newUser.userName = req.body.username;
          newUser.firstName = req.body.firstName;
          newUser.lastName = req.body.lastName;
          newUser.profilePicture = req.body.profilePicture;

          // save the user
          newUser.save(function(err) {
            if (err)
              throw err;
            return done(null, newUser);
          });
        }
      });    
    });
  }));

  passport.use('local-login', new LocalStrategy({
      // by default, local strategy uses username and password, we will override with email
      userName : 'username',
      passWord : 'password',
      passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, userName, passWord, done) { // callback with email and password from our form

      // find a user whose username is the same as the forms email
      // we are checking to see if the user trying to login already exists
      User.findOne({ userName : userName }) 
      .then(function(user, err) {
        // if there are any errors, return the error before anything else
        if (err){
          return done(err)
        }

        // if no user is found, return the message
        if (!user) {
            // return done(null, false, req.flash('loginMessage', 'No user found.'))
            return done(null, false, {'errMsg': "User not found"})
          }
          else { 

        // if the user is found but the password is wrong
        if (!user.validPassword(passWord)){
          return done(null, false, {'errMsg': 'Oops! Wrong password'});
        }
      }

      // all is well, return successful user
      return done(null, user);
    });
  }));
};
