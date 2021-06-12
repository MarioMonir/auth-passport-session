const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../../resources/user/user.js");

/* Local staretgy */
// The local authentication strategy authenticates users
// using a username and password. The strategy requires a
// verify callback, which accepts these credentials
// and calls done providing a user.
const verifyCallBack = async (username, password, done) => {
    await User.findOne({ username }, async (err, user) => {
        if (err) return done(err);
        if (!user) return done(null, false);

        const verified = await user.verifyPassword(password);
        if (!verified) return done(null, false);

        return done(null, user);
    });
};

const staretgy = new LocalStrategy(verifyCallBack);

passport.use(staretgy);


/* serializeUser */
// -----------------
// determines which data of the user object should be stored in the session.
// The result of the serializeUser method is attached to the session 
// as user.id
// take user  -> attach user.id in the session
passport.serializeUser((user, done) => done(null, user.id));


/* deserializeUser */
// -----------------
// retrieve the whole user object by it's user id that has been stored
// in the session by serializeUser 
// takes user.id return the whole user from the database 
passport.deserializeUser((userId, done) => {
    User.findById(userId)
        .then((user) => {
            done(null, user);
        })
        .catch((err) => done(err));
});
