function LoginMiddleware(req, res, next) {
    // if userId cookie does NOT exist, go to log in page
    if (!req.cookies.userId) {
        res.redirect('/login');
    } 
    // if userID cookie DOES exist, you're good
    else {
        next();
    }
}

module.exports = {
    LoginMiddleware
};