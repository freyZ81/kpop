const questionSelect = document.getElementById("filter-question")
const idolSelect = document.getElementById("filter-idol")
const answerText = document.getElementById("answerText")

let choosenS
let fileSet



const questionAnswers = [
    {
        value: 1,
        question: "Ist die S-Nummer gerade?",
        idols: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24],
        asked: false
    },
    {
        value: 2,
        question: "Ist die S-Nummer ungerade?",
        idols: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23],
        asked: false
    },
    {
        value: 3,
        question: "Ist das idol in moon?",
        idols: [20, 22, 9, 17, 14, 24],
        asked: false
    },
    {
        value: 4,
        question: "Ist das idol in sun?",
        idols: [5, 15, 2, 4, 16, 21],
        asked: false
    },
    {
        value: 5,
        question: "Ist das idol in neptun?",
        idols: [1, 11, 13, 23, 10, 7],
        asked: false
    },
    {
        value: 6,
        question: "Ist das idol in zenith?",
        idols: [3, 6, 12, 18, 8, 19],
        asked: false
    },
    {
        value: 99,
        question: "Ist das gesuchte Idol: ",
        idols: [],
        asked: false
    },
]
const allIdols = [
    {
        number: 1,
        idol: "Seoyeon",
        available: true
    },
    {
        number: 2,
        idol: "Hyerin",
        available: true
    },
    {
        number: 3,
        idol: "Jiwoo",
        available: true
    },
    {
        number: 4,
        idol: "Chaeyeon",
        available: true
    },
    {
        number: 5,
        idol: "Yooyeon",
        available: true
    },
    {
        number: 6,
        idol: "Soomin",
        available: true
    },
    {
        number: 7,
        idol: "Nakyoung",
        available: true
    },
    {
        number: 8,
        idol: "Yubin",
        available: true
    },
    {
        number: 9,
        idol: "Kaede",
        available: true
    },
    {
        number: 10,
        idol: "Dahyun",
        available: true
    },
    {
        number: 11,
        idol: "Kotone",
        available: true
    },
    {
        number: 12,
        idol: "Yeonji",
        available: true
    },
    {
        number: 13,
        idol: "Nien",
        available: true
    },
    {
        number: 14,
        idol: "Sohyun",
        available: true
    },
    {
        number: 15,
        idol: "Xinyu",
        available: true
    },
    {
        number: 16,
        idol: "Mayu",
        available: true
    },
    {
        number: 17,
        idol: "Lynn",
        available: true
    },
    {
        number: 18,
        idol: "Joobin",
        available: true
    },
    {
        number: 19,
        idol: "Hayeon",
        available: true
    },
    {
        number: 20,
        idol: "Shion",
        available: true
    },
    {
        number: 21,
        idol: "Chaewon",
        available: true
    },
    {
        number: 22,
        idol: "Sullin",
        available: true
    },
    {
        number: 23,
        idol: "Seoah",
        available: true
    },
    {
        number: 24,
        idol: "Jiyeon",
        available: true
    }
]

function startGame() {
    document.getElementById("divPictureSet").style = "display: none"
    document.getElementById("divGame").style = "display: block"
    document.getElementById("divQuestion").style = "display: block"

    choosenS = Math.floor(Math.random() * 24 + 1)
    console.log(choosenS)

    let set = document.getElementById("filter-pictureSet").value

    fileSet = "pics/" + set + "/"

    document.getElementById("s1").src = fileSet + "seoyeon.jpg"
    document.getElementById("s2").src = fileSet + "hyerin.jpg"
    document.getElementById("s3").src = fileSet + "jiwoo.jpg"
    document.getElementById("s4").src = fileSet + "chaeyeon.jpg"

    document.getElementById("s5").src = fileSet + "yooyeon.jpg"
    document.getElementById("s6").src = fileSet + "soomin.jpg"
    document.getElementById("s7").src = fileSet + "nakyoung.jpg"
    document.getElementById("s8").src = fileSet + "yubin.jpg"

    document.getElementById("s9").src = fileSet + "kaede.jpg"
    document.getElementById("s10").src = fileSet + "dahyun.jpg"
    document.getElementById("s11").src = fileSet + "kotone.jpg"
    document.getElementById("s12").src = fileSet + "yeonji.jpg"

    document.getElementById("s13").src = fileSet + "nien.jpg"
    document.getElementById("s14").src = fileSet + "sohyun.jpg"
    document.getElementById("s15").src = fileSet + "xinyu.jpg"
    document.getElementById("s16").src = fileSet + "mayu.jpg"

    document.getElementById("s17").src = fileSet + "lynn.jpg"
    document.getElementById("s18").src = fileSet + "joobin.jpg"
    document.getElementById("s19").src = fileSet + "hayeon.jpg"
    document.getElementById("s20").src = fileSet + "shion.jpg"

    document.getElementById("s21").src = fileSet + "chaewon.jpg"
    document.getElementById("s22").src = fileSet + "sullin.jpg"
    document.getElementById("s23").src = fileSet + "seoah.jpg"
    document.getElementById("s24").src = fileSet + "jiyeon.jpg"

    allIdols.forEach(obj => { //sollte alle beim Neustart wieder neu setzen
        //TODO: evtl muss das graue noch geupdatet werden dann
        obj.available = true

        const image = document.getElementById(`s${obj.number}`);
        image.classList.remove("not-available");
    })
    document.getElementById("answerText").innerHTML = ""

    questionAnswers.forEach(ques => {
        ques.asked = false
    })
    fillQuestionSelect()

}

questionSelect.addEventListener("change", () => { //TODO: darf nicht nur on change sein, wenn nur noch die Frage sein sollte...
    const selectedValue = Number(questionSelect.value)
    const selectedQuestion = questionAnswers.find(
        questionObject => questionObject.value === selectedValue
    )
    if (selectedValue == 99) {
        document.getElementById("divIdolSelect").style = "display: block"
        idolSelect.innerHTML = ""

        allIdols
            .filter(questionObject => questionObject.available === true)
            .forEach(questionObject => {
                const option = document.createElement("option");

                option.value = questionObject.number;
                option.textContent = questionObject.idol;

                idolSelect.appendChild(option);
            });
    }
});

function fillQuestionSelect() {
    questionSelect.innerHTML = ""
    questionAnswers
        .filter(questionObject => questionObject.asked === false)
        .forEach(questionObject => {
            const option = document.createElement("option");

            option.value = questionObject.value;
            option.textContent = questionObject.question;

            questionSelect.appendChild(option);
        });

    document.getElementById("divIdolSelect").style = "display: none"

    if (questionSelect.options.length === 1) {
        questionSelect.selectedIndex = 0;
        document.getElementById("divIdolSelect").style = "display: block"
        idolSelect.innerHTML = ""

        allIdols
            .filter(questionObject => questionObject.available === true)
            .forEach(questionObject => {
                const option = document.createElement("option");

                option.value = questionObject.number;
                option.textContent = questionObject.idol;

                idolSelect.appendChild(option);
            });
    }
}

function answerQuestion() {
    //vllt prüfen, ob vorher alle schon weggemacht wurden

    //wenn Button gedrückt, dann Frage herausfinden
    const selectedValue = Number(questionSelect.value)
    const selectedIdol = Number(idolSelect.value)

    //gucken, ob das idol bei der Frage mit dabei ist
    const selectedQuestion = questionAnswers.find(
        questionObject => questionObject.value === selectedValue
    )
    if (selectedValue == 99) {
        selectedQuestion.idols = [selectedIdol]
    }

    answerText.innerHTML = "Frage: " + selectedQuestion.question

    if (selectedValue != 99) {
        selectedQuestion.asked = true
    } else {
        answerText.innerHTML += allIdols[selectedIdol - 1].idol
    }

    //TODO: noch die sich gegenseitig ausschließenden Frage entfernen

    if (selectedQuestion?.idols.includes(choosenS)) {
        console.log("Member ist dabei!")
        answerText.innerHTML += "<br>" + "Antwort: <strong>Ja!</strong>"
        //alle anderen auf available = false setzen
        allIdols.forEach(idolObject => {
            if (!selectedQuestion.idols.includes(idolObject.number)) {
                idolObject.available = false
            }
        })
        if (selectedValue == 99) {
            document.getElementById("divPictureSet").style = "display: block"
            document.getElementById("divQuestion").style = "display: none"        
        }
    } else {
        console.log("Member ist nicht dabei!")
        answerText.innerHTML += "<br>" + "Antwort: <strong>Nein!</strong>"
        //alle auf available = false setzen
        allIdols.forEach(idolObject => {
            if (selectedQuestion.idols.includes(idolObject.number)) {
                idolObject.available = false
            }
        })
    }

    //Bilder vllt markieren, die noch nicht weg sind?
    updateIdolImages()
    //Frage entfernen
    fillQuestionSelect()
}

function updateIdolImages() {
    allIdols.forEach(idolObject => {
        const image = document.getElementById(`s${idolObject.number}`);

        if (!image) {
            return;
        }

        if (!idolObject.available) {
            image.classList.add("not-available");
            image.classList.add("idol-image");

            image.addEventListener("click", () => {
                // Nur reagieren, wenn das Idol nicht verfügbar ist
                if (idolObject.available) {
                    return;
                }

                // Mehrfachklick während der Animation verhindern
                if (image.classList.contains("flipping")) {
                    return;
                }

                image.classList.add("flipping");

                // Nach der Hälfte der Animation das Bild wechseln
                setTimeout(() => {
                    image.src = fileSet + "triplesLogo.jpg";
                }, 350);
                // Drehung wieder auf 0 Grad zurücksetzen
                setTimeout(() => {
                    image.classList.remove("flipping");
                }, 600);
            }, { once: true });
        }
    });
}



fillQuestionSelect()