var express = require("express");
var router = express.Router();

const mu = require("../db/mongoUtils.js");

/* GET home page. */
router.get("/", function(req, res) {
  mu.getDbs().then(databases => {
    console.log("databases", databases);
    res.render("index",  databases );
  });
});

//.sort({_id:-1})

module.exports = router;
