var express = require("express");
var router = express.Router();

const mu = require("../db/mongoUtils.js");

/* GET home page. */
router.get("/", function(req, res) {
  mu.databases.getDbs().then(databases => {
    res.render("index", { "databases": databases });
  });
});

module.exports = router;
