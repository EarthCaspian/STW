//!Location Generator
let locations = ["Dark Forest", "Clearing",
"Meadow" ,"Swamp", "Castle"]
let randomIndex = Math.floor(Math.random() * locations.length);
let randomLocation = locations[randomIndex];

//!Enemy Generator
let enemies = ["Goblin", "Halfling" , "Rat" , "Wolf","Undead"]
let randomEnemyIndex = Math.floor(Math.random() * enemies.length);
let enemy = enemies[randomEnemyIndex];

//!Situation Generator
let situations = ["Cold", "Wet", "Scared", "Lost", "Stuck", "Tired"]
let randomSituationIndex = Math.floor(Math.random() * situations.length);
let situation = situations[randomSituationIndex]

//!Roll 20
const diceRoll = Math.round(Math.random() * 20);
console.log(diceRoll);

//!Game Over Status
let gameOverCounter = 0;

//!Random Area Image Change
let mainTextbox = document.querySelector(".mainTextbox");
mainTextbox.style.backgroundImage = `linear-gradient(90deg,rgba(41, 37, 37, 0.774),rgba(114, 74, 14, 0.103)), url('img/${randomLocation}.png')`;

$(document).ready(function () {
    $(".currentLocation").html(`You are in a ${randomLocation}`);
    $(".currentSituation").html(`You are ${situation}!`)
    $(".actionCheck").html("What do you do?")
    console.log("page loaded");
});



let task1Completed = false;

let gamestate = "intro";




let HowsItGoing = $(".currentSituation").html(`You are ${situation}!`)
let question = $(".actionCheck").html("");
let answer = $(".actionResult").html("");


function task1(callback) {
    console.log("task 1 running");
    const diceRoll = Math.round(Math.random() * 20);
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
            answer.html(`You're unsure about which way to go. Try some directions.`)
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
        else if (playerAnswer == "make fire") {
            subTask1completed = true;
            answer.html(`You need wood and stones to make a campfire.`)
            $(".playerAction").val("")
        }    
        else if (subTask1completed = true && playerAnswer == "find wood") {
                answer.html(`You gather some wood. Some stones would go together with this to make a campfire.`)
                $(".playerAction").val("")
                findWood = true;
        }
        else if (findWood = true && playerAnswer == "find stones") {
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
        if (playerAnswer == "change clothes") {
            answer.html(`There's no extra clothes available.`)
            $(".playerAction").val("")
        }
        else if (playerAnswer == "make fire") {
            subTask1completed = true;
            answer.html(`You need wood and stones to make a campfire.`)
            $(".playerAction").val("")
        }    
        else if (subTask1completed = true && playerAnswer == "find wood") {
                answer.html(`You gather some wood. Some stones would go together with this to make a campfire.`)
                $(".playerAction").val("")
                findWood = true
        }
        else if (findWood = true && playerAnswer == "find stones") {
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
            answer.html(`You decide to stop being scared but it doesn't work.`);
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
        else if (playerAnswer == "yell") {
            answer.html(`You yell out your lungs of fear. Nothing happens. `)
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


function task2(playerAnswer) {
    const diceRoll = Math.round(Math.random() * 20);
    console.log("task 2 running");
    $(".playerAction").val("");
    HowsItGoing.html(`You are no longer ${situation}.`);
    answer.html(`You see a ${enemy}!`);
}

function task3(playerAnswer) {
    $(".currentLocation").html("");
    mainTextbox.style.backgroundImage = `linear-gradient(90deg,rgba(41, 37, 37, 0.774),rgba(114, 74, 14, 0.103)), url('img/rune.jpeg')`;
    const diceRoll = Math.round(Math.random() * 20);
    console.log("task 3 running");
    $(".playerAction").val("");
    answer.html("");
    HowsItGoing.html(`The world around you suddenly darkens,you see a strange rune on the floor.`);
}

$(".playerDecision").click(function (e) {
  e.preventDefault();
  handlePlayerDecision();
});

$(".playerAction").on("keypress", function(e){
    if (e.key === "Enter"){
        e.preventDefault();
        handlePlayerDecision();
    }
})

function handlePlayerDecision() {
    if (!task1Completed) {
        task1(function () {
          let playerAnswer = $(".playerAction").val();
          task2(playerAnswer);
          gamestate = "CombatInit";
        });
      } else if (gamestate == "CombatInit") {
        combat(function() {
          gamestate = "CombatOver";
          task3();
        });
        let playerAnswer = $(".playerAction").val();
        if (playerAnswer == "attack") {
          answer.html(`With what?`);
          $(".playerAction").val("");
        }
      }
  }

  function combat(callback) {
    const diceRoll = Math.round(Math.random() * 20);
    console.log(`You rolled ${diceRoll}.`);
    let playerAnswer = $(".playerAction").val();
    console.log("combat running");
    if (gamestate == "CombatInit" && playerAnswer == "sword" && enemy == "Undead") {
        $(".playerAction").val("");  
        answer.html(`Sword is ineffective on ${enemy}.`);
        CheckGameOver("ineffective");
    } else if (gamestate == "CombatInit" && playerAnswer == "mace" && enemy == "Undead") {
        $(".diceRoll").html(`You roll ${diceRoll}`);
        $(".playerAction").val("");
        if (diceRoll > 10){
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
        if (diceRoll > 10){
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
    else if (gamestate == "CombatInit" && playerAnswer=="hands") {
        $(".playerAction").val("")  
        if (playerAnswer=="hands"){
            answer.html(`Your fisticuffs are ineffective on ${enemy}.`)
            $(".playerAction").val("")
            CheckGameOver("ineffective")
        }
    }
    else {
        answer.html(`I don't understand that, try something else.`)
    }
}
    


function CheckGameOver(stringToCheck) {
    if (answer.text().includes(stringToCheck)) {
        gameOverCounter++;
        if (gameOverCounter > 1) {
            gameOver();
        }
    }
}

function gameOver() {
    answer.html(`${enemy} has bested you and you have died. Try Again.`)
    $(".playerAction").val("");
    gameOverCounter = 0;
}