const selectDbs = document.querySelector("#databases");
// const collections = document.querySelector(".collections");
const collectionsDiv = document.querySelector(".listCols");

const showDbs = dbs => {
  selectDbs.innerHTML = "";

  dbs.forEach(db => {
    const dbOpt = document.createElement("option");

    dbOpt.value = `${db.name}`;

    selectDbs.appendChild(dbOpt);
  });
};

selectDbs.addEventListener("change", evt => {
  if (evt.target.value) {
    collectionsDiv.innerHTML = "Getting collections";
    // const query = selectDbs.value;
    fetch("/databases?name=local")
      .then(res => res.json())
      .then(showCollections);

    evt.preventDefault();
  };
});

/* This method show the collections in the specified database */
const showCollections = cols => {
  collectionsDiv.innerHTML = "";

  cols.forEach(col => {
    const collection = document.createElement("row");

    collection.textContent = `${col.name}`;

    collectionsDiv.appendChild(collection);
  });
};


