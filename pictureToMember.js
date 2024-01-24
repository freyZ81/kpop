// Werte aus dem Local Storage abrufen und verwenden
allMembers = JSON.parse(localStorage.getItem('membersArray'));

const memberPicture = document.getElementById("memberPicture");
let randomNumber;
const folder = "pics/";
const result = document.getElementById("result");



function setNewPicture() {
    randomNumber = Math.floor(Math.random() * allMembers.length);

    if (allMembers[randomNumber].group[0] != '') {
        let groupStr = allMembers[randomNumber].group[allMembers[randomNumber].group.length-1].toString().toLowerCase();
        if (groupStr.startsWith("ex-".toLowerCase())) {
            groupStr = groupStr.replace("ex-".toLowerCase(), "");
        }
        let source = folder + groupStr + "/" + allMembers[randomNumber].name[allMembers[randomNumber].name.length-1].toString().toLowerCase() + ".jpg";
        memberPicture.alt = source;
    } else if (allMembers[randomNumber].group[0] == '') {
        let source = folder + "solo/" + allMembers[randomNumber].name[allMembers[randomNumber].name.length-1].toString().toLowerCase() + ".jpg";
        memberPicture.alt = source;
        memberPicture.src = source;
    }
    answer.focus();
}

function checkAnswer() {
    const answer = document.getElementById("answer").value.toLowerCase();
    if (answer != "") {
        let correctMemberNames = allMembers[randomNumber].name.map(name => name.toLowerCase());
        if (correctMemberNames.includes(answer)) {
            result.innerHTML = "You guessed it correct."
            + " It was " + allMembers[randomNumber].name[0]
            + " from " + allMembers[randomNumber].group[0] + ".";
            document.getElementById("answer").value = "";
            setNewPicture();

        } else {
            result.innerHTML = "That was wrong. It is not '" + answer + "'.";
            document.getElementById("answer").value = "";
        }
        
    }
}

// Überprüft, ob die Enter-Taste gedrückt wurde
document.getElementById("answer").addEventListener("keyup", function(event) {
    // Wenn Enter gedrückt wurde, überprüfen wir die Antwort
    if (event.keyCode === 13) {
      event.preventDefault();
      checkAnswer();
    }
  });

setNewPicture()