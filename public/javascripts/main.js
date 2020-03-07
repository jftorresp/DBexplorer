const selectDbs = document.querySelector("#databases");
const colSelect = document.querySelector(".colsSelect");
const dataDiv = document.querySelector(".listData");
const dataForm = document.querySelector("#dataForm");
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
      dataDiv.innerHTML = "";
      dataForm.innerHTML = "";
      const button = document.createElement("button");
      data.forEach(d => {
        const daticos = JSON.stringify(d);
        const datoReal = JSON.parse(daticos);
        const array = Object.entries(datoReal);
        const label = document.createElement("label");
        const dataInput = document.createElement("input");
        console.log("array", array);
        for (let [key, value] of array) {
          const dataRow = document.createElement("div");
          dataRow.className = "row dataDiv";
          dataRow.textContent = `${key} : ${value}`;
          dataDiv.appendChild(dataRow);
          label.textContent = key;
        }
        dataForm.appendChild(dataInput);
        dataForm.appendChild(label);
      });
      button.textContent = "Add";
      dataForm.appendChild(button);
    });
  evt.preventDefault();
});

const createData = () => {
  colSelect.addEventListener("change", evt => {
    fetch("/create")
      .then(res => res.json())
      .then(data => {
        dataForm.innerHTML = "";
        data.forEach(d => {
          const label = document.createElement("label");
          const dataInput = document.createElement("input");
          const daticos = `${JSON.stringify(d)}`;
          label.textContent = `${daticos[0]}`;
          dataForm.appendChild(dataInput);
          dataForm.appendChild(label);
        });
        evt.preventDefault();
      });
  });
};

dataForm.addEventListener("submit", createData);
