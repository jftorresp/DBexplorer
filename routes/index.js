var express = require("express");
var router = express.Router();

const mu = require("../db/mongoUtils.js");

/* GET home page. */
router.get("/", function(req, res) {
  mu.getDbs().then(databases => {
    // console.log("databases", databases);
    res.render("index", databases);
  });
});

//  Data endpoint for geting the collections
router.get("/collections/:name", (req, res) => {
  const db = req.params.name;
  console.log(db);
  mu.getCollections(db)
    .then(collections => {
      res.json(collections);
    })
    .catch(err => console.log("Error", err));
});

//Data endpoint for inserting data into collections
router.post("/collections/create", (req, res) => {
  console.log("params", req.params);
  const db = req.params.name;
  const col = req.params.col;
  const data = {
    Name: req.body.name,
    Team: req.body.team,
    timestamp: new Date()
  };

  mu.insertRegister(db, col, data).then(res.redirect("/"));
});

module.exports = router;
