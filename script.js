// Création du jeu du pendu.


//! ---- VARIABLES ----
const WordsToFind = ["epistemology", "direction", "object", "push", "pull", "prototype", "fetch", "database", "display", "element", "console", "content", "style", "event", "index", "script", "practice", "modal", "learn", "teach", "code", "langage", "internet"];;
let theWord = "";
let hideWord;
const elementWordToFind = document.getElementById("wordToFind");
let attempsNumber = 7; // A afficher
const attempsElementDisplay = document.getElementById("attempts");
const keys = document.querySelectorAll(".key"); // permet de récupérer toutes les touches du jeu.
const startGameButton = document.getElementById("startGameButton");
let gameStarted = false;
const sprite = document.querySelector("#spritesheet");
let widthOfSpriteSheet = 108;
sprite.style.background = `url(./spritesheet.png) -0px 0px`;
sprite.style.height = '97px';
sprite.style.width = '108px';



//! ---- FONCTIONS ----
function startGame() {
    startGameButton.style.display = "none";
    theWord = WordsToFind[Math.floor(Math.random() * WordsToFind.length)];

    console.log(theWord);
    gameStarted = true;
    fractionTheWord();
}

function fractionTheWord(){
    hideWord = theWord.split(" ");
    for (letters in theWord){
        hideWord[letters] = "*";
    }
    elementWordToFind.textContent = hideWord.join("");
}

function readKey(key) {
    if (gameStarted && attempsNumber > 0){
        console.log(key);
        searchCorrespondanceBeweenKeyAndWord(key);
    }
    else if (attempsNumber <= 0)
    {
        console.log("Tu ne peux plus jouer");
    }
}


function animateScript(){
    
    sprite.style.backgroundPosition = `-${widthOfSpriteSheet}px 0px`;
    widthOfSpriteSheet += 108;
    console.log(sprite.style.backgroundPosition);
    
}

function searchCorrespondanceBeweenKeyAndWord(key) {
    let count = 0;
    for (letters in theWord){
        if (theWord[letters] === key){
            actualisedWord(key);
            count += 1;
            
        }
    }
    // Le count sert a connaître s'il y a eu une correspondance ou non pour retirer un essai (uniquement en cas de nouvelle lettre car on laisse le joueur donner une lettre qu'il a déjà utiliser au clavier)
    if (count === 0){
        attempsNumber -= 1;
        attempsElementDisplay.textContent = `${attempsNumber} trials left`;
        animateScript();
    }
    
}

function actualisedWord(key) {
    for (let i = 0; i < theWord.length; i++) {
        if (theWord[i] === key) {
            hideWord[i] = key;
            
        }
    }
    elementWordToFind.textContent = hideWord.join("");
}



// Afficher "gagnant" ou "perdant" suivant le résultat ainsi qu'une musique appropriée.
function win()
{
    startGameButton.style.display = "block";
    console.log("bravo vous avez gagné");
}

function lose(){
    console.log(`Dommage, vous avez perdu, la bonne réponse était  ${WordsToFind}`);
}

// Option recommencer (Même fenêtre modale que les wins or loose. Mettre tout en forme en css)
// Pour l'image on peut lui affecter sa propriété en fonction de attempts en pensait à modifier attempts pour qu'il soit en positif et demarre a partir de . Animer l'image avec une transition css ou en faisant du pixel art personnalisé.

//!---- Events ----
startGameButton.addEventListener("click", startGame);

// Ajoute l'event de lecture du charactère si on clique sur le bouton correspondant.
for (buttons of keys){
    buttons.addEventListener("click", function(){
        readKey(this.textContent);
    });

}

// Permet de détecter si une touche du clavier est pressée et de lire l'action si c'est bien un caractère.
document.addEventListener("keydown", (event) =>{
    if (event.key.search(/[^a-zA-Z]+/) == -1){
        readKey(event.key);
    }
});



// Option, afficher les lettres restantes en disabled les touches déjà préssées.
// Afficher l'avancement du pendu entre chaque tentative.