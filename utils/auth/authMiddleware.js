const { unAuthenticated } = require("../../views/index.js");

const authenticate = (req, res, next) => {
    if (!req.isAuthenticated()) return res.status(401).send(unAuthenticated);
    return next();
};

const authorize = (req, res, next) => {
    if (!req.user.admin) return res.status(401).send("un authorized route");
    return next();
};

module.exports = { authenticate, authorize };
