const selectDbs = document.querySelector("#databases");
const colSelect = document.querySelector(".colsSelect");
const dataDiv = document.querySelector(".listData");
// const formCollection = document.querySelector("#formCollection");

selectDbs.addEventListener("change", evt => {
  if (evt.target.value) {
    const dbName = selectDbs.value;
    fetch(`/collections/${dbName}`)
      .then(res => res.json())
      .then(collections => {
        colSelect.innerHTML = "";
        collections.forEach(col => {
          const colOpt = document.createElement("option");
          colOpt.textContent = `${col.name}`;
          colOpt.value = `${col.name}`;
          colSelect.appendChild(colOpt);
        });
        evt.preventDefault();
      });
  }
});

colSelect.addEventListener("change", evt => {
  const dbName = selectDbs.value;
  const cols = colSelect.value;
  fetch(`/data/${dbName}/${cols}`)
    .then(res => res.json())
    .then(data => {
      data.forEach(d => {
        const dataRow = document.createElement("div");
        dataRow.className = "row dataDiv";
        dataRow.textContent = `${JSON.stringify(d)}`;
        dataDiv.appendChild(dataRow);
      });
      evt.preventDefault();
    });
});

// const createData = () => {};

// formCollection.addEventListener("submit", createData);
