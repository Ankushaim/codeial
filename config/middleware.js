module.exports.setFlash = function (req, res, next) {

    // here we are setting flash message from request object to response object which will be send to browser
    res.locals.flash = {
        'success': req.flash('success'),
        'error' : req.flash('error')
    }

    next();
}