// Création du jeu du pendu.


// ---- VARIABLES ----
const WordsToFind = ["epistemology", "direction", "object", "push", "pull", "prototype", "fetch", "database"];;
let theWord = "";
const elementWordToFind = document.getElementById("wordToFind");
const attempsNumber = 7; // A afficher
const keys = document.querySelectorAll(".key"); // permet de récupérer toutes les touches du jeu.
const startGameButton = document.getElementById("startGameButton");
let gameStarted = false;


// ---- FONCTIONS ----
// function startGame()
function startGame() {
    startGameButton.style.display = "none";
    theWord = WordsToFind[Math.floor(Math.random() * WordsToFind.length)];
    console.log(theWord);
    gameStarted = true;
    fractionTheWord();
}

// Function fractionner le mot en valeurs pour pouvoir les show + show le mot dans le HTML
function fractionTheWord(){
    elementWordToFind.textContent = "";
    for (letters in theWord){
        elementWordToFind.textContent += "*";
    }

}

// function readKey()
function readKey(key) {
    if (gameStarted){
        console.log(key);
        searchCorrespondanceBeweenKeyAndWord(key);
    }
}

// function searchCorrespondanceBeweenKeyAndWord()
function searchCorrespondanceBeweenKeyAndWord(key) {
    for (letters in theWord){
        if (theWord[letters] === key){
            console.log("déjà t'as trouvé une lettre mon grand");
            let newText = theWord.split(" ").pop(key);
            elementWordToFind.textContent = newText;
        }
    }
}


// function win()
// function lose()
// Afficher les lettres trouvées du mot dans le jeu après chaque tentative.
// Afficher "gagnant" ou "perdant" suivant le résultat ainsi qu'une musique appropriée.
// Option recommencer (fenêtre modale)


//---- Events ----
startGameButton.addEventListener("click", startGame);

for (buttons of keys){
    buttons.addEventListener("click", function(){
        readKey(this.textContent);
    });

}
// Option, afficher les lettres restantes en disabled les touches déjà préssées.
// Afficher l'avancement du pendu entre chaque tentative.