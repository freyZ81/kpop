// Werte aus dem Local Storage abrufen und verwenden
allGroups = JSON.parse(localStorage.getItem('groupsArray'));

const tableGroups = document.getElementById("tableGroups")
const counter = document.getElementById("counter")
counter.innerHTML = "In the list are " + (allGroups.length-1) + " groups."

function fuehrendeNullWennEinstellig(num) {
    return num < 10 ? "0" + num : num;
}

function setGroups() {
    var tableBody = document.getElementById("tableBody")

    for (let i = 1; i < allGroups.length; i++) {
        var group = allGroups[i];
        const newRow = tableBody.insertRow(-1)

        const nameCell = newRow.insertCell(0)
        nameCell.innerHTML = group.name[0]

        const fandomCell = newRow.insertCell(-1)
        fandomCell.innerHTML = group.fandom[0]

        const sizeCell = newRow.insertCell(-1)
        sizeCell.innerHTML = group.size > 0 ? group.size : ""

        const debutCell = newRow.insertCell(-1)
        let debutDate = new Date(group.debut)
        if (group.debut != null) {
            debutCell.innerHTML = 
            fuehrendeNullWennEinstellig(debutDate.getDate())
            + "." + (fuehrendeNullWennEinstellig(debutDate.getMonth()+1))
            + "." + (debutDate.getFullYear())
        }

        const disbandCell = newRow.insertCell(-1)
        let disbandDate = new Date(group.disband)
        if (group.disband != null) {
            disbandCell.innerHTML = 
            fuehrendeNullWennEinstellig(disbandDate.getDate())
            + "." + (fuehrendeNullWennEinstellig(disbandDate.getMonth()+1))
            + "." + (disbandDate.getFullYear())
        }
    }
}

setGroups()