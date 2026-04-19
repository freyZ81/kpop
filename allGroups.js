// Werte aus dem Local Storage abrufen und verwenden
allGroups = JSON.parse(localStorage.getItem('groupsArray'));

const tableGroups = document.getElementById("tableGroups")
const counter = document.getElementById("counter")
counter.innerHTML = "In the list are " + (allGroups.length-1) + " groups."

document.querySelectorAll('.filter-input').forEach(input => {
    input.addEventListener('keyup', filterTable);
    input.addEventListener('change', filterTable);
});

function filterTable() {
    let groupFilter = document.getElementById('filterGroup').value.toLowerCase();
    let fandomFilter = document.getElementById('filterFandom').value.toLowerCase();
    let entertainmentFilter = document.getElementById('filterEntertainment').value.toLowerCase();
    let sizeFilter = document.getElementById('filterSize').value.toLowerCase();
    let debutdateFilter = document.getElementById('filterDebut').value.toLowerCase();
    let disbanddateFilter = document.getElementById('filterDisband').value.toLowerCase();

    let table = document.getElementById('tableBody');
    let tr = table.getElementsByTagName('tr');

    for (let i = 0; i < tr.length; i++) {
        let tdGroup = tr[i].getElementsByTagName('td')[0];
        let tdFandom = tr[i].getElementsByTagName('td')[1];
        let tdEntertainment = tr[i].getElementsByTagName('td')[2];
        let tdSize = tr[i].getElementsByTagName('td')[3];
        let tdDebutdate = tr[i].getElementsByTagName('td')[4];
        let tdDisbanddate = tr[i].getElementsByTagName('td')[5];

        let groupValue = tdGroup.textContent || tdGroup.innerText;
        let fandomValue = tdFandom.textContent || tdFandom.innerText;
        let entertainmentValue = tdEntertainment.textContent || tdEntertainment.innerText;
        let sizeValue = tdSize.textContent || tdSize.innerText;
        let debutdateValue = tdDebutdate.textContent || tdDebutdate.innerText;
        let disbanddateValue = tdDisbanddate.textContent || tdDisbanddate.innerText;
        
        if (groupValue.toLowerCase().indexOf(groupFilter) > -1 &&
            fandomValue.toLowerCase().indexOf(fandomFilter) > -1 &&
            entertainmentValue.toLowerCase().indexOf(entertainmentFilter) > -1 &&
            sizeValue.toLowerCase().indexOf(sizeFilter) > -1 &&
            debutdateValue.toLowerCase().indexOf(debutdateFilter) > -1 &&
            disbanddateValue.toLowerCase().includes(disbanddateFilter))
        {
            tr[i].style.display = '';
        } else {
            tr[i].style.display = 'none';
        }
    }
}

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
        
        const entertainmentCell = newRow.insertCell(-1)
        if (group.entertainment != null) {
            entertainmentCell.innerHTML = group.entertainment[0]
        }

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