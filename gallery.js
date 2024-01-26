// Werte aus dem Local Storage abrufen und verwenden
allMembers = JSON.parse(localStorage.getItem('membersArray'));

var tableGalery = document.getElementById("tableGalery");
const folder = "pics/";
var arrayNoPictures = [];


for (let i = 0; i < allMembers.length; i++) {
    currentMember = allMembers[i];
    let source;
    if (currentMember.group[0] != '') {
        let groupStr = currentMember.group[currentMember.group.length-1].toString().toLowerCase();
        if (groupStr.startsWith("ex-".toLowerCase())) {
            groupStr = groupStr.replace("ex-".toLowerCase(), "");
        }
        source = folder + groupStr + "/" + currentMember.name[currentMember.name.length-1].toString().toLowerCase() + ".jpg";
    } else if (currentMember.group[0] == '') {
        source = folder + "solo/" + currentMember.name[currentMember.name.length-1].toString().toLowerCase() + ".jpg";
    }

    const newRow = tableGalery.insertRow(-1); // -1 fügt die Zeile am Ende der Tabelle ein
    
    const countryCell = newRow.insertCell(0);
    countryCell.innerHTML = currentMember.name[0];

    const countryCell2 = newRow.insertCell(-1);
    countryCell2.innerHTML = currentMember.group[0];

    const countryCell3 = newRow.insertCell(-1);
    countryCell3.innerHTML = "<img src=\"" + source + "\" alt=\"" + source + "\" height=\"200px\" width=\"150px\">"

}

