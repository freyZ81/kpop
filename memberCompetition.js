// Werte aus dem Local Storage abrufen und verwenden
allGroups = JSON.parse(localStorage.getItem('groupsArray'));
allMembers = JSON.parse(localStorage.getItem('membersArray'));
let choosenMemberList = []
let memberOne = document.getElementById("memberOne")
let memberTwo = document.getElementById("memberTwo")

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
    setNewMembers(choosenMemberList)
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
    let numberMemberTwo = Math.floor(Math.random() * choosenMemberList.length);
    numberMemberTwo = numberMemberTwo != numberMemberOne ? numberMemberTwo :
    numberMemberOne != 0 ? (numberMemberTwo - 1) : (numberMemberTwo + 1);
    memberOne.alt = getMemberStr(numberMemberOne)
    memberOne.src = memberOne.alt
    memberTwo.alt = getMemberStr(numberMemberTwo)
    memberTwo.src = memberTwo.alt
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

    return strMember.toLowerCase()
}

function chooseMemberOne() {
    console.log("Member One was choosen")
    if (choosenMemberList.length > 1) {
        setNewMembers(choosenMemberList)
    }
}

function chooseMemberTwo() {
    console.log("Member Two was choosen")

    if (choosenMemberList.length > 1) {
        setNewMembers(choosenMemberList)
    }
}
