
const showDbs = dbs => {
  const selectDbs = document.querySelector("#databases");

  selectDbs.innerHTML = "";

  dbs.forEach(db => {
    const dbOpt = document.createElement("option");

    dbOpt.value = `${db.name}`;

    selectDbs.appendChild(dbOpt);
  });
};

// selectDbs.value;
// selectDbs.addEventListener("change",updateCols);
// const showCollections = cols => {
// }