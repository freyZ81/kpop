allGroups = JSON.parse(localStorage.getItem('groupsArray'))
allMembers = JSON.parse(localStorage.getItem('membersArray'))
const text = document.getElementById("text")
const titleHint = document.getElementById("titleHint")
const spinButton = document.getElementById("spinButton")
let wishedGender
let otherGender
let possibleMembers = allMembers
let choosenMembers = []
let countStreak = 0
let countHighestStreakBeforeWin = 0
let countMissStreak = 0
let countSpins = 0
let countHits = 0
let countMisses = 0
let money = 0
let currentMoneyValue = 1
let spinTime = 3
let costsReduceTime = 50
let costsUpgradeMoney = 25
let costsAddMembers = 100
let costsRemoveMembers = 200
let startTime
let endTime

document.addEventListener("keyup", function(event) {
    // Wenn Enter gedrückt wurde, überprüfen wir die Antwort
    if (event.keyCode === 32) {
      event.preventDefault();
      spin()
    }
});

function setChanceText() {
    titleHint.innerHTML = Math.round((choosenMembers.filter(member => member.gender === wishedGender).length / choosenMembers.length) * 100)
        + "% chance to hit. Probability to win is: " + (Math.pow((choosenMembers.filter(member => member.gender === wishedGender).length / choosenMembers.length), 10)*100).toFixed(4)
        + "%"
}

function addMembers(countMembers, gender) {
    for (let i = 0; i < countMembers; i++) {
        let genderMembers = possibleMembers.filter(member => member.gender == gender)
        let randomNewNumber = Math.floor(Math.random() * genderMembers.length)
        let randomMember = genderMembers[randomNewNumber]
        choosenMembers.push(randomMember)

        possibleMembers = possibleMembers.filter(member => member !== randomMember)
    }
}

function start() {
    document.getElementById("startButton").style = "display: none"
    document.getElementById("form").style = "display: none"
    document.getElementById("spinButton").style = "display: block"
    document.getElementById("btnReduceSpinTime").style = "display: block"
    document.getElementById("btnReduceSpinTime").innerHTML = "Reduce spin time<br>Costs: " + costsReduceTime
    document.getElementById("btnUpgradeMoney").style = "display: block"
    document.getElementById("btnUpgradeMoney").innerHTML = "Upgrade money value<br>Costs: " + costsUpgradeMoney
    document.getElementById("btnAddMembers").style = "display: block"
    document.getElementById("btnAddMembers").innerHTML = "Add new members<br>Costs: " + costsAddMembers
    document.getElementById("btnRemoveMembers").style = "display: block"
    document.getElementById("btnRemoveMembers").innerHTML = "Remove other members<br>Costs: " + costsRemoveMembers
    startTime = new Date()

    text.innerHTML = "Spin to win"

    possibleMembers = allMembers
    choosenMembers = []
    countStreak = 0
    countMissStreak = 0
    countSpins = 0
    countHits = 0
    countMisses = 0
    money = 0
    currentMoneyValue = 1
    spinTime = 3
    costsReduceTime = 50
    costsUpgradeMoney = 25
    costsAddMembers = 100
    costsRemoveMembers = 200

    wishedGender = parseInt(document.getElementById("filterGender").value)
    otherGender = wishedGender == 1 ? 2 : 1
    
    addMembers(30, wishedGender)
    addMembers(70, otherGender)
    
    setChanceText()
    checkButtons()
    
}

function checkButtons() {
    //Button spin time
    if (money >= costsReduceTime && spinTime > 1) {
        document.getElementById("btnReduceSpinTime").classList.add("btn-enabled")
    } else if (money < costsReduceTime) {
        document.getElementById("btnReduceSpinTime").classList.remove("btn-enabled")
        document.getElementById("btnReduceSpinTime").classList.add("btn-disabled")
    }
    if (spinTime == 1) {
        document.getElementById("btnReduceSpinTime").style = "display: none"
    }
    //Button Money value
    if (money >= costsUpgradeMoney) {
        document.getElementById("btnUpgradeMoney").classList.add("btn-enabled")
    } else if (money < costsUpgradeMoney) {
        document.getElementById("btnUpgradeMoney").classList.remove("btn-enabled")
        document.getElementById("btnUpgradeMoney").classList.add("btn-disabled")
    }
    //Button add members
    if (money >= costsAddMembers && possibleMembers.filter(member => member.gender === wishedGender).length >= 100) {
        document.getElementById("btnAddMembers").classList.add("btn-enabled")
    } else {
        document.getElementById("btnAddMembers").classList.remove("btn-enabled")
        document.getElementById("btnAddMembers").classList.add("btn-disabled")
    }
    //Button remove members
    if (money >= costsRemoveMembers && choosenMembers.filter(member => member.gender === otherGender).length >= 55) {
        document.getElementById("btnRemoveMembers").classList.add("btn-enabled")
    } else {
        document.getElementById("btnRemoveMembers").classList.remove("btn-enabled")
        document.getElementById("btnRemoveMembers").classList.add("btn-disabled")
    }
    if (choosenMembers.filter(member => member.gender === otherGender).length == 50) {
        document.getElementById("btnRemoveMembers").style = "display: none"
    }
}

function spin() {
    if (spinButton.disabled == false) {
        countSpins++
        let randomMemberNumber = Math.floor(Math.random() * choosenMembers.length)
        let spinnedMember = choosenMembers[randomMemberNumber]
        
        if (spinnedMember.gender == wishedGender) {
            // es wurde getroffen
            countHits++
            countStreak++
            let gainedMoney = currentMoneyValue * countStreak
            money += gainedMoney
            text.innerHTML = spinnedMember.name[0] + " (" + allGroups[Math.abs(spinnedMember.group[0])].name[0]
            + ")<br>Streak: " + countStreak 
            if (countStreak == 1) {
                text.innerHTML += " after " + countMissStreak + " fails"
                countMissStreak = 0
            }
            text.innerHTML += "<br>Money: " + money + " (+" + gainedMoney + ")"
        } else {
            // es wurde nicht getroffen
            countHighestStreakBeforeWin = countStreak > countHighestStreakBeforeWin ? countStreak : countHighestStreakBeforeWin
            countMisses++
            countMissStreak++
            text.innerHTML = spinnedMember.name[0] + " (" + allGroups[Math.abs(spinnedMember.group[0])].name[0] + ")"
            if (countStreak != 0) {
                text.innerHTML += "<br>Streak was on: " + countStreak
            } else {
                text.innerHTML += "<br>Fails: " + countMissStreak
            }
            text.innerHTML += "<br>Money: " + money
            countStreak = 0
        }
        
        if (countStreak == 10) {
            finishGame()
        }
        checkButtons()
        wartezeit()

        function wartezeit() {
            spinButton.disabled = true;
            let currentSpinTime = spinTime
            
            const timer = setInterval(() => {
            spinButton.textContent = `Wait ${Math.floor(currentSpinTime)} sec.`;
            spinButton.classList.add("btn-loading")
            currentSpinTime -= 0.5;

                if (currentSpinTime < 0) {
                    clearInterval(timer);
                    spinButton.disabled = false;
                    spinButton.classList.remove("btn-loading")
                    spinButton.textContent = "Spin";
                }
            }, 500);
        }
    }
}

function reduceSpinTime() {
    if (money >= costsReduceTime && spinTime > 1) {
        money -= costsReduceTime
        spinTime -= 0.5
        costsReduceTime *= 2
        document.getElementById("btnReduceSpinTime").innerHTML = "Reduce spin time<br>Costs: " + costsReduceTime
        text.innerHTML = "Spintime was reduced. New spin time: " + spinTime + " seconds<br>Streak was on: " + countStreak
            + "<br>Money: " + money
        checkButtons()
    }
}

function upgradeMoney() {
    if (money >= costsUpgradeMoney) {
        money -= costsUpgradeMoney
        currentMoneyValue *= 2
        costsUpgradeMoney *= 2
        document.getElementById("btnUpgradeMoney").innerHTML = "Upgrade money value<br>Costs: " + costsUpgradeMoney
        text.innerHTML = "Money value was upgraded. New base value: " + currentMoneyValue + "<br>Streak was on: " + countStreak
            + "<br>Money: " + money
        checkButtons()
    }    
}

function addNewMembers() {
    if (money >= costsAddMembers) {
        if (possibleMembers.filter(member => member.gender === wishedGender).length >= 100) {
            addMembers(5, wishedGender)
            money -= costsAddMembers
            costsAddMembers = Math.ceil((costsAddMembers*1.5) / 50) * 50
            
            document.getElementById("btnAddMembers").innerHTML = "Add new members<br>Costs: " + costsAddMembers
            text.innerHTML = "New members were added<br>Streak was on: " + countStreak + "<br>Money: " + money
            setChanceText()
            checkButtons()
        }
    }
}

function removeMembers() {
    if (money >= costsRemoveMembers) {
        if (choosenMembers.filter(member => member.gender === otherGender).length >= 55) {
            money -= costsRemoveMembers
            costsRemoveMembers = Math.ceil((costsRemoveMembers*1.5) / 50) * 50

            for (let i = 0; i < 5; i++) {
                let genderMembers = choosenMembers.filter(member => member.gender == otherGender)
                let randomNewNumber = Math.floor(Math.random() * genderMembers.length)
                let randomMember = genderMembers[randomNewNumber]
                choosenMembers = choosenMembers.filter(member => member !== randomMember)
            }

            document.getElementById("btnRemoveMembers").innerHTML = "Remove other members<br>Costs: " + costsRemoveMembers
            text.innerHTML = "Members were removed<br>Streak was on: " + countStreak + "<br>Money: " + money
            setChanceText()
            checkButtons()
        }
    }
}

function finishGame() {
    text.innerHTML = "You won!<br><br>"
    // Anzahl spins zählen und am Ende anzeigen
    text.innerHTML += "Spins: " + countSpins + ", hits: " + countHits + ", misses: " + countMisses + "<br>"
    // den höchsten Streak count anzeigen am Ende, der es dann vorher aber noch nicht zum win geschafft hat
    text.innerHTML += "The highest streak before winning was: " + countHighestStreakBeforeWin + "<br>"
    // Wahrscheinlichkeit mit den settings (Chance zu hitten hoch 10) 10er Streak zu schaffen
    text.innerHTML += "Probability to win now was: " + (Math.pow((choosenMembers.filter(member => member.gender === wishedGender).length / choosenMembers.length), 10)*100).toFixed(4) + "%<br>"
    // Most played idol

    // Zeit, wie lange gebraucht wurde
    endTime = new Date()
    const diffSec = Math.floor((endTime - startTime) / 1000)
    const minutes = Math.floor(diffSec/60)
    const seconds = diffSec % 60

    text.innerHTML += "Time needed: " + minutes.toString().padStart(2, "0") + ":" + seconds.toString().padStart(2, "0") + "<br><br>"

    text.innerHTML += "Select the gender you want to hit and press start"

    document.getElementById("startButton").style = "display: block"
    document.getElementById("form").style = "display: block"
    document.getElementById("spinButton").style = "display: none"
    document.getElementById("btnReduceSpinTime").style = "display: none"
    document.getElementById("btnUpgradeMoney").style = "display: none"
    document.getElementById("btnAddMembers").style = "display: none"
    document.getElementById("btnRemoveMembers").style = "display: none"
}


// maybe am Ende die letzten settings nochmal auflisten

// vlt generell die letzten immer wieder anzeigen

// wenn mal alle Bilder drinne sind, die dann vllt anzeigen
// die Bilder dann immer (Zeit bis zum nächsten spin - 0.5 Sekunden drehen)
