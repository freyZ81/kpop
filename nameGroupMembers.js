// Werte aus dem Local Storage abrufen und verwenden
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

// Überprüft, ob die Enter-Taste gedrückt wurde
document.getElementById("inputGroupMember").addEventListener("keyup", function(event) {
    // Wenn Enter gedrückt wurde, überprüfen wir die Antwort
    if (event.keyCode === 13) {
      event.preventDefault();
      checkAnswer();
    }
});



function checkAnswer() {
    let userInput = document.getElementById("inputGroupMember").value.toLowerCase()
    if (userInput == "give up" || userInput == "giveup") {
        giveUp()
    } else {

        if (!groupSelected) {
            //die Gruppe wird ausgewählt
            for (let i = 0; i < allMembers.length; i++) {
                let currentMember = allMembers[i]
                if (currentMember.group != "") {
                    let groupNames = currentMember.group.map(group => group.toLowerCase())
                    if (groupNames.includes(userInput)) {
                        choosedGroupMembers.push(allMembers[i])
                        groupSelected = true
                        selectedGroup = currentMember.group[0]
                    }
                }
            }
            if (!groupSelected) {
                question.innerHTML = "There was no group found with the name '" + userInput + "'. "
                + "Please check and try again."
            } else {
                tableHeader.innerHTML = "Group: " + selectedGroup
                question.innerHTML = "Which member is in the group '" + selectedGroup + "'?"
                inputGroupMember.value = ""
                inputGroupMember.placeholder = "member"
                buttonGroupMember.innerHTML = "Enter member"
                counter.innerHTML = "There are " + choosedGroupMembers.length + " members left."
            }
        } else {
            //die Mambernamen werden eingegeben
            for (let i = 0; i < choosedGroupMembers.length; i++) {
                let currentMember = choosedGroupMembers[i]
                let memberNames = currentMember.name.map(name => name.toLowerCase())
                if (memberNames.includes(userInput)) {
                    //Name der Tabelle hinzufügen
                    
                    const newRow = tableBody.insertRow(-1); // -1 fügt die Zeile am Ende der Tabelle ein
                    const newCell = newRow.insertCell(0);
                    newCell.innerHTML = choosedGroupMembers[i].name[0]
                    
                    choosedGroupMembers.splice(i, 1)
                    //console.log(userInput, "was removed")
                    document.getElementById("inputGroupMember").value = ""
                    counter.innerHTML = "There are " + choosedGroupMembers.length + " members left."
                    if (choosedGroupMembers.length == 0) {
                        counter.innerHTML = "You named all members of '" + selectedGroup + "'."
                        reset()
                    }
                }
            }
            
        }
    }
}

function giveUp() {
    if (choosedGroupMembers.length != 0) {
        counter.innerHTML = "The last members of '" + selectedGroup + "' are "
        for (let i = 0; i < choosedGroupMembers.length; i++) {
            if (i == (choosedGroupMembers.length-1)) {
                counter.innerHTML += " and "
                counter.innerHTML += choosedGroupMembers[i].name[0] + "."
            } else {
                counter.innerHTML += choosedGroupMembers[i].name[0] + ", "
            }
        }
        reset()
    }
}

function reset() {
    question.innerHTML = "Which group do you want to name?"
    inputGroupMember.value = ""
    inputGroupMember.placeholder = "group"
    buttonGroupMember.innerHTML = "Enter group"
    //counter.innerHTML = ""
    groupSelected = false
    choosedGroupMembers = []
    tableBody.innerHTML = ""
}