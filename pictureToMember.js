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
const buttonGroupGuesses = document.getElementById("buttonGroupGuesses")

function setNewPicture() {
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

function skip() {
    document.getElementById("answer").value = "";
    document.getElementById("hint").innerHTML = "";
    streakCounter = 0;
    streak.innerHTML = "";
    guesses = "Wrong guesses: ";
    wrongGuesses.innerHTML = "";
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
                result.innerHTML = "There was no group found with the name '" + groupInput + "'.";
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

//Gruppe nennen und dann, ob es richtig ist -> wenn alle falsch sind, dann prüfen, ob es der Gruppe gleicht und sonst einfach normal weitermachen
//help2 wie viele Buchstaben, help3 den Anfangsbuchstaben -> nachdem der Button gedrückt wurde oder ein mal eingegeben wurde wird es umgeändert
