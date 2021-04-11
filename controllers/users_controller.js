module.exports.profile = function (req, res) {
    return res.render('user', {
        user_name: "Ankush",
        title: "Users",
    }

    );
}