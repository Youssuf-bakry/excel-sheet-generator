// import Swal from "./node_modules/sweetalert2/src/sweetalert2.js";

let table = document.getElementsByClassName("sheet-body")[0],
  rows = document.getElementsByClassName("rows")[0],
  columns = document.getElementsByClassName("columns")[0];

const generateBtn = document.getElementById("generate");
const exportBtn = document.getElementById("export");

let tableExists = false;

const generateTable = () => {
  let rowsNumber = parseInt(rows.value),
    columnsNumber = parseInt(columns.value);
  table.innerHTML = "";
  for (let i = 0; i < rowsNumber; i++) {
    var tableRow = "";
    for (let j = 0; j < columnsNumber; j++) {
      tableRow += `<td contenteditable></td>`;
    }
    table.innerHTML += tableRow;
  }
  if (rowsNumber > 0 && columnsNumber > 0) {
    tableExists = true;
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      width: "40rem",
      text: "You Should Enter Positive Number",
    });
  }
};

const ExportToExcel = (type, fn, dl) => {
  if (!tableExists || !table.innerHTML) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      width: "40rem",
      text: "No Table to be exported",
    });
    // return;
  }
  var elt = table;
  var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1" });
  return dl
    ? XLSX.write(wb, { bookType: type, bookSST: true, type: "base64" })
    : XLSX.writeFile(wb, fn || "MyNewSheet." + (type || "xlsx"));
};

generateBtn.addEventListener("click", () => {
  console.log("hi");

  generateTable();
});
exportBtn.addEventListener("click", () => {
  ExportToExcel("xlsx");
});
