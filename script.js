const input = document.getElementById('input')
const deletebtn = document.getElementById('backspace')
const enterbtn = document.getElementById('enter')
const content = document.querySelector(".content")
const endScreen = document.getElementById("end")
const endTitle = document.getElementById("end-title")
const wordTitle = document.getElementById("word")

const letter = [
    "a",
    "b",
    "c",
    "d",
    "e"
]
/*bugs
input can receive everything, must limit to letters

*/
let trys = 0;
let characters = 0;
let letters = []
let correct = []
let greenCounter = 0;
let correctsquare
let e
let word;
let JsonString = "";
let wordlist;
input.addEventListener('input', update);

fetch("./wordlist.json")
.then(response => {
   return response.json();
})
.then(data => JSON.stringify(data))
.then(data => data.split(','))
.then(data => GetWordList(data));

function GetWordList(data) {
    data.pop();
    data.splice(0, 1);
    data.push('ABUSE');
    wordlist = data[Math.floor(Math.random() * data.length)];
    word = wordlist.split('')
}

function update(e) {
    input.onkeydown = function() {
        let key = event.keyCode || event.charCode;
        if(key == 8) {
         if (characters == 0) {
             return
         } else {
            //console.log(characters);
            box = document.getElementById(letter[trys] + characters.toString())
            characters--
            letters.splice(-1);
            box.innerHTML = "";
         }
        }
        if (key == 13) {
            if (characters == 5) {
                console.log("Submitted!")
            //code for checking word

            let correctIndex = 1;
            //for yellow
            for (let i = 0; i < 5; i++) {
                if (word.includes(letters[i])) {
                    correctsquare = document.getElementById(letter[trys] + correctIndex)
                    correctsquare.style.border = "2px solid #DBA800";
                    correctsquare.style.backgroundColor = "yellow";
                    correctsquare.style.color = "white";
                    for (const btn of document.querySelectorAll(".character-btn")) {
                        if (btn.textContent.includes(letters[i])) {
                            btn.style.backgroundColor = "yellow";
                            btn.style.color = "white";
                        }
                    }
                } else {
                    correctsquare = document.getElementById(letter[trys] + correctIndex)
                    correctsquare.style.border = "2px solid grey";
                    correctsquare.style.backgroundColor = "darkgrey";
                    correctsquare.style.color = "white";
                    for (const btn of document.querySelectorAll(".character-btn")) {
                        if (btn.textContent.includes(letters[i])) {
                            btn.style.backgroundColor = "darkgrey";
                            btn.style.color = "white";
                        }
                    }
                }
                correctIndex++
              }
            
              //for green
            correctIndex = 1;
            for (let i = 0; i < 5; i++) {
                if (letters[i] == word[i]) {
                    correctsquare = document.getElementById(letter[trys] + correctIndex)
                    correctsquare.style.border = "2px solid green";
                    correctsquare.style.backgroundColor = "lime";
                    correctsquare.style.color = "white";
                    greenCounter++
                    for (const btn of document.querySelectorAll(".character-btn")) {
                        if (btn.textContent.includes(letters[i])) {
                            btn.style.backgroundColor = "lime";
                            btn.style.color = "white";
                        }
                    }
                }
                correctIndex++
            }

            setTimeout(() => {
                if (greenCounter == 5) {
                    content.style.display = "none";
                    endScreen.style.display = "flex";
                    trys++
                    if (trys == 1) {
                        wordTitle.innerHTML = `You Did It In ${trys} Attempt!`
                    } else {
                        wordTitle.innerHTML = `You Did It In ${trys} Attempts!`
                    }
                    endTitle.innerHTML = "You Win!"
                }
            }, 200)
            //console.log(greenCounter);
            

            //reset for next row
            setTimeout(() => {
                if (trys == 4) {
                    content.style.display = "none";
                    endScreen.style.display = "flex";
                    endTitle.innerHTML = "You Lose!"
                    wordTitle.innerHTML = "The Correct Word Was " + word.join("");
                } else {
                    trys++  
                    characters = 0;
                    letters = [];
                    greenCounter = 0;
                }
            }, 200)
            
            } else {
                console.log("not filled out!")
            }
        }
        };
        if (characters == 5) {
            console.log("no more")
        } else {
            if (e.target.value == " ") {
                console.log("cannot use space")
            } else {
             characters++
             letters.push(e.target.value.toUpperCase())
            }
        }
        input.value = "";
        let box = document.getElementById(letter[trys] + characters.toString())
        box.innerHTML = letters[characters - 1].toUpperCase();
    //console.log(letters);
}


//for letter btns at the bottom
function btnval(v) {
    let btnvalue = v
    if (characters == 5) {
        console.log("no more")
    } else {
         characters++
         letters.push(btnvalue)  
         console.log(letters);
        }
    input.value = "";
    let box = document.getElementById(letter[trys] + characters.toString())
    box.innerHTML = letters[characters - 1].toUpperCase();
    update(e)
}

//restart game

function Restart() {
    window.location.reload();
}