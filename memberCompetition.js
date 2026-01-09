// Werte aus dem Local Storage abrufen und verwenden
allGroups = JSON.parse(localStorage.getItem('groupsArray'));
allMembers = JSON.parse(localStorage.getItem('membersArray'));
let choosenMemberList = []
let newRoundMembers = []
let tournament = []
let memberOne = document.getElementById("memberOne")
let memberTwo = document.getElementById("memberTwo")
let memberOneTxt = document.getElementById("memberOneTxt")
let memberTwoTxt = document.getElementById("memberTwoTxt")
const table = document.getElementById("table")
const bracket = document.getElementById('bracket');
let memberOneObj
let memberTwoObj
let currentRound = 1

newRound()


function newRound() {
    console.log("New round was clicked")
    let genderDropdown = document.getElementById("genderChoose")
    let selectedGender = genderDropdown.value
    choosenMemberList = []
    currentRound = 1
    tournament = []
    
    if (genderDropdown.value == "girlsAndBoys") {
        choosenMemberList = allMembers;
        console.log("Both gender")
    } else if (genderDropdown.value == "girls") {
        choosenMemberList = allMembers.filter(member => member.gender == 1)
    } else if (genderDropdown.value == "boys") {
        choosenMemberList = allMembers.filter(member => member.gender == 2)
    }
    console.log("Choosen value: " + selectedGender)
    choosenMemberList = reduceMembers(choosenMemberList)
    table.style = "display: block"
    bracket.innerHTML = ""
    setNewMembers(choosenMemberList)
}

function reduceMembers(choosenMemberList) {
    //werden hier aus allen möglichen membern so viele rausgeschmissen bis die gewünschte Anzahl erreicht ist?
    let countDropdown = document.getElementById("countMaxSize");
    while (choosenMemberList.length > countDropdown.value) {
        let randomNumber = Math.floor(Math.random() * choosenMemberList.length);
        choosenMemberList.splice(randomNumber, 1);
    }

    console.log(choosenMemberList.length, countDropdown.value)
    return choosenMemberList
}

function setNewMembers(choosenMemberList) {

    function getMemberStr(numberOfMember) {
        let strMember = "pics/"
        
        let member
        member = choosenMemberList[numberOfMember]

        if (allGroups[choosenMemberList[numberOfMember].group[0]] != 0) {
            //Gruppe
            let groupStr
            let group
            if (member.group[0] > 0) {
                //active member
                group = allGroups[member.group[0]]
                groupStr = group.name[group.name.length - 1]
            } else {
                //Ex member
                group = allGroups[member.group[0] * -1]
                groupStr = group.name[group.name.length - 1]
            }

            strMember += groupStr + "/" + member.name[member.name.length - 1]

        } else {
            //Solo
            strMember += "solo/" + member.name[member.name.length - 1]
        }

        strMember += ".jpg"
        choosenMemberList.splice(numberOfMember, 1) //entfernt den member aus der Liste
        return strMember.toLowerCase()
    }

    let numberMemberOne = Math.floor(Math.random() * choosenMemberList.length);
    memberOneObj = choosenMemberList[numberMemberOne]
    memberOne.alt = getMemberStr(numberMemberOne)
    memberOne.src = memberOne.alt
    if (memberOneObj.group == 0) {
        memberOneTxt.innerHTML = memberOneObj.name[0]    
    } else if (memberOneObj.group > 0) {
        memberOneTxt.innerHTML = memberOneObj.name[0] + " from " + allGroups[memberOneObj.group].name[0]
    } else if (memberOneObj.group < 0) {
        memberOneTxt.innerHTML = memberOneObj.name[0] + " former " + allGroups[memberOneObj.group*-1].name[0]
    }

    let numberMemberTwo = Math.floor(Math.random() * choosenMemberList.length);
    memberTwoObj = choosenMemberList[numberMemberTwo]
    memberTwo.alt = getMemberStr(numberMemberTwo)
    memberTwo.src = memberTwo.alt
    if (memberTwoObj.group[0] == 0) {
        memberTwoTxt.innerHTML = memberTwoObj.name[0]    
    } else if (memberTwoObj.group[0] > 0) {
        memberTwoTxt.innerHTML = memberTwoObj.name[0] + " from " + allGroups[memberTwoObj.group[0]].name[0]
    } else if (memberTwoObj.group[0] < 0) {
        memberTwoTxt.innerHTML = memberTwoObj.name[0] + " former " + allGroups[memberTwoObj.group[0]*(-1)].name[0]
    }

    //numberMemberTwo = numberMemberTwo != numberMemberOne ? numberMemberTwo :
    //numberMemberOne != 0 ? (numberMemberTwo - 1) : (numberMemberTwo + 1);
}

function resetLists() {
    choosenMemberList = newRoundMembers
    newRoundMembers = []
    currentRound++
}

function chooseMemberOne() {
    newRoundMembers.push(memberOneObj)
    addPlayersToBracket(memberOneObj.name[0], memberTwoObj.name[0], memberOneObj.name[0])
    if (choosenMemberList.length == 0) {
        resetLists()   
    }
    console.log(choosenMemberList.length)
    if (choosenMemberList.length > 1) {
        setNewMembers(choosenMemberList)
    } else {
        console.log("Ende " + memberOneObj.name[0])
        drawTournamentTree()
    }
}

function chooseMemberTwo() {
    newRoundMembers.push(memberTwoObj)
    addPlayersToBracket(memberOneObj.name[0], memberTwoObj.name[0], memberTwoObj.name[0])
    if (choosenMemberList.length == 0) {
        resetLists()   
    }
    console.log(choosenMemberList.length)
    if (choosenMemberList.length > 1) {
        setNewMembers(choosenMemberList)
    } else {
        console.log("Ende " + memberTwoObj.name[0])
        drawTournamentTree()
    }
}

function getChoosenMembers(genderValue) {
    // wird scheinbar nicht verwendet
    for (const member of allMembers) {
        if (member.gender == undefined) {
            console.log(member.name)
        }

        if (member.gender == genderValue) {
            console.log(member.gender, genderValue)
            choosenMemberList.push(member)
        }
    }
    //console.log(choosenMemberList)
    return choosenMemberList
}

function drawTournamentTree() {
    table.style = "display: none"
    tournament.forEach(stage => {
        const roundDiv = document.createElement("div");
        roundDiv.className = "round";

        const matches = stage.rankings;

        matches.forEach(match => {
            const matchDiv = document.createElement("div");
            matchDiv.className = "match";

            const p1 = document.createElement("div");
            p1.className = "player";
            p1.innerHTML = `<span>${match.player1}</span>`;

            const p2 = document.createElement("div");
            p2.className = "player";
            p2.innerHTML = `<span>${match.player2}</span>`;

            const p3 = document.createElement("div")
            p3.className = "winner"
            p3.innerHTML = `<strong>→ ${match.winner}</strong>`


            matchDiv.appendChild(p1);
            matchDiv.appendChild(p2);
            matchDiv.appendChild(p3);

            roundDiv.appendChild(matchDiv);
        });

        bracket.appendChild(roundDiv);
    });
}

function addPlayersToBracket(memberOne, memberTwo, winner) {
    // 1. Runde suchen
    let roundObj = tournament.find(r => r.round === currentRound);

    // 2. Falls nicht vorhanden → neu anlegen
    if (!roundObj) {
        roundObj = {
            round: currentRound,
            rankings: []
        };
        tournament.push(roundObj);
    }

    let matchObj = {
        player1: memberOne,
        player2: memberTwo,
        winner: winner
    }
    // 3. Match hinzufügen
    roundObj.rankings.push(matchObj);
}

//addPlayersToBracket("Yujin", "Isa", "Yujin")
//addPlayersToBracket("Harvey", "Yeji", "Yeji")
//currentRound = 2
//addPlayersToBracket("Yujin", "Yeji", "Yujin")


//drawTournamentTree()