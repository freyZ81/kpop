// Werte aus dem Local Storage abrufen und verwenden
allMembers = JSON.parse(localStorage.getItem('membersArray'));

const memberPicture = document.getElementById("memberPicture");
const answer = document.getElementById("answer");
let randomNumber;
const folder = "pics/";
const result = document.getElementById("result");



function setNewPicture() {
    randomNumber = Math.floor(Math.random() * allMembers.length);
    console.log(randomNumber);
    console.log(allMembers[randomNumber].group, allMembers[randomNumber].name);

    if (allMembers[randomNumber].group != '') {
        let source = folder + allMembers[randomNumber].group[0].toLowerCase() + "/" + allMembers[randomNumber].name + ".jpg";
        memberPicture.alt = source;
    } else if (allMembers[randomNumber].group == '') {
        let source = folder + "solo/" + allMembers[randomNumber].name.toLowerCase() + ".jpg";
        memberPicture.alt = source;
        memberPicture.src = source;
    }
    answer.focus();
}

console.log(allMembers.length);
function checkAnswer() {
    if (answer.value.toLowerCase() === allMembers[randomNumber].name.toLowerCase()) {
        result.innerHTML = "You guessed it correct.";
        answer.value = "";
    } else {
        result.innerHTML = "That was wrong. It was " + allMembers[randomNumber].name + ".";
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