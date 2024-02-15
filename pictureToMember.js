// Werte aus dem Local Storage abrufen und verwenden
allMembers = JSON.parse(localStorage.getItem('membersArray'));

const memberPicture = document.getElementById("memberPicture");
let randomNumber;
let currentRandomNumber;
const folder = "pics/";
const result = document.getElementById("result");
const hint = document.getElementById("hint");
let currentMember;
const streak = document.getElementById("streak");
let streakCounter = 0;
const wrongGuesses = document.getElementById("wrongGuesses");
let guesses = "Wrong guesses: ";
let randomGuess = true;
let groupToGuess = [];
const buttonGroupGuesses = document.getElementById("buttonGroupGuesses");
let helpCounter = 1;

function setNewPicture() {
    reset();
    //es wird eine neue zufällige Zahl generiert
    if (randomGuess) {
        randomNumber = Math.floor(Math.random() * allMembers.length);
        currentRandomNumber = randomNumber != currentRandomNumber ? randomNumber : Math.floor(Math.random() * allMembers.length);
        currentMember = allMembers[currentRandomNumber];
    } else {
        randomNumber = Math.floor(Math.random() * groupToGuess.length);
        currentRandomNumber = randomNumber != currentRandomNumber ? randomNumber : Math.floor(Math.random() * groupToGuess.length);    
        currentMember = groupToGuess[currentRandomNumber];
    }

    //das Bild wird gesetzt
    if (currentMember.group[0] != '') {
        //Gruppenmember
        let groupStr = currentMember.group[currentMember.group.length-1].toString().toLowerCase();
        
        //wenn es ein Ex-Member ist
        groupStr = groupStr.startsWith("ex-".toLowerCase()) ? groupStr.replace("ex-".toLowerCase(), "") : groupStr;
        
        let source = folder + groupStr + "/" + currentMember.name[currentMember.name.length-1].toString().toLowerCase() + ".jpg";
        memberPicture.alt = source;
        memberPicture.src = source;
    } else if (currentMember.group[0] == '') {
        //Soloist
        let source = folder + "solo/" + currentMember.name[currentMember.name.length-1].toString().toLowerCase() + ".jpg";
        memberPicture.alt = source;
        memberPicture.src = source;
    }
    answer.focus();
}

function checkAnswer() {
    const answer = document.getElementById("answer").value.toLowerCase().trim()
    if (answer != "") {
        if (answer == "help" || answer == "hint") {
            getHelp();
            document.getElementById("answer").value = "";
        } else if (answer == "skip") {
            skip();
        } else {
            let correctMemberNames = currentMember.name.map(name => name.toLowerCase());
            let correctGroupNames = currentMember.group.map(group => group.startsWith("ex-".toLowerCase()) ? group.replace("ex-".toLowerCase(), "").toLowerCase() : group.toLowerCase());
            if (correctMemberNames.includes(answer)) {
                result.innerHTML = "You guessed it correct."
                    + " It was " + currentMember.name[0];
                if (currentMember.group[0] != '') {
                    result.innerHTML += " from " + currentMember.group[0];
                }
                result.innerHTML += ".";
                guesses = "Wrong guesses: ";
                wrongGuesses.innerHTML = "";
                streakCounter += 1;
                streak.innerHTML = "You guessed " + streakCounter + " correct in a row.";
                document.getElementById("answer").value = "";
                document.getElementById("hint").innerHTML = "";
                setNewPicture();
            } else if (correctGroupNames.includes(answer) || correctGroupNames.includes("ex-" + answer)) {
                hint.innerHTML = "You are right. The member is from the group '"
                    + currentMember.group[0] + "'.";
                document.getElementById("answer").value = "";                    
            } else {
                result.innerHTML = "That was wrong. It is not '" + answer + "'.";
                streakCounter = 0;
                streak.innerHTML = "";
                guesses += (answer + ", ");
                wrongGuesses.innerHTML = guesses;
                document.getElementById("answer").value = "";
            }
        }
    }
}

function reset() {
    document.getElementById("answer").value = "";
    document.getElementById("hint").innerHTML = "";
    guesses = "Wrong guesses: ";
    wrongGuesses.innerHTML = "";
    helpCounter = 1;
    buttonHelp.innerHTML = "Help";
}

function skip() {
    reset();
    streakCounter = 0;
    streak.innerHTML = "";
    result.innerHTML = "The member was '" + currentMember.name[0] + "'";
    if (currentMember.group[0] != '') {
        result.innerHTML += " from " + currentMember.group[0];
    }
    result.innerHTML += ".";
    setNewPicture();
}

function getHelp() {
    buttonHelp = document.getElementById("buttonHelp");
    if (helpCounter == 1) {
        if (currentMember.group[0] != "") {
            hint.innerHTML = "The member is from the group " + currentMember.group[0] + ".";
        } else {
            hint.innerHTML = "The member is a soloist.";
        }
        helpCounter = 2;
        buttonHelp.innerHTML = "Help 2";
    } else if (helpCounter == 2) {
        hint.innerHTML += "<br>The name has " + currentMember.name[-0].toString().length + " letters.";
        helpCounter = 3;
        buttonHelp.innerHTML = "Help 3";
    } else if (helpCounter == 3) {
        hint.innerHTML += "<br>The name starts with " + currentMember.name[0].toString()[0];
        helpCounter = 4;
        buttonHelp.innerHTML = "No more hints";
    }
}

function setGroupToGuess() {
    if (randomGuess) {
        const groupInput = document.getElementById("answer").value.toLowerCase().trim()
        if (groupInput != "") {
            for (let i = 0; i < allMembers.length; i++) {
                if (allMembers[i].group != "") {
                    let correctGroupNames = allMembers[i].group.map(group => group.toLowerCase());
                    if (correctGroupNames.includes(groupInput)) {
                        groupToGuess.push(allMembers[i]);
                        randomGuess = false;
                    }
                }
            }
            if (groupToGuess.length == 0) {
                result.innerHTML = "There was no group found with the name '"
                    + groupInput + "'.";
                document.getElementById("answer").value = "";

            } else {
                buttonGroupGuesses.innerHTML = "Random guess"
                document.getElementById("answer").value = "";
            }
        }
    } else {
        randomGuess = true;
        buttonGroupGuesses.innerHTML = "Group guess";
        groupToGuess = [];
        document.getElementById("answer").value = "";
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
