const User = require('../models/users');
const Users = require('../models/users');

module.exports.profile = function (req, res) {
    return res.render('user', {
        user_name: "Ankush",
        title: "Users",
    }

    );
}

//rendering signup page
module.exports.signUp = function(req, res) {
    return res.render('user_sign_up', {
        title: "Codial | SignUp"
    })
}

//rendering signin page
module.exports.signIn = function(req, res) {
    return res.render('user_sign_in', {
        title: 'Codial | SignIn'
    })
}


module.exports.create = function(req, res) {
    //checking if both the passwords are matching
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    //checking the email into db is same user exists
    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('Error in finding user email in sign up'); return;}
        
        //If user is not available then creating new user
        if(!user){
            Users.create(req.body, function(err, user) {
                if(err){console.log('Error in creating user while sign up'); return;}

                return res.redirect('/users/sign-in');
            })
        } 
        //if user is available then redirecting back to same page
        else {
            return res.redirect('back');
        }

    })
}  

module.exports.createSession = function(req, res) {
    //TODO later
}  