var express = require("express");
var router = express.Router();

const mu = require("../db/mongoUtils.js");

/* GET home page. */
router.get("/", function(req, res) {
  mu.getDbs().then(databases => {
    console.log("databases", databases);
    res.render("index", databases);
  });
});

//  Data endpoint for geting the collections
router.get("/databases", (req, res) => {
  // const db = req.params.name;

  mu.getCollections()
    .then(collections => {
      res.json(collections);
      console.log("collections", collections);
    })
    .catch(err => console.log("Error", err));
});

module.exports = router;
