const session = require("express-session");
const MongoStore = require("connect-mongo");
require("dotenv").config();

const url = process.env.DB_STRING;

const sessionStore = MongoStore.create({
    mongoUrl: url,
    collectionName: "sessions",
});

const sessionMiddleware = session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
    },
});

module.exports = sessionMiddleware;
