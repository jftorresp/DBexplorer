const selectDbs = document.querySelector("#databases");
// const collections = document.querySelector(".collections");
const colSelect = document.querySelector(".colsSelect");
const dbOpt = document.querySelectorAll(".dbOpt");

selectDbs.addEventListener("change", evt => {
  // collectionsDiv.innerHTML = "Getting collections";
  dbOpt.forEach(db => {
    dbOpt.innerHTML = db.dataset.databasename;
    const dbName = dbOpt.innerHTML;
    fetch(`/collections?name=${dbName}`)
      .then(res => res.json())
      .then(collections => {
        console.log("collections", collections);
        colSelect.innerHTML = "";
        collections.forEach(col => {
          console.log("col", col);
          const colOpt = document.createElement("option");
          colOpt.textContent = `${col.name}`;
          colOpt.value = `${col.name}`;
          colSelect.appendChild(colOpt);
        });
        evt.preventDefault();
      });
  });
});

colSelect.addEventListener("change", evt => {
  // collectionsDiv.innerHTML = "Getting collections";
  dbOpt.forEach(db => {
    dbOpt.innerHTML = db.dataset.databasename;
    const dbName = dbOpt.innerHTML;
    fetch(`/collections?name=${dbName}`)
      .then(res => res.json())
      .then(collections => {
        console.log("collections", collections);
        colSelect.innerHTML = "";
        collections.forEach(col => {
          console.log("col", col);
          const colOpt = document.createElement("option");
          colOpt.textContent = `${col.name}`;
          colOpt.value = `${col.name}`;
          colSelect.appendChild(colOpt);
        });
        evt.preventDefault();
      });
  });
});

// const getCols = db => {
//   return fetch(`/collections?name=${db}`).then(res => res.json());
// };

/* This method show the collections in the specified database */
// const showCollections = collections => {
//   collections.forEach(col => {});
// };
