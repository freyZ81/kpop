const GITHUB_TOKEN = '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';
const REPO_OWNER = 'freyz81';
const REPO_NAME = 'kpop';
const FILE_PATH = 't_konto_daten.js';
const BRANCH = 'develop';
let winTotal = 0
let lossTotal = 0

showPayments()

document.querySelectorAll('.filter-input').forEach(input => {
  input.addEventListener('keyup', filterTable);
  input.addEventListener('change', filterTable);
});

function filterTable() {
  var tableBody = document.getElementById("tableBody");
  var monthSelector = document.getElementById("monthSelector").value;
  var yearSelector = document.getElementById("yearSelector").value;
  tableBody.innerHTML = ""
  winTotal = 0
  lossTotal = 0
  for (let i = 0; i < zahlungen.length; i++) {
    var payment = zahlungen[i];
    console.log(payment.bezeichnung, payment.monatlich)
    if ((payment.monat == monthSelector && payment.jahr == yearSelector) ||
        (monthSelector == 0) ||
        (payment.monatlich)) {

      const newRow = tableBody.insertRow(-1);
      const lossDescriptionCell = newRow.insertCell(0);
      const lossPriceCell = newRow.insertCell(-1);
      const winDescriptionCell = newRow.insertCell(-1);
      const winPriceCell = newRow.insertCell(-1);
      if (payment.verlust == true) {
        lossDescriptionCell.innerHTML = payment.bezeichnung + ": "
        lossPriceCell.innerHTML = payment.preis;
        lossTotal += parseFloat(payment.preis);
      } else {
        winDescriptionCell.innerHTML = payment.bezeichnung + ": "
        winPriceCell.innerHTML = payment.preis;
        winTotal += parseFloat(payment.preis);
      }
    }
  }
  const newRow = tableBody.insertRow(-1);
  newRow.insertCell(0).innerHTML = "Verlust:"
  newRow.insertCell(-1).innerHTML = parseFloat(lossTotal).toFixed(2)
  newRow.insertCell(-1).innerHTML = "Gewinn:"
  newRow.insertCell(-1).innerHTML = parseFloat(winTotal).toFixed(2)
  newRow.insertCell(-1).innerHTML = "Diff: " + (winTotal - lossTotal).toFixed(2)
}

function addNewPayment() {
  const bezeichnung = document.getElementById("bezeichnung").value
  const preis = document.getElementById("preis").value
  const month = document.getElementById("dateMonth").value.toLowerCase()
  const year = document.getElementById("dateYear").value.toLowerCase()
  const monthly = document.getElementById("monthly").checked
  const verlust = document.getElementById("verlust").checked

  //console.log("Bezeichnung", bezeichnung)
  //console.log("Preis", preis)
  //console.log("Month", month)
  //console.log("year", year)
  //console.log("Monthly", monthly)
  //console.log("verlust", verlust)

  if (monthly == true || (year != "" && month != "")){
    if (bezeichnung != "" && preis != "") {
      zahlungen.push({bezeichnung: bezeichnung, preis: parseFloat(preis),
        monat: month, jahr: year, monatlich: monthly, verlust: verlust});
        console.log("Wurde hinzugefügt")
    } else {
      console.log("wurde nicht hinzugefügt")
    }
  } else {
    console.log("wurde nicht hinzugefügt 2")
  }
  
  filterTable()
}

function showPayments() {
  var tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = ""
  winTotal = 0
  lossTotal = 0
  for (let i = 0; i < zahlungen.length; i++) {
    var payment = zahlungen[i];
    const newRow = tableBody.insertRow(-1);
    const lossDescriptionCell = newRow.insertCell(0);
    const lossPriceCell = newRow.insertCell(-1);
    const winDescriptionCell = newRow.insertCell(-1);
    const winPriceCell = newRow.insertCell(-1);
    if (payment.verlust == true) {
      lossDescriptionCell.innerHTML = payment.bezeichnung + ": "
      lossPriceCell.innerHTML = payment.preis;
      lossTotal += parseFloat(payment.preis);
    } else {
      winDescriptionCell.innerHTML = payment.bezeichnung + ": "
      winPriceCell.innerHTML = payment.preis;
      winTotal += parseFloat(payment.preis);
    }
  }
  const newRow = tableBody.insertRow(-1);
  newRow.insertCell(0).innerHTML = "Verlust:"
  newRow.insertCell(-1).innerHTML = parseFloat(lossTotal).toFixed(2)
  newRow.insertCell(-1).innerHTML = "Gewinn:"
  newRow.insertCell(-1).innerHTML = parseFloat(winTotal).toFixed(2)
  newRow.insertCell(-1).innerHTML = "Diff: " + (winTotal - lossTotal).toFixed(2)
}

