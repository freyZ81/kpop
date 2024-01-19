// Werte aus dem Local Storage abrufen und verwenden
allMembers = JSON.parse(localStorage.getItem('membersArray'));

const tableMembersGroupsAndBirthdays = document.getElementById("tableMembersGroupsAndBirthdays");

function fuehrendeNullWennEinstellig(num) {
    return num < 10 ? "0" + num : num;
}

function setMembers(memberArray) {
    var tableBody = document.getElementById("tableBody");
    for (let i = 0; i < memberArray.length; i++) {
        var member = memberArray[i];
        memberbirthday = new Date(member.birthday);
        const newRow = tableBody.insertRow(-1); // -1 fügt die Zeile am Ende der Tabelle ein
        
        const countryCell = newRow.insertCell(0);
        countryCell.innerHTML = member.name;
    
        const countryCell2 = newRow.insertCell(-1);
        countryCell2.innerHTML = member.group[0];

        const countryCell3 = newRow.insertCell(-1);
        //countryCell3.innerHTML = birthdayParts;
        countryCell3.innerHTML = fuehrendeNullWennEinstellig(memberbirthday.getDate())
        + "." + fuehrendeNullWennEinstellig(memberbirthday.getMonth()+1)
        + "." + memberbirthday.getFullYear();
      }
}

function sortName() {
    console.log("Sort Group");
    allMembers.sort(function(a, b) {
        var dateA = new Date(a.birthday);//parseDate(a.birthdate);
        var dateB = new Date(b.birthday);//parseDate(b.birthdate);

        // Zuerst nach Name sortieren
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }

        // Zuerst nach Jahr sortieren
        if (dateA.getYear() < dateB.getYear()) {
            return -1;
        }
        if (dateA.getYear() > dateB.getYear()) {
            return 1;
        }

        // Dann nach Monat sortieren
        if (dateA.getMonth() < dateB.getMonth()) {
            return -1;
        }
        if (dateA.getMonth() > dateB.getMonth()) {
            return 1;
        }
    
        // Dann nach Tag sortieren
        if (dateA.getDate() < dateB.getDate()) {
            return -1;
        }
        if (dateA.getDate() > dateB.getDate()) {
            return 1;
        }

        
    
        // Wenn Monat und Tag gleich sind, keine Änderung vornehmen
        return 0;
    });
    tableBody.innerHTML = '';
    setMembers(allMembers);
}

function sortGroup() {
    console.log("Sort Group");
    allMembers.sort(function(a, b) {
        var dateA = new Date(a.birthday);//parseDate(a.birthdate);
        var dateB = new Date(b.birthday);//parseDate(b.birthdate);
    
        // Zuerst nach Gruppe sortieren
        if (a.group < b.group) {
            return -1;
        }
        if (a.group > b.group) {
            return 1;
        }

        
        // Zuerst nach Monat sortieren
        if (dateA.getMonth() < dateB.getMonth()) {
            return -1;
        }
        if (dateA.getMonth() > dateB.getMonth()) {
            return 1;
        }
    
        // Dann nach Tag sortieren
        if (dateA.getDate() < dateB.getDate()) {
            return -1;
        }
        if (dateA.getDate() > dateB.getDate()) {
            return 1;
        }

        // Dann nach Jahr sortieren
        if (dateA.getYear() < dateB.getYear()) {
            return -1;
        }
        if (dateA.getYear() > dateB.getYear()) {
            return 1;
        }
        
    
        // Wenn Monat und Tag gleich sind, keine Änderung vornehmen
        return 0;
    });
    tableBody.innerHTML = '';
    setMembers(allMembers);
}

function sortDate() {
    console.log("Sort Date");
    allMembers.sort(function(a, b) {
        var dateA = new Date(a.birthday);//parseDate(a.birthdate);
        var dateB = new Date(b.birthday);//parseDate(b.birthdate);
    
        // Zuerst nach Monat sortieren
        if (dateA.getMonth() < dateB.getMonth()) {
            return -1;
        }
        if (dateA.getMonth() > dateB.getMonth()) {
            return 1;
        }
    
        // Dann nach Tag sortieren
        if (dateA.getDate() < dateB.getDate()) {
            return -1;
        }
        if (dateA.getDate() > dateB.getDate()) {
            return 1;
        }

        // Dann nach Jahr sortieren
        if (dateA.getYear() < dateB.getYear()) {
            return -1;
        }
        if (dateA.getYear() > dateB.getYear()) {
            return 1;
        }
    
        // Wenn Monat und Tag gleich sind, keine Änderung vornehmen
        return 0;
    });
    tableBody.innerHTML = '';
    setMembers(allMembers);
}

setMembers(allMembers)