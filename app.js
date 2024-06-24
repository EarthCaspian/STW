//!Location Generator
let locations = ["Dark Forest", "Clearing",
"Meadow" ,"Swamp", "Castle"]
let randomIndex = Math.floor(Math.random() * locations.length);
let randomLocation = locations[randomIndex];

//!Enemy Generator
let enemies = ["Goblin", "Halfling" , "Rat" , "Wolf", "Undead"]
let randomEnemyIndex = Math.floor(Math.random() * enemies.length);
let enemy = enemies[randomEnemyIndex];

//!Situation Generator
let situations = ["Cold", "Wet", "Scared", "Stuck", "Tired", "Lost"]
let randomSituationIndex = Math.floor(Math.random() * situations.length);
let situation = situations[randomSituationIndex]

//!Roll 20
const diceRoll = Math.round(1 + Math.random() * 19);
console.log(diceRoll);

//!Game Over Status
let gameOverCounter = 0;

//!Random Area Image Change
let mainTextbox = document.querySelector(".mainTextbox");
mainTextbox.style.backgroundImage = `linear-gradient(90deg,rgba(41, 37, 37, 0.774),rgba(114, 74, 14, 0.103)), url('img/${randomLocation}.png')`;


//function for the intro text scroll
function displayIntroText(text, callback) {
    let introTextDiv = $(".introText");
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            introTextDiv.append(text.charAt(i));
            i++;
            setTimeout(typeWriter, 50); 
        } else {
            callback();
        }
    }

    typeWriter();
}

//answer initialized
let answer;

$(document).ready(function () {

    //Intro bg image
    mainTextbox.style.backgroundImage = `linear-gradient(90deg,rgba(41, 37, 37, 0.774),rgba(114, 74, 14, 0.103)), url('img/wizDark.jpeg')`;

    //actionResult assigned to answer and set to empty string
    answer = $(".actionResult");
    answer.html("");

     // Initially hide all game elements
    $(".currentLocation").hide();
    $(".currentSituation").hide();
    $(".actionCheck").hide();
    $(".diceRoll").hide();
    $(".inputNbutton").hide();
    $(".playerAction").hide();
    $(".playerDecision").hide();

    //introText is initialized and function call
    let introText = "Welcome to Stop the Wizard text adventure game! Your journey begins now...";
    displayIntroText(introText, function() {
        $("#startButton").show();
    });
});

$("#startButton").on("click", function() {
    //hide the intro elements
    $("#startButton").hide();
    $(".introText").hide();

    //answer is emptied to avoid else condition
    answer.html("");

     // Show all game elements
    $(".currentLocation").show();
    $(".currentSituation").show();
    $(".actionCheck").show();
    $(".diceRoll").show();
    $(".inputNbutton").show();
    $(".playerAction").show();
    $(".playerDecision").show();
    
    // Set initial game state
    mainTextbox.style.backgroundImage = `linear-gradient(90deg,rgba(41, 37, 37, 0.774),rgba(114, 74, 14, 0.103)), url('img/${randomLocation}.png')`;
    $(".currentLocation").html(`You are in a ${randomLocation}`);
    $(".currentSituation").html(`You are ${situation}!`);
    $(".actionCheck").html("What do you do?");
    console.log("page loaded");

});

//task list
let task1Completed = false;
let task2Completed = false;
let task3Completed = false;


//Random situation is triggered, question initialized
let HowsItGoing = $(".currentSituation").html(`You are ${situation}!`)
let question = $(".actionCheck").html("");


//function to handle conditionals for randomized starting events
function task1(callback) {
    console.log("task 1 running");
    const diceRoll = Math.round(1 + Math.random() * 19);
    let playerAnswer = $(".playerAction").val();
    if (situation == "Stuck") {
        $(".diceRoll").html(`You roll ${diceRoll}`);
        if (playerAnswer.includes("knife") && diceRoll >= 10) {
            answer.html(`You get yourself out using the knife.`);
            $(".playerAction").val("");
            task1Completed = true;
            setTimeout(function(){
                callback();
            },2000)
        }
        else if (playerAnswer.includes("knife") && diceRoll < 10) {
            answer.html(`You fumble with the knife to no avail, try again.`);
            $(".playerAction").val("");
        }
        else if (playerAnswer.includes("hands")) {
            answer.html(`You need to use some sort of tool!`)
            $(".playerAction").val("")
        }
        else if (playerAnswer.includes("struggle") || playerAnswer.includes("wiggle")) {
            answer.html(`You wiggle around for a bit, nothing happens.`)
            $(".playerAction").val("")
        }
        else {
            answer.html(`I don't understand that, try something else.`)
            $(".playerAction").val("")
        }
    }   
    else if (situation == "Lost")  {
        let subTask1completed = false;
        if (playerAnswer.includes("look") || playerAnswer.includes("search")) {
            answer.html(`You look around but unsure about which way to go. Try some directions.`)
            $(".playerAction").val("")
        }
        else if (playerAnswer.includes("north")) {
            answer.html(`You went north.You don't feel this is the right way.`)
            $(".playerAction").val("")
        }
        else if (playerAnswer.includes("west")) {
            answer.html(`You went west.You see a bunch of shadows near a light source.`)
            $(".playerAction").val("")
            subTask1completed = true
        
        }
        else if (subTask1completed = true && playerAnswer.includes("check") || playerAnswer.includes("go")) {
            $(".playerAction").val("")
            answer.html(`You approach the light source.`)
            task1Completed = true;
            setTimeout(function(){
                callback();
            },2000)    
        }
        else if (playerAnswer.includes("back") || playerAnswer.includes("return")) {
            answer.html(`You went back to where you came from.`)
        }
        
        else if (playerAnswer.includes("east")) {
            answer.html(`You went east.You came to a dead end. There's no way to proceed further.`)
            $(".playerAction").val("")
        }
        else if (playerAnswer.includes("south")) {
            answer.html(`You went south. You hear the distant sound of a water source. This might be good.`)
            $(".playerAction").val("")
        }
        else {
            answer.html(`I don't understand that, try something else.`)
            $(".playerAction").val("")
        }
    }
    else if (situation == "Cold") {
        let subTask1completed = false;
        if (playerAnswer == "rub hands") {
            answer.html(`You vigorously rub your hands together to no avail!`)
            $(".playerAction").val("")
        }
        else if (playerAnswer == "find shelter") {
            answer.html(`You look around for a while, there doesn't seem to be any place to get inside.`)
            $(".playerAction").val("")
        }
        else if (playerAnswer.includes("fire")) {
            subTask1completed = true;
            answer.html(`You need wood and stones to make a campfire.`)
            $(".playerAction").val("")
        }    
        else if (subTask1completed = true && playerAnswer.includes("wood")) {
                answer.html(`You gather some wood. Some stones would go together with this to make a campfire.`)
                $(".playerAction").val("")
                findWood = true;
        }
        else if (findWood = true && playerAnswer.includes("stones")) {
                    answer.html(`You combine stones and wood to make a campfire. You're now feeling warm.`)    
                    task1Completed = true;
                    setTimeout(function(){
                        callback();
                    },3000)
        }
        else {
            answer.html(`I don't understand that, try something else.`)
            $(".playerAction").val("")
        }
    }
    else if (situation == "Wet") {
        subTask1completed = false;
        if (playerAnswer.includes("clothes")) {
            answer.html(`There's no extra clothes available.`)
            $(".playerAction").val("")
        }
        else if (playerAnswer.includes("fire")) {
            subTask1completed = true;
            answer.html(`You need wood and stones to make a campfire.`)
            $(".playerAction").val("")
        }    
        else if (subTask1completed = true && playerAnswer.includes("wood")) {
                answer.html(`You gather some wood. Some stones would go together with this to make a campfire.`)
                $(".playerAction").val("")
                findWood = true
        }
        else if (findWood = true && playerAnswer.includes("stones")) {
                    answer.html(`You combine stones and wood to make a campfire. You're now dry.`)    
                    task1Completed = true;
                    setTimeout(function(){
                        callback();
                    },3000)
        }
        
        else if (playerAnswer == "wait") {
            answer.html(`You wait until you are dry.`);
            $(".playerAction").val("");
            task1Completed = true;
            setTimeout(function(){
                callback();
            },2000)
        }    
        
        else {
            answer.html(`I don't understand that, try something else.`);
            $(".playerAction").val("")
        }
    }   
    else if (situation == "Scared") {
        if (playerAnswer == "stop") {
            answer.html(`You decision to stop being scared doesn't seem to work.`);
            $(".playerAction").val("")
        }
        else if (playerAnswer == "meditate") {
            answer.html(`You meditate until your fear dissipates.`);
            $(".playerAction").val("");
            task1Completed = true;
            setTimeout(function(){
                callback();
            },2000)
        }
        else if (playerAnswer.includes("breath")) {
            answer.html(`You take deep breaths to calm down. It works.`);
            $(".playerAction").val("");
            task1Completed = true;
            setTimeout(function(){
                callback();
            },2000)
        }
        else if (playerAnswer.includes("yell") || playerAnswer.includes("shout")) {
            answer.html(`You yell out your lungs of fear. Nothing happens.`)
            $(".playerAction").val("")
        }
        else {
            answer.html(`I don't understand that, try something else.`)
            $(".playerAction").val("")
        }
    }
    else if (situation == "Tired") {
        if (playerAnswer.includes("rest")) {
            answer.html(`You rest and recover your strength.`);
            $(".playerAction").val("")
            task1Completed = true;
            setTimeout(function(){
                callback();
            },2000)
        }
        else if (playerAnswer.includes("ignore")) {
            answer.html(`You try to ignore and push through your lethargy, but to no avail.`);
            $(".playerAction").val("");
        }
        else if (playerAnswer.includes("sleep")) {
            answer.html(`You are not in a safe area, you cannot sleep. `)
            $(".playerAction").val("")
        }
        else {
            answer.html(`I don't understand that, try something else.`)
            $(".playerAction").val("")
        }
    }
}

//function for combat event trigger
function task2(playerAnswer) {
    const diceRoll = Math.round(1 + Math.random() * 19);
    console.log("task 2 running");
    $(".playerAction").val("");
    HowsItGoing.html(`You are no longer ${situation}.`);

    // Checking if the first letter of enemy is a vowel or not
    const article = ['a', 'e', 'i', 'o', 'u'].includes(enemy[0].toLowerCase()) ? 'an' : 'a';

    answer.html(`You see ${article} ${enemy}!`);

    //Enemy images according to location

    //Undead
    if(enemy == "Undead" && randomLocation == "Castle"){
        mainTextbox.style.backgroundImage = `linear-gradient(90deg,rgba(41, 37, 37, 0.774),rgba(114, 74, 14, 0.103)), url('img/undeadCastle.jpeg')`;
    }
    else if(enemy == "Undead" && randomLocation == "Clearing"){
        mainTextbox.style.backgroundImage = `linear-gradient(90deg,rgba(41, 37, 37, 0.774),rgba(114, 74, 14, 0.103)), url('img/undeadClearing.jpeg')`;
    }
    else if(enemy == "Undead" && randomLocation == "Dark Forest"){
        mainTextbox.style.backgroundImage = `linear-gradient(90deg,rgba(41, 37, 37, 0.774),rgba(114, 74, 14, 0.103)), url('img/undeadDarkForest.jpeg')`;
    }
    else if(enemy == "Undead" && randomLocation == "Meadow"){
        mainTextbox.style.backgroundImage = `linear-gradient(90deg,rgba(41, 37, 37, 0.774),rgba(114, 74, 14, 0.103)), url('img/undeadMeadow.jpeg')`;
    }
    else if(enemy == "Undead" && randomLocation == "Swamp"){
        mainTextbox.style.backgroundImage = `linear-gradient(90deg,rgba(41, 37, 37, 0.774),rgba(114, 74, 14, 0.103)), url('img/undeadSwamp.jpeg')`;
    }

    //Goblin
    else if (enemy == "Goblin" && randomLocation == "Swamp"){
        mainTextbox.style.backgroundImage = `linear-gradient(90deg,rgba(41, 37, 37, 0.774),rgba(114, 74, 14, 0.103)), url('img/goblinSwamp.jpeg')`;
    }
    else if (enemy == "Goblin" && randomLocation == "Castle"){
        mainTextbox.style.backgroundImage = `linear-gradient(90deg,rgba(41, 37, 37, 0.774),rgba(114, 74, 14, 0.103)), url('img/goblinCastle.jpeg')`;
    }
    else if (enemy == "Goblin" && randomLocation == "Dark Forest"){
        mainTextbox.style.backgroundImage = `linear-gradient(90deg,rgba(41, 37, 37, 0.774),rgba(114, 74, 14, 0.103)), url('img/goblinDarkForest.jpeg')`;
    }
    else if (enemy == "Goblin" && randomLocation == "Clearing"){
        mainTextbox.style.backgroundImage = `linear-gradient(90deg,rgba(41, 37, 37, 0.774),rgba(114, 74, 14, 0.103)), url('img/goblinClearing.jpeg')`;
    }
    else if (enemy == "Goblin" && randomLocation == "Meadow"){
        mainTextbox.style.backgroundImage = `linear-gradient(90deg,rgba(41, 37, 37, 0.774),rgba(114, 74, 14, 0.103)), url('img/goblinMeadow.jpeg')`;
    }
    
    //Wolf
    else if (enemy == "Wolf" && randomLocation == "Swamp"){
        mainTextbox.style.backgroundImage = `linear-gradient(90deg,rgba(41, 37, 37, 0.774),rgba(114, 74, 14, 0.103)), url('img/wolfSwamp.jpeg')`;
    }
    else if (enemy == "Wolf" && randomLocation == "Castle"){
        mainTextbox.style.backgroundImage = `linear-gradient(90deg,rgba(41, 37, 37, 0.774),rgba(114, 74, 14, 0.103)), url('img/wolfCastle.jpeg')`;
    }
    else if (enemy == "Wolf" && randomLocation == "Dark Forest"){
        mainTextbox.style.backgroundImage = `linear-gradient(90deg,rgba(41, 37, 37, 0.774),rgba(114, 74, 14, 0.103)), url('img/wolfDarkForest.jpeg')`;
    }
    else if (enemy == "Wolf" && randomLocation == "Clearing"){
        mainTextbox.style.backgroundImage = `linear-gradient(90deg,rgba(41, 37, 37, 0.774),rgba(114, 74, 14, 0.103)), url('img/wolfClearing.jpeg')`;
    }
    else if (enemy == "Wolf" && randomLocation == "Meadow"){
        mainTextbox.style.backgroundImage = `linear-gradient(90deg,rgba(41, 37, 37, 0.774),rgba(114, 74, 14, 0.103)), url('img/wolfMeadow.jpeg')`;
    }

    //Rat
    else if (enemy == "Rat" && randomLocation == "Swamp"){
        mainTextbox.style.backgroundImage = `linear-gradient(90deg,rgba(41, 37, 37, 0.774),rgba(114, 74, 14, 0.103)), url('img/ratSwamp.jpg')`;
    }
    else if (enemy == "Rat" && randomLocation == "Castle"){
        mainTextbox.style.backgroundImage = `linear-gradient(90deg,rgba(41, 37, 37, 0.774),rgba(114, 74, 14, 0.103)), url('img/ratCastle.jpg')`;
    }
    else if (enemy == "Rat" && randomLocation == "Dark Forest"){
        mainTextbox.style.backgroundImage = `linear-gradient(90deg,rgba(41, 37, 37, 0.774),rgba(114, 74, 14, 0.103)), url('img/ratDarkForest.jpg')`;
    }
    else if (enemy == "Rat" && randomLocation == "Clearing"){
        mainTextbox.style.backgroundImage = `linear-gradient(90deg,rgba(41, 37, 37, 0.774),rgba(114, 74, 14, 0.103)), url('img/ratClearing.jpg')`;
    }
    else if (enemy == "Rat" && randomLocation == "Meadow"){
        mainTextbox.style.backgroundImage = `linear-gradient(90deg,rgba(41, 37, 37, 0.774),rgba(114, 74, 14, 0.103)), url('img/ratMeadow.jpg')`;
    }

    //Halfling
    else if (enemy == "Halfling" && randomLocation == "Swamp"){
        mainTextbox.style.backgroundImage = `linear-gradient(90deg,rgba(41, 37, 37, 0.774),rgba(114, 74, 14, 0.103)), url('img/halflingSwamp.jpg')`;
    }
    else if (enemy == "Halfling" && randomLocation == "Castle"){
        mainTextbox.style.backgroundImage = `linear-gradient(90deg,rgba(41, 37, 37, 0.774),rgba(114, 74, 14, 0.103)), url('img/halflingCastle.jpg')`;
    }
    else if (enemy == "Halfling" && randomLocation == "Dark Forest"){
        mainTextbox.style.backgroundImage = `linear-gradient(90deg,rgba(41, 37, 37, 0.774),rgba(114, 74, 14, 0.103)), url('img/halflingDarkForest.jpg')`;
    }
    else if (enemy == "Halfling" && randomLocation == "Clearing"){
        mainTextbox.style.backgroundImage = `linear-gradient(90deg,rgba(41, 37, 37, 0.774),rgba(114, 74, 14, 0.103)), url('img/halflingClearing.jpg')`;
    }
    else if (enemy == "Halfling" && randomLocation == "Meadow"){
        mainTextbox.style.backgroundImage = `linear-gradient(90deg,rgba(41, 37, 37, 0.774),rgba(114, 74, 14, 0.103)), url('img/halflingMeadow.jpg')`;
    }
    
    $(".actionCheck").html("What do you do?");
}


// function for seal puzzle
function task3(callback) {
    answer.html("");
    $(".currentLocation").html("");
    mainTextbox.style.backgroundImage = `linear-gradient(90deg,rgba(41, 37, 37, 0.774),rgba(114, 74, 14, 0.103)), url('img/rune.jpeg')`;
    console.log("task 3 running");
    HowsItGoing.html(`The world around you suddenly darkens, you see a strange rune on the floor.`);
    $(".actionCheck").html("What do you do?");
    $(".playerAction").val("").focus();

    let rerollCounter = 3;

    function handlePlayerAction(event) {
        if (event.key !== 'Enter') return; // Proceed only when Enter key is pressed

        let playerAnswer = $(".playerAction").val().toLowerCase().trim();

        if (playerAnswer.includes("investigate")) {
            const diceRoll = Math.round(1 + Math.random() * 19);
            $(".diceRoll").html(`You roll ${diceRoll}`);
            if (diceRoll < 10) {
                answer.html(`You try to figure out the details of the rune to no avail. `);
                $(".playerAction").val("").focus();
                rerollCounter -= 1;
                if (rerollCounter === 0) {
                    $(".playerAction").off('keydown', handlePlayerAction);
                    sealGameOver();
                }
            } else {
                answer.html(`You discover you need to touch the seals in order to deactivate the rune.`);
                HowsItGoing.html(`There are 3 seals, how do you start the sequence? Up, left or right?`);
                $(".playerAction").val("").focus();

                let sealCounter = 3;
                let sequence = '';

                function handleSealSequence(event) {
                    if (event.key !== 'Enter') return; // Proceed only when Enter key is pressed

                    let playerAnswer = $(".playerAction").val().toLowerCase().trim();
                    sequence += (sequence ? ',' : '') + playerAnswer;

                    if (sequence === "right,left,up") {
                        answer.html(`The veil of shadow breaks, you find yourself teleported to a wizard's tower.`);
                        $(".playerAction").val("").off('keydown', handleSealSequence).focus(); // Remove the event listener
                        setTimeout(function(){
                            callback();
                        }, 2000);
                    } else {
                        answer.html(`The sequence seems to be incorrect.`);
                        $(".playerAction").val("").focus();
                        sealCounter -= 1;
                        if (sealCounter === 0) {
                            $(".playerAction").off('keydown', handleSealSequence); // Remove the event listener
                            sealExplosionGameOver();
                        }
                    }
                }

                $(".playerAction").off('keydown', handlePlayerAction).on('keydown', handleSealSequence).focus();
            }
        } else {
            answer.html(`I don't understand that, try something else.`);
            $(".playerAction").val("").focus();
        }
    }

    $(".playerAction").off('keydown').on('keydown', handlePlayerAction).focus();
}


//click event handler
$("#playerDecisionButton").click(function (e) {
    console.log("Action clicked");
    e.preventDefault();
    handlePlayerDecision();
});


//enter keypress event handler
$(".playerAction").on("keypress", function(e){
    if (e.key === "Enter"){
        console.log("Enter key pressed");
        e.preventDefault();
        handlePlayerDecision();
    }
})

//main event handler 
function handlePlayerDecision() {
  let playerAnswer = $(".playerAction").val();
  if (!task1Completed) {
    task1(function () {
      task2(playerAnswer);
      gamestate = "CombatInit";
    });
  } else if (gamestate == "CombatInit") {
    combat(function () {
      gamestate = "CombatOver";
      task3(function() {
        gamestate = "OutofSeal";
    });
    });
    if (playerAnswer == "attack") {
      answer.html(`With what?`);
      $(".playerAction").val("");
    }
  } 
  }

//function for the combat sequence
  function combat(callback) {
    task2Completed = true;
    const diceRoll = Math.round(1 + Math.random() * 19);
    console.log(`You rolled ${diceRoll}.`);
    let playerAnswer = $(".playerAction").val();
    console.log("combat running");
    let unarmedCombatWords = ["hands","fist","fists","punch"];
    if (gamestate == "CombatInit" && playerAnswer == "sword" && enemy == "Undead") {
        $(".playerAction").val("");  
        answer.html(`Sword is ineffective on ${enemy}.`);
        CheckGameOver("ineffective");
    } else if (gamestate == "CombatInit" && playerAnswer == "mace" && enemy == "Undead") {
        $(".diceRoll").html(`You roll ${diceRoll}`);
        $(".playerAction").val("");
        if (diceRoll >= 10){
            answer.html(`You strike the ${enemy} down with your mace!. You have vanquished the enemy!`);
            $(".playerAction").val("");
            setTimeout(function(){
                callback();
            }, 2000);
        } else {
            answer.html(`Your attack with the mace misses, ${enemy} still lives!`);
            $(".playerAction").val("");
            CheckGameOver("miss");
        }
    } else if (gamestate == "CombatInit" && playerAnswer == "sword") {
        $(".diceRoll").html(`You roll ${diceRoll}`);
        $(".playerAction").val("");
        if (diceRoll > 8){
            answer.html(`Your strike the ${enemy} down with your sword!. You have vanquished the enemy!`);
            $(".playerAction").val("");
            setTimeout(function(){
                callback();
            }, 2000);
        } else {
            answer.html(`You miss your attack with the sword, ${enemy} still lives!`);
            $(".playerAction").val("");
            CheckGameOver("miss");
        }
    }
    else if (gamestate == "CombatInit" && unarmedCombatWords.some(word => playerAnswer.includes(word))) {
        answer.html(`Your fisticuffs are ineffective on ${enemy}.`)
        $(".playerAction").val("")
        CheckGameOver("ineffective")
    }
    else {
        answer.html(`I don't understand that, try something else.`)
    }
}
    

//condition checker function for combat related game over
function CheckGameOver(stringToCheck) {
    if (answer.text().includes(stringToCheck)) {
        gameOverCounter++;
        if (gameOverCounter > 2) {
            combatGameOver();
        }
    }
}

function combatGameOver() {
    mainTextbox.style.backgroundImage = `linear-gradient(90deg,rgba(41, 37, 37, 0.774),rgba(114, 74, 14, 0.103)), url('img/combatDefeat.jpeg')`;
    answer.html(`${enemy} has bested you and you have died. Try Again.`)
    $(".playerAction").val("");
    gameOverCounter = 0;
}

function sealExplosionGameOver() {
    mainTextbox.style.backgroundImage = `linear-gradient(90deg,rgba(41, 37, 37, 0.774),rgba(114, 74, 14, 0.103)), url('img/arcaneExplosion.jpeg')`;
    answer.html(`Your fumbling with the magical seal unleashed an arcane explosion and you are disintigrated. Game Over.`)
    $(".playerAction").val("").off('keydown').focus(); // Ensuring the event listener is removed
}

function sealGameOver() {
    mainTextbox.style.backgroundImage = `linear-gradient(90deg,rgba(41, 37, 37, 0.774),rgba(114, 74, 14, 0.103)), url('img/trapped.jpeg')`;
    answer.html(`The seals have locked. You are trapped in eternal void forever. Game Over.`);
    $(".playerAction").val("").off('keydown').focus(); // Ensuring the event listener is removed
}