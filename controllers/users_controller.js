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
    //TODO later
}  

module.exports.createSession = function(req, res) {
    //TODO later
}  