// Werte aus dem Local Storage abrufen und verwenden
allMembers = JSON.parse(localStorage.getItem('membersArray'));

const tableMembersGroupsAndBirthdays = document.getElementById("tableMembersGroupsAndBirthdays");

function fuehrendeNullWennEinstellig(num) {
    return num < 10 ? "0" + num : num;
}

function setMembers(memberArray) {
    for (let i = 0; i < memberArray.length; i++) {
        var member = memberArray[i];
        memberbirthday = new Date(member.birthday);
        const newRow = tableMembersGroupsAndBirthdays.insertRow(-1); // -1 fügt die Zeile am Ende der Tabelle ein
        
        const countryCell = newRow.insertCell(0);
        countryCell.innerHTML = member.name;
    
        const countryCell2 = newRow.insertCell(-1);
        countryCell2.innerHTML = member.group[0];
        
        const countryCell3 = newRow.insertCell(-1);
        countryCell3.innerHTML = fuehrendeNullWennEinstellig(memberbirthday.getDate())
        + "." + fuehrendeNullWennEinstellig(memberbirthday.getMonth()+1)
        + "." + memberbirthday.getFullYear();
      }
    
     
}

setMembers(allMembers)