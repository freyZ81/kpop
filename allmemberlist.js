// Werte aus dem Local Storage abrufen und verwenden
allGroups = JSON.parse(localStorage.getItem('groupsArray'));
allMembers = JSON.parse(localStorage.getItem('membersArray'));

const tableMembersGroupsAndBirthdays = document.getElementById("tableMembersGroupsAndBirthdays");
let todaysBirthdays = document.getElementById("birthdays");
let nextBirthdays = [];
const counter = document.getElementById("counter");
counter.innerHTML = "In the list are " + allMembers.length + " members from " + (allGroups.length-2) + " groups and soloists.";

function fuehrendeNullWennEinstellig(num) {
    return num < 10 ? "0" + num : num;
}

function setMembers(memberArray) {
    var tableBody = document.getElementById("tableBody");

    for (let i = 0; i < memberArray.length; i++) {
        var member = memberArray[i];
        memberbirthday = new Date(member.birthday);
        const newRow = tableBody.insertRow(-1); // -1 fügt die Zeile am Ende der Tabelle ein
        
        const nameCell = newRow.insertCell(0);
        nameCell.innerHTML = member.name[0];
    
        const groupCell = newRow.insertCell(-1);
        if (member.group[0] >= 0) {
            groupCell.innerHTML = allGroups[member.group[0]].name[0];
        } else {
            groupCell.innerHTML = "Ex-" + allGroups[(member.group[0]*-1)].name[0];
        }

        const birthdayCell = newRow.insertCell(-1);
        //countryCell3.innerHTML = birthdayParts;
        birthdayCell.innerHTML = fuehrendeNullWennEinstellig(memberbirthday.getDate())
        + "." + fuehrendeNullWennEinstellig(memberbirthday.getMonth()+1)
        + "." + memberbirthday.getFullYear();
    }
}

function sortName() {
    console.log("Sort Group");
    allMembers.sort(function(a, b) {
        var dateA = new Date(a.birthday);
        var dateB = new Date(b.birthday);

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
        var dateA = new Date(a.birthday);
        var dateB = new Date(b.birthday);
        var groupA = getGroupNameById(a.group[0]);
        var groupB = getGroupNameById(b.group[0]);
    
        // Zuerst nach Gruppe sortieren
        if (groupA < groupB) {
            return -1;
        }
        if (groupA > groupB) {
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
        var dateA = new Date(a.birthday);
        var dateB = new Date(b.birthday);
    
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

function setBirthdays() {
    todaysBirthdays.innerHTML = "";

    for (let i = 0; i < allMembers.length; i++) {
        var member = allMembers[i];
        memberbirthday = new Date(member.birthday);
                
        // Zeitzone für Südkorea festlegen
        const koreaTimezone = 'Asia/Seoul';
        // Aktuelles Datum und Uhrzeitobjekt erstellen
        const currentDate = new Date();
        // Zeitzone für das Datumobjekt festlegen
        const koreaDate = new Date(currentDate.toLocaleString('en-US', {timeZone: koreaTimezone}));
    
        if (koreaDate.getDate() === memberbirthday.getDate() && koreaDate.getMonth() === memberbirthday.getMonth()) {
            if (member.group[0] > 0) {
                todaysBirthdays.innerHTML += ("Heute hat " + member.name[0] + " aus " + allGroups[member.group[0]].name[0] + " Geburtstag. " + member.name[0] + " wird " + (koreaDate.getYear()-memberbirthday.getYear()) + " Jahre alt.<br>");
            }
            if (member.group[0] < 0) {
                todaysBirthdays.innerHTML += ("Heute hat " + member.name[0] + " aus Ex-" + allGroups[(member.group[0]*-1)].name[0] + " Geburtstag. " + member.name[0] + " wird " + (koreaDate.getYear()-memberbirthday.getYear()) + " Jahre alt.<br>");
            }
            if (member.group[0] == 0) {
                todaysBirthdays.innerHTML += ("Heute hat " + member.name[0] + " Geburtstag. " + member.name[0] + " wird " + (koreaDate.getYear()-memberbirthday.getYear()) + " Jahre alt.<br>");
            }
        }
        // Aktuelles Datum erstellen
        const currentDate2 = new Date();

        // x Tage (in Millisekunden) zum aktuellen Datum hinzufügen
        const futureDate = new Date(koreaDate.getTime() + 4 * 24 * 60 * 60 * 1000);

        if (memberbirthday.getDate() > koreaDate.getDate()
            && memberbirthday.getDate() < futureDate.getDate()
            && memberbirthday.getMonth()+1 == koreaDate.getMonth()+1) {
            nextBirthdays.push(member);
        }   
    }
}

function setNextBirthdays(membersWithNextBirthdays) {
    membersWithNextBirthdays.sort(function(a, b) {
        var dateA = new Date(a.birthday);
        var dateB = new Date(b.birthday);
    
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

    console.log(membersWithNextBirthdays);

    for (let i = 0; i < membersWithNextBirthdays.length; i++) {
        var member = membersWithNextBirthdays[i];
        memberbirthday = new Date(member.birthday);
        
        // Zeitzone für Südkorea festlegen
        const koreaTimezone = 'Asia/Seoul';
        // Aktuelles Datum und Uhrzeitobjekt erstellen
        const currentDate = new Date();
        // Zeitzone für das Datumobjekt festlegen
        const koreaDate = new Date(currentDate.toLocaleString('en-US', {timeZone: koreaTimezone}));
    
        if (member.group[0] > 0) {
            todaysBirthdays.innerHTML += ("Am " + memberbirthday.getDate() + "." + (memberbirthday.getMonth()+1) + " hat " + member.name[0] + " aus " + allGroups[member.group[0]].name[0] + " Geburtstag. " + member.name[0] + " wird " + (koreaDate.getYear()-memberbirthday.getYear()) + " Jahre alt.<br>");
        }
        if (member.group[0] < 0) {
            todaysBirthdays.innerHTML += ("Am " + memberbirthday.getDate() + "." + (memberbirthday.getMonth()+1) + " hat " + member.name[0] + " aus Ex-" + allGroups[(member.group[0]*-1)].name[0] + " Geburtstag. " + member.name[0] + " wird " + (koreaDate.getYear()-memberbirthday.getYear()) + " Jahre alt.<br>");
        }
        if (member.group[0] == 0) {
            todaysBirthdays.innerHTML += ("Am " + memberbirthday.getDate() + "." + (memberbirthday.getMonth()+1) + " hat " + member.name[0] + " Geburtstag. " + member.name[0] + " wird " + (koreaDate.getYear()-memberbirthday.getYear()) + " Jahre alt.<br>");
        }
    }
}

function removeExPrefix(groupName) {
    groupName = groupName.toLowerCase();
    if (groupName != "") {
        if (groupName.startsWith("ex-".toLowerCase())) {
            groupName = groupName.replace("ex-".toLowerCase(), "");
        }
    }
        
    return groupName;
}

function getGroupNameById(groupId) {
    let groupName;
    if (groupId >= 0) {
        groupName = allGroups[groupId].name[0];
    } else {
        groupName = allGroups[(groupId*-1)].name[0];
    }
    
    return groupName;
}

setBirthdays();
setNextBirthdays(nextBirthdays)
setMembers(allMembers);
