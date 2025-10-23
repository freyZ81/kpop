// Werte aus dem Local Storage abrufen und verwenden
allMembers = JSON.parse(localStorage.getItem('membersArray'));
allGroups = JSON.parse(localStorage.getItem('groupsArray'))

var tableGallery = document.getElementById("tableGallery");
const folder = "pics/";
var arrayNoPictures = [];

function getPicturesOld() {
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

        const newRow = tableGallery.insertRow(-1); // -1 fügt die Zeile am Ende der Tabelle ein
        
        const countryCell = newRow.insertCell(0);
        countryCell.innerHTML = currentMember.name[0];

        const countryCell2 = newRow.insertCell(-1);
        countryCell2.innerHTML = currentMember.group[0];

        const countryCell3 = newRow.insertCell(-1);
        countryCell3.innerHTML = "<img src=\"" + source + "\" alt=\"" + source + "\" height=\"200px\" width=\"150px\">"

    }
}

function getPictures() {
    function getFilePath() {
        return folder + currentGroupName + "/" + currentMember.name[currentMember.name.length-1].toString().toLowerCase() + ".jpg"
    }

    console.log(allMembers.length)

    for (let m= 0; m < allMembers.length; m++) {
    //for (let m= 595; m < (m+100); m++) {
        currentMember = allMembers[m]

        // muss das nicht evtl noch auf den letzten Namen gefiltert werden von den Gruppen?
        currentGroup = currentMember.group[0] < 0 ? allGroups[(currentMember.group[0]*-1)] : allGroups[currentMember.group[0]]
        currentGroupName = currentGroup.name[0]

        let source = getFilePath()
        //console.log(source)

        const newRow = tableGallery.insertRow(-1) // -1 fügt die Zeile am Ende der Tabelle ein
        
        const countryCell = newRow.insertCell(0)
        if (currentMember.group[0] < 0) {
            countryCell.innerHTML = "Former " + currentGroupName
        } else {
            countryCell.innerHTML = currentGroupName
        }
        
        const countryCell2 = newRow.insertCell(-1)
        countryCell2.innerHTML = currentMember.name[0]

        const countryCell3 = newRow.insertCell(-1)
        try {
            countryCell3.innerHTML = "<img src=\"" + source + "\" alt=\"" + source + "\" height=\"200px\" width=\"150px\">"
        } catch (error) {
            console.log(error);
            
        }

    }
}

getPictures()