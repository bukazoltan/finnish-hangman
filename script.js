import { finnishAlphabet, findKeyCode } from './config/finnishAlphabet.js'
const testWord = "keskustella";
const testWordArray = testWord.split("");
const guessedWord = document.querySelector('.guessed-word');
const usedLetters = document.querySelector('.used-letters');
let guessedLetters = [];

function prepareWord(word) {
    for (let index = 0; index < word.length; index++) {
        let letterPlaceholder = document.createElement("div");
        letterPlaceholder.classList.add('letter')
        letterPlaceholder.id = `letter-${index}`;
        guessedWord.appendChild(letterPlaceholder);
    }
}

function checkLetter(wordArray, keypress) {
    let positions = [];
    for (let index = 0; index < wordArray.length; index++) {
        if (testWordArray[index] === keypress) {
            positions.push(index);
        }
    }
    return {
        "letter": keypress,
        "positions": positions
    };
}


prepareWord(testWord);

document.addEventListener('keypress', (e) => {
    let pressedKey = findKeyCode(finnishAlphabet, e.keyCode);
    let letterInfo = checkLetter(testWordArray, pressedKey);
    if (letterInfo.positions.length > 0 && !guessedLetters.includes(letterInfo.letter)) {
        for (let index = 0; index < letterInfo.positions.length; index++) {
            let position = letterInfo.positions[index];
            let letterToUpdate = document.getElementById(`letter-${position}`);
            console.log(letterToUpdate);
            letterToUpdate.textContent = letterInfo.letter;
        }
    }
    if (!guessedLetters.includes(letterInfo.letter)) {
        guessedLetters.push(letterInfo.letter);
        usedLetters.textContent = guessedLetters;
        console.log(guessedLetters);
    }
});