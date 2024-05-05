// Werte aus dem Local Storage abrufen und verwenden
allGroups = JSON.parse(localStorage.getItem('groupsArray'));
allMembers = JSON.parse(localStorage.getItem('membersArray'));

const question = document.getElementById("question")
const inputGroupMember = document.getElementById("inputGroupMember")
const tableMembers = document.getElementById("tableMembers")
const buttonGroupMember = document.getElementById("buttonGroupMember")
let tableBody = document.getElementById("tableBody")
let tableHeader = document.getElementById("tableHeader")
let member = document.getElementById("member")
let groupSelected = false
let choosedGroupMembers = []
let selectedGroup
let revealedCounter = 0
let guessedCounter = 0
let revealedMembers = []

// Überprüft, ob die Enter-Taste gedrückt wurde
document.getElementById("inputGroupMember").addEventListener("keyup", function(event) {
    // Wenn Enter gedrückt wurde, überprüfen wir die Antwort
    if (event.keyCode === 13) {
      event.preventDefault();
      checkAnswer();
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
                inputGroupMember.placeholder = "member"
                buttonGroupMember.innerHTML = "Enter member"
                revealNextMember();
            }
        } else {
            //die Membernamen werden eingegeben
            let currentMember = revealedMembers[guessedCounter]
            let memberNames = currentMember.map(currentMember => currentMember.toLowerCase())
            if (memberNames.includes(userInput)) {
                if (guessedCounter == 0) {
                    tableBody.innerHTML = ""
                }
                //Name in der Tabelle hinzufügen
                const newRow = tableBody.insertRow(-1); // -1 fügt die Zeile am Ende der Tabelle ein
                const newCell = newRow.insertCell(0);
                newCell.innerHTML = revealedMembers[guessedCounter][0]

                //Eingabefeld leeren
                document.getElementById("inputGroupMember").value = ""
                
                guessedCounter += 1
                if (guessedCounter == revealedCounter) {
                    revealNextMember();
                }
            }
        }
    }
}

function giveUp() {
    //wenn aufgegeben wird
    /*if (choosedGroupMembers.length != 0) {
        //Text wird angepasst, wenn noch Member fehlen
        member.innerHTML = "The remaining " + choosedGroupMembers.length + " members of '" + selectedGroup + "' were "
        for (let i = 0; i < choosedGroupMembers.length; i++) {
            if (i == (choosedGroupMembers.length-1)) {
                member.innerHTML += " and "
                member.innerHTML += choosedGroupMembers[i] + "."
            } else {
                member.innerHTML += choosedGroupMembers[i] + ", "
            }
        }
        reset()
    }*/
    member.innerHTML = "The searched member was '" + revealedMembers[guessedCounter][0] + "'."
    reset()
}

function reset() {
    //alles wird zurückgesetzt
    question.innerHTML = "Which group do you want to learn?"
    inputGroupMember.value = ""
    inputGroupMember.placeholder = "group"
    buttonGroupMember.innerHTML = "Enter group"
    //member.innerHTML = ""
    groupSelected = false
    choosedGroupMembers = []
    revealedMembers = []
    revealedCounter = 0
    tableBody.innerHTML = ""
    tableHeader.innerHTML = "Group"
}

function revealNextMember() {
    if (choosedGroupMembers != "") {
        member.innerHTML = "The next member is '" + choosedGroupMembers[0] + "'.";
        revealedMembers.push(choosedGroupMembers[0])
        guessedCounter = 0;
        revealedCounter += 1;
        choosedGroupMembers.splice(0,1)
        //console.log(revealedMembers)
    } else {
        member.innerHTML = "You named all members of " + selectedGroup + "."
        reset()
    }
}