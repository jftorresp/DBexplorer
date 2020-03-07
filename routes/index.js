var express = require("express");
var router = express.Router();

const mu = require("../db/mongoUtils.js");

// const buildQuery = query => ({
//   name: new RegExp(`.*${query}.*`, "i")
// });

/* GET home page. */
router.get("/", function(req, res) {
  // const url = "hello";
  // console.log("url", url);
  mu.getDbs().then(databases => {
    // console.log("databases", databases);
    res.render("index", databases);
  });
});

//  Data endpoint for geting the collections
router.get("/collections/:name", (req, res) => {
  const db = req.params.name;
  mu.getCollections(db)
    .then(collections => {
      res.json(collections);
    })
    .catch(err => console.log("Error", err));
});

//Data endpoint for inserting data into collections
router.post("/create/", (req, res) => {
  mu.getDbs().then(db => {
    mu.getCollections(db).then(col => {
      mu.getData(db, col).then(data => {
        mu.insertRegister(db, col, data).then(data => res.json(data));
      });
    });
  });
});

//  Data endpoint for getting the documents
router.get("/data/:db/:col", (req, res) => {
  const db = req.params.db;
  const col = req.params.col;
  mu.getData(db, col)
    .then(data => res.json(data))
    .catch(err => console.log("Error", err));
});

module.exports = router;
