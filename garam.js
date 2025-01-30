function getSortedCards(text) {
    //let text = document.getElementById("invCards").value.toString()
    //console.log(text)

    // Namen (Wörter vor einem Emoji)
    const names = [...text.matchAll(/\b\w+(?= :)/g)].map(match => match[0]);

    // Zahlen (ganze Zahlen)
    const numbers = [...text.matchAll(/ \b\d+\b/g)].map(match => parseInt(match[0]));

    // Codes (z. B. IKR1.0db5)
    const codes = [...text.matchAll(/\b[A-Z]+\d\.[a-z0-9]+\b/g)].map(match => match[0]);

    // Gruppencodes (flexibel nach dem 💎)
    const erasFound = [...text.matchAll(/💎(?:\s+[A-Za-z0-9]+)?\s+([A-Z]+)/g)].map(match => match[1]);
    //hier vllt gucken, ob der Dia oder :gem: da ist

    //console.log(text)
    //console.log(names)
    //console.log(numbers)
    //console.log(codes)
    //console.log(erasFound)
    
    // Zusammenstellen als Objekte
    const result = [];
    for (let i = 0; i < names.length; i++) {
        //hier vllt noch überpfrüfen wg doppelten Einträgen!?
        result.push({
            name: names[i],
            number: numbers[i],
            eraOfCard: erasFound[i],
            code: codes[i]
        });
    }
    //console.log(result)


    let endText = ""
    for (let card = 0; card < result.length; card++) {
        //console.log(result[card])
        endText += result[card].code + " "
    }
    //console.log(endText)

    sortCardsByNumber(result)

    //console.log("Ergebnisse nach sort:", result);

    
    return result
}

function sortCardsByNumber(cardsToSort) {
    cardsToSort.sort(function(a, b) {
        if (a.number < b.number) {
            return -1;
        }
        if (a.number > b.number) {
            return 1;
        }
    });
    return cardsToSort
}

function getCardCodeToChange() {
    //cardsInv,cardsLocker, allEras

    let cardsInv = document.getElementById("inputInvCards").value //"J :lightstick_itzy: 933 💎💎 STAYC P 💟 SPOJ2.ea03 J :lightstick_itzy: 791 💎💎 STAYC STAYC 💟 SSTJ2.c1db J :lightstick_itzy: 832 💎💎 STAYC T 💟 STFJ2.136c J :lightstick_itzy: 1469 💎💎 STAYC Y 💟 STJ2.87b1 J :lightstick_itzy: 202 💎💎 STAYC D 💟 SDOJ2.bec7"
    let cardsLocker = document.getElementById("inputLockedCards").value //"J :lightstick_itzy: 136 💎💎 STAYC M 💟 SMEJ2.efbb" 
    let erasAsText = document.getElementById("inputAllEras").value //"L, MW, M, P, ST, S, STAYC, T, Y, D";


    //console.log(cardsInv)
    //console.log(cardsLocker)


    //console.log("Inv")
    let inv = getSortedCards(cardsInv)
    //console.log("Locker")
    let locker = getSortedCards(cardsLocker)

    let cardsToLock = ""
    let cardsToUnlock = ""
    
    // Text in einzelne Elemente aufteilen und in Objekte umwandeln
    let allEras = erasAsText.split(", ").map(entry => ({ eraLetters: entry }));

    //console.log(allEras);


    for (let era = 0; era < allEras.length; era++) {
        let invByEra = getCardsOfEra(inv, allEras[era].eraLetters)
        let lockerByEra = getCardsOfEra(locker, allEras[era].eraLetters)

        //console.log(invByEra)
        //console.log(lockerByEra)

        invByEra = sortCardsByNumber(invByEra)
        lockerByEra = sortCardsByNumber(lockerByEra)

        //console.log(allEras[era].eraLetters)
        //console.log(invByEra)
        //console.log(lockerByEra)

        //hier vllt noch die Objekte aus den Listen entfernen und der anderen hinzufügen
        if (invByEra[0] != null) {
            if (lockerByEra[0] == null && invByEra[0] != null) {
                //console.log(invByEra[0].code)
                cardsToLock += invByEra[0].code + " "
            } else if (invByEra[0].number < lockerByEra[0].number) {
                cardsToLock += invByEra[0].code + " "
                cardsToUnlock += lockerByEra[0].code + " "
                //console.log(invByEra[0].code, invByEra[0].number, lockerByEra[0].code, lockerByEra[0].number)
            }
        }
        
        if (lockerByEra.length > 1) {

            for (let lockedCards = 1; lockedCards < lockerByEra.length; lockedCards++) {
                cardsToUnlock += lockerByEra[lockedCards].code + " "
            }
        }
    }

    let finalText = "Cards to lock: " + cardsToLock + "<br>Cards to unlock: " + cardsToUnlock

    //console.log("Cards to lock:", cardsToLock)
    //console.log("Cards to unlock:", cardsToUnlock)

    document.getElementById("resultText").innerHTML = finalText
}

function getCardsOfEra(cards, eraToGet) {
    //console.log(cards, eraToGet)
    let cardsOfEra = []
    for (let i = 0; i < cards.length; i++) {
        if (cards[i].eraOfCard == eraToGet) {
            cardsOfEra.push(cards[i])
        }
    }
    //console.log(cardsOfEra)
    return cardsOfEra
}



/*
normales inv:
Xiaoting :lightstick_itzy: 9081 💎 Kep1er FI 💟 KX1.7ed9 Xiaoting :lightstick_itzy: 9714 💎 Kep1er FI 💟 KX1.03b2 Xiaoting :lightstick_itzy: 405 💎 Kep1er SR 💟 KSR1.febb Xiaoting :lightstick_itzy: 368 💎 Kep1er SR 💟 KSR1.11e9 Xiaoting :lightstick_itzy: 416 💎 Kep1er SR 💟 KSR1.e979

normaler locker:
Xiaoting :lightstick_itzy: 292 💎 Kep1er FI 💟 KX1.063c Xiaoting :lightstick_itzy: 11 💎 Kep1er SR 💟 KSR1.55d1

fake locker mit 2 Karten der gleichen era:
Xiaoting :lightstick_itzy: 292 💎 Kep1er FI 💟 KX1.063c Xiaoting :lightstick_itzy: 416 💎 Kep1er SR 💟 KSR1.e979 Xiaoting :lightstick_itzy: 11 💎 Kep1er SR 💟 KSR1.55d1
fake inv dazu:
Xiaoting :lightstick_itzy: 9081 💎 Kep1er FI 💟 KX1.7ed9 Xiaoting :lightstick_itzy: 9714 💎 Kep1er FI 💟 KX1.03b2 Xiaoting :lightstick_itzy: 405 💎 Kep1er SR 💟 KSR1.febb Xiaoting :lightstick_itzy: 368 💎 Kep1er SR 💟 KSR1.11e9
*/