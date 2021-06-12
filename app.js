const express = require("express");
const passport = require("passport");
const connect = require("./utils/database/database.js");
const sessionMiddleware = require("./utils/auth/session.js");

/* -------------- GENERAL SETUP ---------------- */
require("dotenv").config();
const port = process.env.PORT || 3000;
const localhost = process.env.HOST || "localhost";

/* Database Connection */
connect();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


/* ---------------- SESSION SETUP ------------------------*/
app.use(sessionMiddleware);

/* -------------- PASSPORT AUTHENTICATION --------------- */
require("./utils/auth/passport.js");
app.use(passport.initialize());
app.use(passport.session());


/* ---------------------- ROUTERS -------------------------*/
const homeRouter = require("./routes/index.js");
const authRouter = require("./routes/auth.js")

/* ---------------------- ROUTES ------------------------- */

app.use(authRouter);
app.use(homeRouter);

/* -------------- SERVER ---------------- */
app.listen(port, () => {
    console.log(`Server is running on http://${localhost}:${port}`);
});
