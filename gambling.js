allGroups = JSON.parse(localStorage.getItem('groupsArray'))
allMembers = JSON.parse(localStorage.getItem('membersArray'))
lastSave = JSON.parse(localStorage.getItem('lastSave'))
const text = document.getElementById("text")
const titleHint = document.getElementById("titleHint")
const spinButton = document.getElementById("spinButton")
let wishedGender
let otherGender
let possibleMembers = allMembers
let choosenMembers = []
let countStreak = 0
let countHighestStreakBeforeWin = 0
let countHighestMissStreak = 0
let probabilityHighestMissStreak
let countMissStreak = 0
let countSpins = 0
let countHits = 0
let countMisses = 0
let money
let currentMoneyValue = 1
let countStreakMoney = 0
let countEarnedMoney
let countSpentMoney
let spinTime = 3
let costsReduceTime = 50
let costsUpgradeMoney = 25
let costsAddMembers = 100
let costsRemoveMembers = 200
let startTime
let endTime
let countWishedGender = 30
let countOtherGender = 70
let isRunning = false

document.addEventListener("keyup", function(event) {
    if (event.keyCode === 32 && isRunning) {
      event.preventDefault();
      spin()
    }
});

function setChanceText() {
    titleHint.innerHTML = Math.round((choosenMembers.filter(member => member.gender === wishedGender && member.usable).length / choosenMembers.filter(member => member.usable).length) * 100)
        + "% chance to hit. Probability to win is: "
        + (Math.pow((choosenMembers.filter(member => member.gender === wishedGender && member.usable).length / choosenMembers.filter(member => member.usable === true).length), 10)*100).toFixed(4)
        + "%"
}

function start() {
    possibleMembers = allMembers
    choosenMembers = []
    countStreak = 0
    countMissStreak = 0
    countHighestMissStreak = 0
    probabilityHighestMissStreak = 0
    countSpins = 0
    countHits = 0
    countMisses = 0
    money = 0
    currentMoneyValue = 1
    countStreakMoney = 0
    countEarnedMoney = 0
    countSpentMoney = 0
    spinTime = 3
    costsReduceTime = 50
    costsUpgradeMoney = 25
    costsAddMembers = 100
    costsRemoveMembers = 200
    countWishedGender = 30
    countOtherGender = 70
    isRunning = true

    wishedGender = parseInt(document.getElementById("filterGender").value)
    otherGender = wishedGender == 1 ? 2 : 1
    
    addMembers(countWishedGender, wishedGender)
    addMembers(countOtherGender, otherGender)

    document.getElementById("startButton").style = "display: none"
    document.getElementById("form").style = "display: none"
    document.getElementById("spinButton").style = "display: block"
    document.getElementById("btnReduceSpinTime").style = "display: block"
    document.getElementById("btnReduceSpinTime").innerHTML = "Reduce spin time (" + spinTime + " -> " + (spinTime-0.5)
        + ")<br>Costs: " + costsReduceTime
    document.getElementById("btnUpgradeMoney").style = "display: block"
    document.getElementById("btnUpgradeMoney").innerHTML = "Upgrade money value<br>(" + currentMoneyValue + " -> " + (currentMoneyValue*2)
        + ")<br>Costs: " + costsUpgradeMoney.toLocaleString('de-DE')
    document.getElementById("btnAddMembers").style = "display: block"
    document.getElementById("btnAddMembers").innerHTML = "Add new members (" + countWishedGender + " -> " + (countWishedGender+5)
        + ")<br>Costs: " + costsAddMembers
    document.getElementById("btnRemoveMembers").style = "display: block"
    document.getElementById("btnRemoveMembers").innerHTML = "Remove other members (" + countOtherGender + " -> " + (countOtherGender-5)
        + ")<br>Costs: " + costsRemoveMembers
    startTime = new Date()

    text.innerHTML = "Spin to win"

    
    setChanceText()
    checkButtons()
    
}

function addMembers(countMembers, gender) {
    for (let i = 0; i < countMembers; i++) {
        let genderMembers = possibleMembers.filter(member => member.gender == gender)
        let randomNewNumber = Math.floor(Math.random() * genderMembers.length)
        let randomMember = genderMembers[randomNewNumber]
        randomMember.usable = true
        randomMember.timesSpinned = 0
        choosenMembers.push(randomMember)

        possibleMembers = possibleMembers.filter(member => member !== randomMember)
    }
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
    if (choosenMembers.filter(member => member.gender === otherGender && member.usable === true).length == 50) {
        document.getElementById("btnRemoveMembers").style = "display: none"
    }
}

function spin() {
    if (spinButton.disabled == false) {
        countSpins++
        let membersToSpin = choosenMembers.filter(member => member.usable === true)
        let randomMemberNumber = Math.floor(Math.random() * membersToSpin.length)
        let spinnedMember = membersToSpin[randomMemberNumber]
        spinnedMember.timesSpinned++
        
        if (spinnedMember.gender == wishedGender) {
            // es wurde getroffen
            if (countMissStreak > countHighestMissStreak) {
                countHighestMissStreak = countMissStreak
                probabilityHighestMissStreak = parseFloat((Math.pow((choosenMembers.filter(member => member.gender === otherGender && member.usable).length / choosenMembers.filter(member => member.usable === true).length), countMissStreak)*100).toFixed(3))
            }
            countHits++
            countStreak++
            let gainedMoney = currentMoneyValue * countStreak
            money += gainedMoney
            countStreakMoney += gainedMoney
            countEarnedMoney += gainedMoney
            text.innerHTML = spinnedMember.name[0] + " (" + allGroups[Math.abs(spinnedMember.group[0])].name[0]
            + ")<br>Streak: " + countStreak 
            if (countStreak == 1) {
                text.innerHTML += " after " + countMissStreak + " fails"
                countMissStreak = 0
            }
            text.innerHTML += "<br>Money: " + money.toLocaleString('de-DE') + " (+" + gainedMoney.toLocaleString('de-DE') + ", streak money: " + countStreakMoney.toLocaleString('de-DE') + ")"
        } else {
            // es wurde nicht getroffen
            countHighestStreakBeforeWin = countStreak > countHighestStreakBeforeWin ? countStreak : countHighestStreakBeforeWin
            countMisses++
            countMissStreak++
            text.innerHTML = spinnedMember.name[0] + " (" + allGroups[Math.abs(spinnedMember.group[0])].name[0] + ")"
            if (countStreak != 0) {
                text.innerHTML += "<br>Streak was on: " + countStreak + ", gained money: " + countStreakMoney.toLocaleString('de-DE')
            } else {
                text.innerHTML += "<br>Fails: " + countMissStreak
            }
            text.innerHTML += "<br>Money: " + money.toLocaleString('de-DE')
            countStreak = 0
            countStreakMoney = 0
        }
        text.innerHTML += "<br><img src=\"" + getFile() + "\" alt=\"" + getFile() + "\" height=\"200px\" width=\"150px\">"
        
        if (countStreak == 10) {
            finishGame()
        }
        checkButtons()
        wartezeit()

        function getFile() {
            currentGroup = spinnedMember.group[0] < 0 ? allGroups[(spinnedMember.group[0]*-1)] : allGroups[spinnedMember.group[0]]
            currentGroupName = currentGroup.name[currentGroup.name.length-1]
            return "pics/" + currentGroupName.toLowerCase() + "/" + spinnedMember.name[spinnedMember.name.length-1].toString().toLowerCase() + ".jpg"
        }

        function wartezeit() {
            spinButton.disabled = true;
            let currentSpinTime = spinTime
            
            const timer = setInterval(() => {
            spinButton.textContent = `Wait ${Math.floor(currentSpinTime)} seconds`;
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
        countSpentMoney += costsReduceTime
        spinTime -= 0.5
        costsReduceTime *= 2
        document.getElementById("btnReduceSpinTime").innerHTML = "Reduce spin time (" + spinTime + " -> " + (spinTime-0.5)
            + ")<br>Costs: " + costsReduceTime
        text.innerHTML = "Spintime was reduced. New spin time: " + spinTime + " seconds<br>Streak was on: " + countStreak
            + "<br>Money: " + money.toLocaleString('de-DE')
        checkButtons()
    }
}

function upgradeMoney() {
    if (money >= costsUpgradeMoney) {
        money -= costsUpgradeMoney
        countSpentMoney += costsUpgradeMoney
        currentMoneyValue *= 2
        costsUpgradeMoney *= 2
        document.getElementById("btnUpgradeMoney").innerHTML = "Upgrade money value<br>(" + currentMoneyValue.toLocaleString('de-DE') + " -> " + (currentMoneyValue*2).toLocaleString('de-DE')
            + ")<br>Costs: " + costsUpgradeMoney.toLocaleString('de-DE')
        text.innerHTML = "Money value was upgraded. New base value: " + currentMoneyValue.toLocaleString('de-DE') + "<br>Streak was on: " + countStreak
            + "<br>Money: " + money.toLocaleString('de-DE')
        checkButtons()
    }    
}

function addNewMembers() {
    if (money >= costsAddMembers) {
        if (possibleMembers.filter(member => member.gender === wishedGender).length >= 100) {
            addMembers(5, wishedGender)
            countWishedGender += 5
            money -= costsAddMembers
            countSpentMoney += costsAddMembers
            costsAddMembers = Math.ceil((costsAddMembers*1.5) / 50) * 50
            
            document.getElementById("btnAddMembers").innerHTML = "Add new members (" + countWishedGender + " -> " + (countWishedGender+5)
            + ")<br>Costs: " + costsAddMembers.toLocaleString('de-DE')
            text.innerHTML = "New members were added<br>Streak was on: " + countStreak + "<br>Money: " + money.toLocaleString('de-DE')
            setChanceText()
            checkButtons()
        }
    }
}

function removeMembers() {
    if (money >= costsRemoveMembers) {
        let membersToDelete = choosenMembers.filter(member => member.gender === otherGender && member.usable === true)
        if (membersToDelete.length >= 55) {
            money -= costsRemoveMembers
            countSpentMoney += costsRemoveMembers
            costsRemoveMembers = Math.ceil((costsRemoveMembers*1.5) / 50) * 50

            for (let i = 0; i < 5; i++) {
                let genderMembers = choosenMembers.filter(member => member.gender === otherGender && member.usable === true)
                let randomNewNumber = Math.floor(Math.random() * genderMembers.length)
                let randomMember = genderMembers[randomNewNumber]
                randomMember.usable = false
            }

            countOtherGender -= 5

            document.getElementById("btnRemoveMembers").innerHTML = "Remove other members (" + countOtherGender + " -> " + (countOtherGender-5)
            + ")<br>Costs: " + costsRemoveMembers.toLocaleString('de-DE')
            text.innerHTML = "Members were removed<br>Streak was on: " + countStreak + "<br>Money: " + money.toLocaleString('de-DE')
            setChanceText()
            checkButtons()
        }
    }
}

function finishGame() {
    text.innerHTML = "You won!<br><br>"
    // Anzahl spins zählen und am Ende anzeigen
    text.innerHTML += "Spins: " + countSpins + ", hits: " + countHits + ", misses: " + countMisses + "<br>"
    // earned money und wie viel insgesamt ausgegeben wurde
    text.innerHTML += "You earned " + countEarnedMoney.toLocaleString('de-DE') + " and spent " + countSpentMoney.toLocaleString('de-DE') + " of it<br>"
    // letzen money value ausgeben
    text.innerHTML += "The money value was " + currentMoneyValue + " at the end.<br>"
    // den höchsten Streak count anzeigen am Ende, der es dann vorher aber noch nicht zum win geschafft hat
    text.innerHTML += "The highest streak before winning was: " + countHighestStreakBeforeWin + "<br>"
    // Highestmisstreak
    text.innerHTML += "The highest failing streak was: " + countHighestMissStreak + " with " + probabilityHighestMissStreak + "% chance getting that<br>"
    // Wahrscheinlichkeit mit den settings (Chance zu hitten hoch 10) 10er Streak zu schaffen
    text.innerHTML += "Probability to win now was: " + (Math.pow((choosenMembers.filter(member => member.gender === wishedGender && member.usable).length / choosenMembers.filter(member => member.usable === true).length), 10)*100).toFixed(4) + "%<br>"
    // Most played idol
    const membersWishedGender = choosenMembers.filter(member => member.gender == wishedGender)
    const membersOtherGender = choosenMembers.filter(member => member.gender == otherGender)
    const maxSpinWished = Math.max(...membersWishedGender.map(member => member.timesSpinned))
    const maxSpinOther = Math.max(...membersOtherGender.map(member => member.timesSpinned))
    const mostSpinnedIdolsWished = membersWishedGender.filter(member => member.timesSpinned === maxSpinWished)
    const mostSpinnedIdolsOther = membersOtherGender.filter(member => member.timesSpinned === maxSpinOther)
    text.innerHTML += "Most spinned good idol(s): " + mostSpinnedIdolsWished.map(member => member.name[0]
        + " (" + allGroups[Math.abs(member.group[0])].name[0] + ")").join(", ")
        + " for " + maxSpinWished + " times<br>"
    text.innerHTML += "Most spinned bad idol(s): " + mostSpinnedIdolsOther.map(member => member.name[0]
        + " (" + allGroups[Math.abs(member.group[0])].name[0] + ")").join(", ")
        + " for " + maxSpinOther + " times<br>"
    // Zeit, wie lange gebraucht wurde
    endTime = new Date()
    const diffSec = Math.floor((endTime - startTime) / 1000)
    let minutes = Math.floor(diffSec/60)
    const hours = Math.floor(minutes/60)
    const seconds = diffSec % 60

    text.innerHTML += "Time needed: " 
    if (hours > 0) {
        text.innerHTML += hours.toString().padStart(2, "0") + ":"
        minutes -= (hours*60)
    }
    text.innerHTML += minutes.toString().padStart(2, "0") + ":" + seconds.toString().padStart(2, "0") + "<br><br>"

    text.innerHTML += "Select the gender you want to hit and press start"

    console.log(text.innerHTML)

    document.getElementById("startButton").style = "display: block"
    document.getElementById("form").style = "display: block"
    document.getElementById("spinButton").style = "display: none"
    document.getElementById("btnReduceSpinTime").style = "display: none"
    document.getElementById("btnUpgradeMoney").style = "display: none"
    document.getElementById("btnAddMembers").style = "display: none"
    document.getElementById("btnRemoveMembers").style = "display: none"

    isRunning = false
}

console.log(lastSave)
if (lastSave != null) {
    
}

// vllt die Sachen speichern, damit man dann ein eigenes Leaderboard haben kann

// vllt generell die letzten immer wieder anzeigen -> könnte nur dann maybe scheiße aussehen aufm Handy

