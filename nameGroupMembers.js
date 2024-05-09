// Werte aus dem Local Storage abrufen und verwenden
allGroups = JSON.parse(localStorage.getItem('groupsArray'));
allMembers = JSON.parse(localStorage.getItem('membersArray'));

const question = document.getElementById("question")
const inputGroupMember = document.getElementById("inputGroupMember")
const tableMembers = document.getElementById("tableMembers")
const buttonGroupMember = document.getElementById("buttonGroupMember")
let tableBody = document.getElementById("tableBody")
let tableHeader = document.getElementById("tableHeader")
let counter = document.getElementById("counter")
let groupSelected = false
let choosedGroupMembers = []
let selectedGroup

inputGroupMember.focus()

// Überprüft, ob die Enter-Taste gedrückt wurde
document.getElementById("inputGroupMember").addEventListener("keyup", function(event) {
    // Wenn Enter gedrückt wurde, überprüfen wir die Antwort
    let userInput = document.getElementById("inputGroupMember").value.toLowerCase().trim()
    if (event.keyCode === 13) {
      event.preventDefault();
      checkAnswer();
    } else if (groupSelected) {
        checkMemberName(userInput)
    }
});



function checkAnswer() {
    let userInput = document.getElementById("inputGroupMember").value.toLowerCase().trim()
    let groupId
    if (userInput == "give up" || userInput == "giveup") {
        //es wird aufgegeben
        giveUp()
    } else {
        //wenn ein Name oder Gruppe eingegeben wird
        if (!groupSelected) {
            //die Gruppe wird ausgewählt
            for (let i = 0; i < allGroups.length; i++) {
                let currentGroup = allGroups[i]
                if (currentGroup.id != 0) {
                    let groupNames = currentGroup.name.map(name => name.toLowerCase())
                    if (groupNames.includes(userInput)) {
                        //der Gruppenname entspricht der Eingabe
                        groupSelected = true
                        selectedGroup = currentGroup.name[0]
                        groupId = currentGroup.id
                        break
                    }
                }
            }
            if (groupId != undefined) {
                for (let i = 0; i < allMembers.length; i++) {
                    if (allMembers[i].group[0] == groupId) {
                        choosedGroupMembers.push(allMembers[i].name)
                    }
                }
            }
            if (!groupSelected) {
                //wenn ein unbekannter Gruppenname eingegeben wurde
                question.innerHTML = "There was no group found with the name '" + userInput + "'. "
                + "Please check and try again."
            } else {
                //wenn der Gruppenname gefunden wurde
                choosedGroupMembers.sort()
                tableHeader.innerHTML = "Group: " + selectedGroup
                question.innerHTML = "Which member is in the group '" + selectedGroup + "'?"
                inputGroupMember.value = ""
                tableBody.innerHTML = ""
                inputGroupMember.placeholder = "member"
                buttonGroupMember.innerHTML = "Enter member"
                counter.innerHTML = "There are " + choosedGroupMembers.length + " members left."
            }
        } else {
            //die Membernamen werden eingegeben
            checkMemberName(userInput)
        }
    }
}

function giveUp() {
    //wenn aufgegeben wird
    if (choosedGroupMembers.length != 0) {
        //Text wird angepasst, wenn noch Member fehlen
        counter.innerHTML = "The remaining " + choosedGroupMembers.length + " members of '" + selectedGroup + "' were "
        for (let i = 0; i < choosedGroupMembers.length; i++) {
            if (i == (choosedGroupMembers.length-1)) {
                counter.innerHTML += " and "
                counter.innerHTML += choosedGroupMembers[i][0] + "."
            } else {
                counter.innerHTML += choosedGroupMembers[i][0] + ", "
            }
        }
        reset()
    }
}

function reset() {
    //alles wird zurückgesetzt
    question.innerHTML = "Which group do you want to name?"
    inputGroupMember.value = ""
    inputGroupMember.placeholder = "group"
    buttonGroupMember.innerHTML = "Enter group"
    //counter.innerHTML = ""
    groupSelected = false
    choosedGroupMembers = []
}

function checkMemberName(userInput) {
    for (let i = 0; i < choosedGroupMembers.length; i++) {
        let currentMember = choosedGroupMembers[i]
        let memberNames = currentMember.map(currentMember => currentMember.toLowerCase())
        if (memberNames.includes(userInput)) {
            //Name in der Tabelle hinzufügen
            const newRow = tableBody.insertRow(-1); // -1 fügt die Zeile am Ende der Tabelle ein
            const newCell = newRow.insertCell(0);
            newCell.innerHTML = choosedGroupMembers[i][0]
            
            //Name aus der Liste nehmen
            choosedGroupMembers.splice(i, 1)

            //Eingabefeld leeren
            document.getElementById("inputGroupMember").value = ""
            
            //Text updaten
            counter.innerHTML = "There are " + choosedGroupMembers.length + " members left."
            if (choosedGroupMembers.length == 0) {
                //wenn alle Member genannt wurden
                counter.innerHTML = "You named all members of '" + selectedGroup + "'."
                reset()
            }
        }
    }
}