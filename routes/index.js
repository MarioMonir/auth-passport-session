const router = require("express").Router();
const { home } = require("../views/index.js");

router.get("/", (req, res) => res.send(home));

module.exports = router;
