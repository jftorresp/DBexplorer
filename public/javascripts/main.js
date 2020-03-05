
const showDbs = dbs => {
  const selectDbs = document.querySelector("#databases");

  selectDbs.innerHTML = "";

  dbs.forEach(db => {
    const dbOpt = document.createElement("option");

    dbOpt.textContent = `${db.name}`;

    selectDbs.appendChild(dbOpt);
  });
};

// const showCollections = cols => {

// }