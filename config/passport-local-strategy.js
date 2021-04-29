const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users');

//authentication using passport
passport.use(new LocalStrategy({
        usernameField: 'email'
    },
    function(email, password, done) {
        //find user and estiblish the identity
        User.findOne({email: email}, function(err, user){
            if(err){
                console.log('Error in finding user --> Passport');
                return done(err);
            }

            if(!user || user.password != password) {
                console.log('Invalid username or password');
                return done(null, false);
            }

            return done(null, user);
        });
    }
));


//Serilizing the user to decide which key is used to be kept in the cookies
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

//De-serilizing the user from the key in cookies
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user){
        if(err){
            console.log('Error in finding user --> Passport');
            return done(err);
        }

        return done(null, user);
    });
});


//Check if the user is authenticated 
passport.checkAuthentication = function(req, res, next) {
    //if the user is signed in then pass request to next function(which is controller action)
    if(req.isAuthenticated()){
        return next();
    }
    
    //if the user is not signed in
    return res.redirect('/users/sign-in');
}


passport.setAuthenticatedUser = function(req, res, next) {
    if(req.isAuthenticated()) {
        //req.user contains the current signed in user from session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;