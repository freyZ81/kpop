// Werte aus dem Local Storage abrufen und verwenden
allGroups = JSON.parse(localStorage.getItem('groupsArray'));
allMembers = JSON.parse(localStorage.getItem('membersArray'));

const tableMembersGroupsAndBirthdays = document.getElementById("tableMembersGroupsAndBirthdays");
let todaysBirthdays = document.getElementById("birthdays");
let nextBirthdays = [];
const counter = document.getElementById("counter");
counter.innerHTML = "In the list are " + allMembers.length + " members (" + allMembers.filter(member => member.gender === 1).length + " girls and " + allMembers.filter(member => member.gender === 2).length + " boys) from " + (allGroups.length-1) + " groups and soloists.";


document.querySelectorAll('.filter-input').forEach(input => {
    input.addEventListener('keyup', filterTable);
    input.addEventListener('change', filterTable);
});

function filterTable() {
    let nameFilter = document.getElementById('filterName').value.toLowerCase();
    let groupFilter = document.getElementById('filterGroup').value.toLowerCase();
    let dateFilter = document.getElementById('filterDate').value.toLowerCase();
    let genderFilter = document.getElementById('filterGender').value.toLowerCase();

    let table = document.getElementById('tableBody');
    let tr = table.getElementsByTagName('tr');

    for (let i = 0; i < tr.length; i++) {
        let tdGroup = tr[i].getElementsByTagName('td')[0];
        let tdName = tr[i].getElementsByTagName('td')[1];
        let tdDate = tr[i].getElementsByTagName('td')[2];
        let tdGender = tr[i].getElementsByTagName('td')[3];

        if (tdName && tdGroup) {
            let nameValue = tdName.textContent || tdName.innerText;
            let groupValue = tdGroup.textContent || tdGroup.innerText;
            let dateValue = tdDate.textContent || tdDate.innerText;
            let genderValue = tdGender.textContent || tdGender.innerText;
            
            if (nameValue.toLowerCase().indexOf(nameFilter) > -1 &&
                groupValue.toLowerCase().indexOf(groupFilter) > -1 &&
                dateValue.toLowerCase().indexOf(dateFilter) > -1 &&
                genderFilter.toLowerCase().includes(genderValue.toLowerCase()))
            {
                tr[i].style.display = '';
            } else {
                tr[i].style.display = 'none';
            }
        }       
    }
}

function fuehrendeNullWennEinstellig(num) {
    return num < 10 ? "0" + num : num;
}

function setMembers(memberArray) {
    var tableBody = document.getElementById("tableBody");

    for (let i = 0; i < memberArray.length; i++) {
        var member = memberArray[i];
        memberbirthday = new Date(member.birthday);
        const newRow = tableBody.insertRow(-1); // -1 fügt die Zeile am Ende der Tabelle ein
            
        const groupCell = newRow.insertCell(0);
        if (member.group.length == 1) {
            if (member.group[0] >= 0) {
                groupCell.innerHTML = allGroups[member.group[0]].name[0];
            } else {
                groupCell.innerHTML = "Former " + allGroups[(member.group[0]*-1)].name[0];
            }
        } else {
            groupCell.innerHTML = allGroups[member.group[0]].name[0];
            for (let i = 1; i < member.group.length; i++) {
                if (member.group[i] >= 0) {
                    groupCell.innerHTML += ", " + allGroups[member.group[i]].name[0];
                } else {
                    groupCell.innerHTML += ", former " + allGroups[(member.group[i]*-1)].name[0];
                }
            }
        }

        const nameCell = newRow.insertCell(-1);
        nameCell.innerHTML = member.name[0];

        const birthdayCell = newRow.insertCell(-1);
        birthdayCell.innerHTML = fuehrendeNullWennEinstellig(memberbirthday.getDate())
        + "." + fuehrendeNullWennEinstellig(memberbirthday.getMonth()+1)
        + "." + memberbirthday.getFullYear();

        const genderCell = newRow.insertCell(-1);
        genderCell.innerHTML = member.gender == 1 ? "Girl" : "Boy";
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
    filterTable();
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
    filterTable();
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
    filterTable();
}

function setBirthdays() {
    todaysBirthdays.innerHTML = '<span class="colored-text">';

    for (let i = 0; i < allGroups.length; i++) {
        var group = allGroups[i];
        var groupDebut = new Date(group.debut);
        // Zeitzone für Südkorea festlegen
        const koreaTimezone = 'Asia/Seoul';
        // Aktuelles Datum und Uhrzeitobjekt erstellen
        const currentDate = new Date();
        // Zeitzone für das Datumobjekt festlegen
        const koreaDate = new Date(currentDate.toLocaleString('en-US', {timeZone: koreaTimezone}));
        if (groupDebut != null | groupDebut != "") {
            if (koreaDate.getDate() === groupDebut.getDate() && koreaDate.getMonth() === groupDebut.getMonth()) {
                todaysBirthdays.innerHTML += ("Heute hat " + group.name[0] + " (" + group.entertainment[0] + ") ihr " + (koreaDate.getYear()-groupDebut.getYear()) + ". Anniversary.<br>")
            }
        }
    }

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
                todaysBirthdays.innerHTML += ("Heute hat " + member.name[0] + ", former " + allGroups[(member.group[0]*-1)].name[0] + ", Geburtstag. " + member.name[0] + " wird " + (koreaDate.getYear()-memberbirthday.getYear()) + " Jahre alt.<br>");
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

    todaysBirthdays.innerHTML = todaysBirthdays.innerHTML.replace("</span>", "").trim()
    todaysBirthdays.innerHTML += "</span><br>"
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

    //console.log(membersWithNextBirthdays);

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
            todaysBirthdays.innerHTML += ("Am " + fuehrendeNullWennEinstellig(memberbirthday.getDate()) + "." + fuehrendeNullWennEinstellig(memberbirthday.getMonth()+1) + " hat " + member.name[0] + " aus " + allGroups[member.group[0]].name[0] + " Geburtstag. " + member.name[0] + " wird " + (koreaDate.getYear()-memberbirthday.getYear()) + " Jahre alt.<br>");
        }
        if (member.group[0] < 0) {
            todaysBirthdays.innerHTML += ("Am " + fuehrendeNullWennEinstellig(memberbirthday.getDate()) + "." + fuehrendeNullWennEinstellig(memberbirthday.getMonth()+1) + " hat " + member.name[0] + ", former " + allGroups[(member.group[0]*-1)].name[0] + ", Geburtstag. " + member.name[0] + " wird " + (koreaDate.getYear()-memberbirthday.getYear()) + " Jahre alt.<br>");
        }
        if (member.group[0] == 0) {
            todaysBirthdays.innerHTML += ("Am " + fuehrendeNullWennEinstellig(memberbirthday.getDate()) + "." + fuehrendeNullWennEinstellig(memberbirthday.getMonth()+1) + " hat " + member.name[0] + " Geburtstag. " + member.name[0] + " wird " + (koreaDate.getYear()-memberbirthday.getYear()) + " Jahre alt.<br>");
        }
    }
}

function removeExPrefix(groupName) {
    // wird aktuell nicht verwendet
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

function setTimes() {
    //TODO: neu laden, wenn es 17 Uhr hier oder Mitternacht KST ist

    // Aktuelles Datum und Uhrzeitobjekt erstellen
    const currentDate = new Date();
    //currentDate.timeZone = 'Europe/Berlin'

    const koreaTime = currentDate.toLocaleTimeString('de-DE', {
        timeZone: 'Asia/Seoul',
        hour12: true,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    const midnight = "12:00:00 PM"
    const koreaMidnight = koreaTime

    if (midnight == koreaMidnight) {
        location.reload()
    }

    function getOffsetMinutes(timeZone) {
        const now = new Date();
        const localTime = new Date(now.toLocaleString("en-US", { timeZone }));
        return (localTime - now) / 60000;
    }

    function timezoneDifference(tz1, tz2) {
        const diff = Math.round((getOffsetMinutes(tz2) - getOffsetMinutes(tz1)) / 60);
        return diff;
    }

    let timeField = document.getElementById("time")
    timeField.innerHTML = "Es ist gerade " + koreaTime + " (+" + timezoneDifference("Europe/Berlin", "Asia/Seoul") + " Stunden) Uhr in Südkorea."
}

setBirthdays();
setNextBirthdays(nextBirthdays)
setTimes()
setInterval(setTimes,1000)
setMembers(allMembers)
