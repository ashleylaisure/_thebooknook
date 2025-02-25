// If a user exists then set the value of res.locals.user to that user
const passUserToView = (req, res, next) => {
    res.locals.user = req.session.user ? req.session.user : null;
    next();
};

module.exports = passUserToView;