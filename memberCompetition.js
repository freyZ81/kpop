// Werte aus dem Local Storage abrufen und verwenden
allGroups = JSON.parse(localStorage.getItem('groupsArray'));
allMembers = JSON.parse(localStorage.getItem('membersArray'));
let choosenMemberList = []
let newRoundMembers = []
let memberOne = document.getElementById("memberOne")
let memberTwo = document.getElementById("memberTwo")
let memberOneTxt = document.getElementById("memberOneTxt")
let memberTwoTxt = document.getElementById("memberTwoTxt")
let memberOneObj
let memberTwoObj
let memberleftText = document.getElementById("memberleftText")

newRound()

function newRound() {
    console.log("New round was clicked")
    let genderDropdown = document.getElementById("genderChoose")
    let selectedGender = genderDropdown.value
    //get new list
    
    choosenMemberList = []
    if (genderDropdown.value == "girlsAndBoys") {
        choosenMemberList = allMembers;
        console.log("Both gender")
    } else if (genderDropdown.value == "girls") {
        choosenMemberList = getChoosenMembers(1)
    } else if (genderDropdown.value == "boys") {
        choosenMemberList = getChoosenMembers(2)
    }
    console.log("Choosen value: " + selectedGender)
    choosenMemberList = reduceMembers(choosenMemberList)
    setNewMembers(choosenMemberList)
}

function reduceMembers(choosenMemberList) {
    let countDropdown = document.getElementById("countMaxSize");
    while (choosenMemberList.length > countDropdown.value) {
        let randomNumber = Math.floor(Math.random() * choosenMemberList.length);
        choosenMemberList.splice(randomNumber, 1);
    }

    console.log(choosenMemberList.length, countDropdown.value)
    return choosenMemberList
}

function getChoosenMembers(genderValue) {
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

function setNewMembers(choosenMemberList) {
    let numberMemberOne = Math.floor(Math.random() * choosenMemberList.length);
    memberOneObj = choosenMemberList[numberMemberOne]
    memberOne.alt = getMemberStr(numberMemberOne)
    memberOne.src = memberOne.alt
    if (memberOneObj.group == 0) {
        memberOneTxt.innerHTML = memberOneObj.name[0]    
    } else if (memberOneObj.group > 0) {
        memberOneTxt.innerHTML = memberOneObj.name[0] + " from " + allGroups[memberOneObj.group].name[0]
    } else if (memberOneObj.group < 0) {
        memberOneTxt.innerHTML = memberOneObj.name[0] + " who was in " + allGroups[memberOneObj.group*-1].name[0]
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
        memberTwoTxt.innerHTML = memberTwoObj.name[0] + " who was in " + allGroups[memberTwoObj.group[0]*(-1)].name[0]
    }

    //numberMemberTwo = numberMemberTwo != numberMemberOne ? numberMemberTwo :
    //numberMemberOne != 0 ? (numberMemberTwo - 1) : (numberMemberTwo + 1);
    setLeftMemberText()
}

function setLeftMemberText() {
    memberleftText.innerHTML = choosenMemberList.length
}

function getMemberStr(numberOfMember) {
    let strMember = "pics/"
    
    let member
    member = choosenMemberList[numberOfMember]

    if (allGroups[choosenMemberList[numberOfMember].group[0]] != 0) {
        //Gruppe
        let groupStr
        let group
        if (member.group > 0) {
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
    choosenMemberList.splice(numberOfMember, 1)
    return strMember.toLowerCase()
}

function resetLists() {
    choosenMemberList = newRoundMembers
    newRoundMembers = []
}

function chooseMemberOne() {
    newRoundMembers.push(memberOneObj)
    if (choosenMemberList.length == 0) {
        resetLists()   
    }
    console.log(choosenMemberList.length)
    if (choosenMemberList.length > 1) {
        setNewMembers(choosenMemberList)
    } else {
        console.log("Ende " + memberOneObj.name)
    }
}

function chooseMemberTwo() {
    newRoundMembers.push(memberTwoObj)
    if (choosenMemberList.length == 0) {
        resetLists()   
    }
    console.log(choosenMemberList.length)
    if (choosenMemberList.length > 1) {
        setNewMembers(choosenMemberList)
    } else {
        console.log("Ende " + memberTwoObj.name)
    }
}
