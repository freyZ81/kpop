// Werte aus dem Local Storage abrufen und verwenden
allMembers = JSON.parse(localStorage.getItem('membersArray'));

const memberPicture = document.getElementById("memberPicture");
const answer = document.getElementById("answer");
let randomNumber;
const folder = "pics/";
const result = document.getElementById("result");



function setNewPicture() {
    randomNumber = Math.floor(Math.random() * allMembers.length);

    console.log(allMembers[randomNumber].name[allMembers[randomNumber].name.length-1]);
    console.log(allMembers[randomNumber].name);
    if (allMembers[randomNumber].group[0] != '') {
        let source = folder + allMembers[randomNumber].group[allMembers[randomNumber].group.length-1].toString().toLowerCase()
        + "/" + allMembers[randomNumber].name[allMembers[randomNumber].name.length-1].toString().toLowerCase() + ".jpg";
        memberPicture.alt = source;
    } else if (allMembers[randomNumber].group[0] == '') {
        let source = folder + "solo/" + allMembers[randomNumber].name[allMembers[randomNumber].name.length-1].toString().toLowerCase() + ".jpg";
        memberPicture.alt = source;
        memberPicture.src = source;
    }
    answer.focus();
}

console.log(allMembers.length);
function checkAnswer() {
    if (answer.value.toLowerCase() === allMembers[randomNumber].name[-0].toLowerCase()) {
        result.innerHTML = "You guessed it correct.";
        answer.value = "";
    } else {
        result.innerHTML = "That was wrong. It was " + allMembers[randomNumber].name[0]
        + " from " + allMembers[randomNumber].group[0] + ".";
        answer.value = "";
    }
    setNewPicture();
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