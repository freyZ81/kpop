// Werte aus dem Local Storage abrufen und verwenden
allMembers = JSON.parse(localStorage.getItem('membersArray'));

const memberPicture = document.getElementById("memberPicture");
let randomNumber;
let currentRandomNumber;
const folder = "pics/";
const result = document.getElementById("result");
const hint = document.getElementById("hint");
let currentMember;

function setNewPicture() {
    randomNumber = Math.floor(Math.random() * allMembers.length);
    currentRandomNumber = randomNumber != currentRandomNumber ? randomNumber : Math.floor(Math.random() * allMembers.length);
    currentMember = allMembers[currentRandomNumber];

    if (currentMember.group[0] != '') {
        let groupStr = currentMember.group[currentMember.group.length-1].toString().toLowerCase();
        if (groupStr.startsWith("ex-".toLowerCase())) {
            groupStr = groupStr.replace("ex-".toLowerCase(), "");
        }
        let source = folder + groupStr + "/" + currentMember.name[currentMember.name.length-1].toString().toLowerCase() + ".jpg";
        memberPicture.alt = source;
        memberPicture.src = source;
    } else if (currentMember.group[0] == '') {
        let source = folder + "solo/" + currentMember.name[currentMember.name.length-1].toString().toLowerCase() + ".jpg";
        memberPicture.alt = source;
        memberPicture.src = source;
    }
    answer.focus();
}

function checkAnswer() {
    const answer = document.getElementById("answer").value.toLowerCase();
    if (answer != "") {
        if (answer == "help" || answer == "hint") {
            getHelp();
            document.getElementById("answer").value = "";
        } else if (answer == "skip") {
            skip();
        } else {
            let correctMemberNames = currentMember.name.map(name => name.toLowerCase());
            if (correctMemberNames.includes(answer)) {
                result.innerHTML = "You guessed it correct."
                + " It was " + currentMember.name[0];
                if (currentMember.group[0] != '') {
                    result.innerHTML += " from " + currentMember.group[0];
                }
                result.innerHTML += ".";
                document.getElementById("answer").value = "";
                document.getElementById("hint").innerHTML = "";
                setNewPicture();
            } else {
                result.innerHTML = "That was wrong. It is not '" + answer + "'.";
                document.getElementById("answer").value = "";
            }
        }
    }
}

function skip() {
    document.getElementById("answer").value = "";
    document.getElementById("hint").innerHTML = "";
    result.innerHTML = "The member was '" + currentMember.name[0] + "'";
    if (currentMember.group[0] != '') {
        result.innerHTML += " from " + currentMember.group[0];
    }
    result.innerHTML += ".";
    setNewPicture();
}

function getHelp() {
    if (currentMember.group[0] != "") {
        hint.innerHTML = "The member is from the group " + currentMember.group[0] + ".";
    } else {
        hint.innerHTML = "The member is a soloist.";
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