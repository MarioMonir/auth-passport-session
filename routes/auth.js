const router = require("express").Router();
const passport = require("passport");
const User = require("../resources/user/user.js");
const { authenticate, authorize } = require("../utils/auth/authMiddleware");

const {
    login,
    register,
    authenticated,
    loginSuccess,
} = require("../views/index.js");

/*  -------------- POST ROUTES ---------------- */

router.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;
        const admin = !!req.body.admin;
        const user = await User.create({ username, password, admin });
        if (!user) throw err;
        return res.status(201).send(user);
    } catch (err) {
        console.log(err);
        return res.status(400).send("Bad request");
    }
});

router.post(
    "/login",
    passport.authenticate("local", {
        failureRedirect: "/login-failure",
        successRedirect: "/login-success",
    })
);

/*  -------------- GET ROUTES ---------------- */

router.get("/login", (req, res) => res.send(login));

router.get("/register", (req, res) => res.send(register));

router.get("/protected-route", [authenticate], (req, res) => {
    res.send(authenticated);
});

router.get("/admin-route", [authenticate, authorize], (req, res) => {
    res.send("you are in admin route");
});

// Visiting this route logs the user out
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/protected-route");
});

router.get("/login-success", (req, res) => {
    res.send(loginSuccess);
});

router.get("/login-failure", (req, res, next) => {
    res.send("login failed wrong username or password");
});

module.exports = router;
