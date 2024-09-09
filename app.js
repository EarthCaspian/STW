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
$(".gameOver").html(`${gameOverCounter} mistakes made. For now...`);

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

// character initialized, default fighter
let selectedCharacter = 'fighter'; 

//answer initialized
let answer;

//document ready function
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
    $(".gameOver").hide();

    //introText is initialized and function call for display, start game button and character selector element
    let introText = "Welcome to Stop the Wizard text adventure game! The land is plagued by a dark wizard, as a lone adventurer, you are tasked with stopping the wizard, your journey begins now...";
    displayIntroText(introText, function() {
        $("#startButton").show();
        $("#character-selection").show();
    });

     // Character selection handler
    $('input[name="character"]').on('change', function() {
        selectedCharacter = $(this).val();
    });
});

//start button event handler
$("#startButton").on("click", function() {

    //hide the intro elements
    $("#startButton").hide();
    $(".introText").hide();
    $("#character-selection").hide();

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
    $(".gameOver").show();
    
    // Set initial game state
    mainTextbox.style.backgroundImage = `linear-gradient(90deg,rgba(41, 37, 37, 0.774),rgba(114, 74, 14, 0.103)), url('img/${randomLocation}.png')`;
    $(".currentLocation").html(`You are in a ${randomLocation}`);
    $(".currentSituation").html(`You are ${situation}!`);
    $(".actionCheck").html("What do you do?");
    console.log("page loaded");
    console.log(`character class is ${selectedCharacter}`);
    console.log(`Situations are ${situations}`);
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
        if (playerAnswer.includes("knife") && diceRoll >= 8) {
            answer.html(`You get yourself out using the knife.`);
            $(".playerAction").val("");
            task1Completed = true;
            setTimeout(function(){
                callback();
            },3000)
        }
        else if (playerAnswer.includes("magic") || playerAnswer.includes("spell")) {
            if(selectedCharacter=="wizard"){
                if(diceRoll > 8){
                    answer.html(`You get yourself out of the bind with the mystical ways of magic.`);
                    $(".playerAction").val("");
                    task1Completed = true;
                    setTimeout(function(){
                        callback();
                    },3000) 
                }
                else{
                    answer.html(`Your mystical ways failed you this time, you remain stuck!`);
                    $(".playerAction").val("");
                }
            }
            else{
                answer.html(`You don't know how to use magic!`);
                $(".playerAction").val("");
            }
        }
        else if (playerAnswer.includes("knife") && diceRoll < 8) {
            answer.html(`You fumble with the knife to no avail, try again.`);
            $(".playerAction").val("");
        }
        else if (playerAnswer.includes("slip")) {
            if (selectedCharacter=="ranger"){
                answer.html(`You slip out of your bind with dexterous moves!`)
                $(".playerAction").val("");
                task1Completed = true;
                setTimeout(function(){
                    callback();
                },3000) 
            }
            else{
                answer.html(`You cannot slip out of your bind!`)
                $(".playerAction").val("")
            }
        }
        else if (playerAnswer.includes("hands") || playerAnswer.includes("force") || playerAnswer.includes("strength")) {
            if (selectedCharacter=="fighter"){
                answer.html(`You rip apart your binds with your incredible strength!`)
                $(".playerAction").val("");
                task1Completed = true;
                setTimeout(function(){
                    callback();
                },3000) 
            }
            else{
                answer.html(`You need to use some sort of tool!`)
                $(".playerAction").val("")
            }
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
        else if (playerAnswer.includes("spell") || playerAnswer.includes("magic")) {
            if(selectedCharacter=="wizard"){
                $(".playerAction").val("")
                answer.html(`You cast a searching spell which guides you to head west.`)
            }
            else{
                answer.html(`You don't know how to use magic!`)
                $(".playerAction").val("")
            }
        }
        else if (playerAnswer.includes("track") || playerAnswer.includes("scout")) {
            if(selectedCharacter=="ranger"){
                $(".playerAction").val("")
                answer.html(`Your ranger skills tell you to head west.`)
            }
            else{
                answer.html(`You don't know how to read tracks for your lack of scouting skills.`)
                $(".playerAction").val("")
            }
        }
        else if (subTask1completed = true && playerAnswer.includes("check") || playerAnswer.includes("go")) {
            $(".playerAction").val("")
            answer.html(`You approach the light source.`)
            task1Completed = true;
            setTimeout(function(){
                callback();
            },3000)    
        }
        else if (playerAnswer.includes("back") || playerAnswer.includes("return")) {
            answer.html(`You went back to where you came from. You're not sure what that accomplished.`)
            $(".playerAction").val("")
        }
        
        else if (playerAnswer.includes("east")) {
            answer.html(`You went east.You came to a dead end. There's no way to proceed further.`)
            $(".playerAction").val("")
        }
        else if (playerAnswer.includes("south")) {
            answer.html(`You went south. Your way is blocked by a river, you realise you cannot go further here.`)
            $(".playerAction").val("")
        }
        else {
            answer.html(`I don't understand that, try something else.`)
            $(".playerAction").val("")
        }
    }
    else if (situation == "Cold") {
        let subTask1completed = false;
        if (playerAnswer.includes("hands") || playerAnswer.includes("rub")) {
            answer.html(`You vigorously rub your hands together in order to warm up, but its not enough to warm up!`)
            $(".playerAction").val("")
        }
        else if (playerAnswer.includes("shelter")) {
            answer.html(`You look around for a while, there doesn't seem to be any place to get inside.`)
            $(".playerAction").val("")
        }
        else if (playerAnswer.includes("magic") || playerAnswer.includes("spell")) {
            if(selectedCharacter=="wizard"){
                answer.html(`You use your arcane knowledge to create an aura of heat around you, you now feel warm.`);
                $(".playerAction").val("");
                task1Completed = true;
                setTimeout(function(){
                    callback();
                },3000) 
            }
            else{
                answer.html(`You don't know how to use magic.`);
                $(".playerAction").val("")
            }
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
        else if (playerAnswer.includes("naked")) {
            answer.html(`You decide to go naked in an insane moment, you quickly feel the frostbite.`)
            $(".playerAction").val("");
            CheckGameOver("frostbite");
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
            },3000)
        }    
        else if (playerAnswer.includes("magic") || playerAnswer.includes("spell")) {
            if(selectedCharacter == "wizard"){
                answer.html(`You heat up and dry your clothes with magical energy.`);
                $(".playerAction").val("");
                task1Completed = true;
                setTimeout(function(){
                    callback();
                },3000)
            }
            else {
                answer.html(`You don't know how to use magic!`);
                $(".playerAction").val("");
            }
        }    
        else if (playerAnswer.includes("extra") || playerAnswer.includes("switch")) {
            if(selectedCharacter == "ranger"){
                answer.html(`You have an extra set of clothes in your trusty toolkit. You're good to go.`);
                $(".playerAction").val("");
                task1Completed = true;
                setTimeout(function(){
                    callback();
                },3000)
            }
            else{
                answer.html(`You don't have anything to change with, you stay wet.`);
                $(".playerAction").val("");
            }
        }
        else {
            answer.html(`I don't understand that, try something else.`);
            $(".playerAction").val("")
        }
    }   
    else if (situation == "Scared") {
        if (playerAnswer == "stop") {
            answer.html(`You decision to stop being scared doesn't seem to be working.`);
            $(".playerAction").val("")
        }
        else if (playerAnswer == "meditate") {
            if(selectedCharacter=="wizard"){
                answer.html(`You meditate until your fear dissipates.`);
                $(".playerAction").val("");
                task1Completed = true;
                setTimeout(function(){
                    callback();
                },3000) 
            }
            else{
                answer.html(`You don't know how to meditate.`);
                $(".playerAction").val("")
            }
        }
        else if (playerAnswer.includes("calm")) {
            answer.html(`You try and motivate yourself to calm down, slowly, but it works.`);
            $(".playerAction").val("");
            task1Completed = true;
            setTimeout(function(){
                callback();
            },3000)
        }
        else if (playerAnswer.includes("help")) {
            answer.html(`You are a lone adventurer.There's nobody around to help you.`);
            $(".playerAction").val("")
        }
        else if (playerAnswer.includes("breath") || playerAnswer.includes("deep")) {
            answer.html(`You take deep breaths to calm down. It works.`);
            $(".playerAction").val("");
            task1Completed = true;
            setTimeout(function(){
                callback();
            },3000)
        }
        else if (playerAnswer.includes("yell") || playerAnswer.includes("shout") || playerAnswer.includes("scream")) {
            if(selectedCharacter=="fighter"){
                answer.html(`You let out a guttural scream, adrenaline pumps through your veins, it works.`);
                $(".playerAction").val("");
                task1Completed = true;
                setTimeout(function(){
                    callback();
                },3000)
            }
            else {
                answer.html(`You yell out your lungs of fear. Nothing happens.`)
                $(".playerAction").val("")
            }
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
            },3000)
        }
        else if (playerAnswer.includes("ignore")) {
            if(selectedCharacter=="fighter"){
                answer.html(`You are used to lethargy as a fighter, you ignore the effects of being tired.`);
                $(".playerAction").val("")
                task1Completed = true;
                setTimeout(function(){
                    callback();
                },3000)
            }
            else{
                answer.html(`You try to ignore and push through your lethargy, but to no avail.`);
                $(".playerAction").val("");
            }
            
        }
        else if (playerAnswer.includes("camp")) {
            if(selectedCharacter=="ranger"){
                answer.html(`You quickly prepare a camp and have a rest.`);
            $(".playerAction").val("")
            task1Completed = true;
            setTimeout(function(){
                callback();
            },3000)
            }
            else {
                answer.html(`You do not have camp supplies. Only Rangers carry them.`)
                $(".playerAction").val("");
            }
        }
        else if (playerAnswer.includes("sleep")) {
            answer.html(`You cannot sleep while out in the open. `)
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

    //Undead encounters
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

    //Goblin encounters
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
    
    //Wolf encounters
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

    //Rat encounters
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

    //Halfling encounters
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

    // function for puzzle solve event 
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
                        mainTextbox.style.backgroundImage = `linear-gradient(90deg,rgba(41, 37, 37, 0.774),rgba(114, 74, 14, 0.103)), url('img/wizTower.jpeg')`;
                        $(".playerAction").val("").off('keydown', handleSealSequence).focus(); // Remove the event listener
                        setTimeout(function(){
                            callback();
                        }, 3000);
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
    //Run away
    else if (playerAnswer.includes("run") || playerAnswer.includes("escape")){
        if (selectedCharacter == "ranger"){
            $(".diceRoll").html(`You roll ${diceRoll}`);
            $(".playerAction").val("");
            if (diceRoll > 10){
                answer.html(`Being a swift ranger allowed you to quickly get away!`);
                $(".playerAction").val("");
                setTimeout(function(){
                    task3();
                }, 3000);
            }
            else {
                answer.html(`You hesitate and fall down while trying to run away!`);
                $(".playerAction").val("");
                CheckGameOver("hesitate");
            }
        }
        else {
            answer.html(`You stumble and fall down while trying to run away!`);
            $(".playerAction").val("");
            CheckGameOver("stumble");
        }
    }
    //Teleport away
    else if(playerAnswer.includes("teleport") || playerAnswer.includes("blink")) {
        if (selectedCharacter == "wizard") {
            $(".diceRoll").html(`You roll ${diceRoll}`);
            $(".playerAction").val("");
            if (diceRoll > 10){
                answer.html(`You quickly teleport away from danger!`);
                $(".playerAction").val("");
                setTimeout(function(){
                    task3();
                }, 3000);
            }
            else {
                answer.html(`You fumble your words trying to cast magic!`);
                $(".playerAction").val("");
                CheckGameOver("fumble");
            }
        }
        else{
            answer.html(`You don't know how to cast magic!`);
            $(".playerAction").val("");
        }
    }
    //Trap away
    else if(playerAnswer.includes("trap")){
        if(selectedCharacter == "ranger"){
            $(".diceRoll").html(`You roll ${diceRoll}`);
            $(".playerAction").val("");
            if (diceRoll > 10){
                answer.html(`You set a trap and slowly move away, as ${enemy} approaches, it gets caught in the trap, you escape!!`);
                $(".playerAction").val("");
                setTimeout(function(){
                    task3();
                }, 3000);
            }
            else {
                answer.html(`You couldn't set the trap in time!`);
                $(".playerAction").val("");
                CheckGameOver("couldn't");
            }
        }
        else{
            answer.html(`You don't know how to set traps!`);
            $(".playerAction").val("");
        }
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

    //Undead special check
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
            }, 3000);
        } else {
            answer.html(`Your attack with the mace misses, ${enemy} still lives!`);
            $(".playerAction").val("");
            CheckGameOver("miss");
        }
        
    } 
    else if(gamestate == "CombatInit" && selectedCharacter=="wizard" && playerAnswer.includes("lightning") && enemy == "Undead"){
        $(".diceRoll").html(`You roll ${diceRoll}`);
        $(".playerAction").val("");
        if (diceRoll >= 10){
            answer.html(`Your lightning spell is extremely effective on the ${enemy}! You have vanquished the enemy!`);
            $(".playerAction").val("");
            setTimeout(function(){
                callback();
            }, 3000);
        } else {
            answer.html(`You miss your lightning spell, ${enemy} still lives!`);
            $(".playerAction").val("");
            CheckGameOver("miss");
        }
    }
    else if(gamestate == "CombatInit" && selectedCharacter=="wizard" && !playerAnswer.includes("lightning") && enemy == "Undead"){
        $(".playerAction").val("");  
        answer.html(`Your spell is ineffective on the ${enemy}.`);
        CheckGameOver("ineffective");
    }
    else if(gamestate == "CombatInit" && selectedCharacter=="ranger" && playerAnswer.includes("explosive") && enemy == "Undead"){
        $(".diceRoll").html(`You roll ${diceRoll}`);
        $(".playerAction").val("");
        if (diceRoll >= 10){
            answer.html(`Your crafty use of explosives is extremely effective on the ${enemy}! You have vanquished the enemy!`);
            $(".playerAction").val("");
            setTimeout(function(){
                callback();
            }, 3000);
        } else {
            answer.html(`Your explosives misfire, ${enemy} still lives!`);
            $(".playerAction").val("");
            CheckGameOver("misfire");
        }
    }
    else if(gamestate == "CombatInit" && selectedCharacter=="ranger" && !playerAnswer.includes("explosive") && enemy == "Undead"){
        $(".playerAction").val("");  
        answer.html(`Your tricks is ineffective on the ${enemy}.`);
        CheckGameOver("ineffective");
    }
    // Sword attack
    else if (gamestate == "CombatInit" && playerAnswer == "sword") {
        if(selectedCharacter == "fighter"){
            $(".diceRoll").html(`You roll ${diceRoll}`);
            $(".playerAction").val("");
            if (diceRoll > 6){
                answer.html(`You cut the ${enemy} down with your sword!. You have vanquished the enemy!`);
                $(".playerAction").val("");
                setTimeout(function(){
                    callback();
                }, 3000);
            } else {
                answer.html(`You miss your attack with the sword, ${enemy} still lives!`);
                $(".playerAction").val("");
                CheckGameOver("miss");
            }
        }
        else if(selectedCharacter == "ranger"){
            if (diceRoll > 8){
                answer.html(`You manage to bring the ${enemy} down with your sword!. You have vanquished the enemy!`);
                $(".playerAction").val("");
                setTimeout(function(){
                    callback();
                }, 3000);
            } else {
                answer.html(`You miss your attack with the sword, ${enemy} still lives!`);
                $(".playerAction").val("");
                CheckGameOver("miss");
            }
        }
        else {
            answer.html(`You don't use a sword! You are magician.`);
            $(".playerAction").val("");
        }
    } 
    // Bow attack
    else if (gamestate == "CombatInit" && playerAnswer == "bow") {
        if(selectedCharacter == "ranger"){
            $(".diceRoll").html(`You roll ${diceRoll}`);
            $(".playerAction").val("");
            if (diceRoll > 5){
                answer.html(`You shoot the ${enemy} down with a rain of arrows!. You have vanquished the enemy!`);
                $(".playerAction").val("");
                setTimeout(function(){
                    callback();
                }, 3000);
            } else {
                answer.html(`You miss your attack with the bow, ${enemy} still lives!`);
                $(".playerAction").val("");
                CheckGameOver("miss");
            }
        }
        else if(selectedCharacter == "fighter") {
            $(".diceRoll").html(`You roll ${diceRoll}`);
            $(".playerAction").val("");
            if (diceRoll > 8){
                answer.html(`You shoot the ${enemy} down with a with a well placed shot!. You have vanquished the enemy!`);
                $(".playerAction").val("");
                setTimeout(function(){
                    callback();
                }, 3000);
            } else {
                answer.html(`You miss your attack with the bow, ${enemy} still lives!`);
                $(".playerAction").val("");
                CheckGameOver("miss");
            }
        }
        else {
            answer.html(`You don't use a bow! You are magician.`);
            $(".playerAction").val("");
        }
    }
    // Magic attack
    else if (gamestate == "CombatInit" && playerAnswer.includes("magic") || playerAnswer.includes("spell") || playerAnswer.includes("cast")) {
        if (selectedCharacter == "wizard"){
            $(".diceRoll").html(`You roll ${diceRoll}`);
            $(".playerAction").val("");
            if (diceRoll > 8){
                answer.html(`You vaporize the ${enemy} with magic! You have vanquished the enemy!`);
                $(".playerAction").val("");
                setTimeout(function(){
                    callback();
                }, 3000);
            } else {
                answer.html(`You miss your magic attack, ${enemy} still lives!`);
                $(".playerAction").val("");
                CheckGameOver("miss");
            }
        }
        else {
            answer.html(`You don't know how to use magic!`);
            $(".playerAction").val("");
        }
    }
    // Unarmed attack
    else if (gamestate == "CombatInit" && unarmedCombatWords.some(word => playerAnswer.includes(word))) {
        if (selectedCharacter == "wizard"){
            answer.html(`You are wizard! You are not proficient in hand to hand combat!`)
            $(".playerAction").val("")
            CheckGameOver("not proficient")
        }
        else if(selectedCharacter == "fighter"){
            $(".diceRoll").html(`You roll ${diceRoll}`);
            $(".playerAction").val("");
            if (diceRoll > 5){
                answer.html(`You pummel the ${enemy} with your martial might! You have vanquished the enemy!`);
                $(".playerAction").val("");
                setTimeout(function(){
                    callback();
                }, 3000);
            }
            else{
                answer.html(`You miss your unarmed attack on ${enemy}.`)
                $(".playerAction").val("")
                CheckGameOver("miss")
            }   
        }
        else {
            $(".diceRoll").html(`You roll ${diceRoll}`);
            $(".playerAction").val("");
            if (diceRoll > 10){
                answer.html(`You swiftly take out the ${enemy} with your unarmed skills! You have vanquished the enemy!`);
                $(".playerAction").val("");
                setTimeout(function(){
                    callback();
                }, 3000);
            }
            else{
                answer.html(`You miss your unarmed attack on ${enemy}.`)
                $(".playerAction").val("")
                CheckGameOver("miss")
            } 
        }
    }
    //attempt to flee from combat
    else if(playerAnswer.includes("run") || playerAnswer.includes("escape")){
        answer.html(`You are locked in combat right now, you can't run away and escape anymore!`);
        $(".playerAction").val("");
        CheckGameOver("can't run away");
    }
    else {
        answer.html(`I don't understand that, try something else.`)
    }
}
    

//condition checker function for combat related game over
function CheckGameOver(stringToCheck) {
    if (answer.text().includes(stringToCheck)) {
        gameOverCounter++;
        $(".gameOver").html(`${gameOverCounter} mistakes made.`);
        if (gameOverCounter > 2) {
            combatGameOver();
        }
    }
}

function combatGameOver() {
    mainTextbox.style.backgroundImage = `linear-gradient(90deg,rgba(41, 37, 37, 0.774),rgba(114, 74, 14, 0.103)), url('img/combatDefeat.jpeg')`;
    answer.html(`${enemy} has bested you and you have died. Game Over.`)
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