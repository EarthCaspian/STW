//! here lies the old functions, perhaps one day.

//word by word title crawl
// function displayIntroText(text, callback) {
//     let introTextDiv = $(".introText");
//     let words = text.split(' ');
//     let i = 0;

//     function typeWriter() {
//         if (i < words.length) {
//             introTextDiv.append(words[i] + ' ');
//             i++;
//             setTimeout(typeWriter, 100); 
//         } else {
//             callback();
//         }
//     }

//     typeWriter();
// }

//old function for seal puzzle
// function task3(callback) {
//     answer.html("");
//     $(".currentLocation").html("");
//     mainTextbox.style.backgroundImage = `linear-gradient(90deg,rgba(41, 37, 37, 0.774),rgba(114, 74, 14, 0.103)), url('img/rune.jpeg')`;
//     const diceRoll = Math.round(1 + Math.random() * 19);
//     console.log("task 3 running");
//     HowsItGoing.html(`The world around you suddenly darkens,you see a strange rune on the floor.`);
//     $(".actionCheck").html("What do you do?");
//     $(".playerAction").val("");
//     let playerAnswer = $(".playerAction").val();
//         if(playerAnswer.includes("investigate")){
//             $(".diceRoll").html(`You roll ${diceRoll}`);
//             if(diceRoll < 10){
//                 answer.html(`You try to figure out the details of the rune to no avail. `);
//                 $(".playerAction").val("");
//             }
//             else{
//                 answer.html(`You discover you need to touch the seals in order to deactivate the rune.`);
//                 HowsItGoing.html(`There are 3 seals, how do you start the sequence? Up, left or right?`);
//                 $(".playerAction").val("");
//                 let sealCounter = 3;
//                 while(sealCounter != 0){
//                     playerAnswer = $(".playerAction").val("");
//                     if(playerAnswer != "right,left,up") {
//                         answer.html(`The sequence seems to be incorrect.`);
//                         $(".playerAction").val("");
//                         sealCounter -= 1
//                     }
//                     else{
//                         answer.html(`The veil of shadow breaks, you find yourself teleported to a wizards tower.`);
//                         $(".playerAction").val("");
//                         setTimeout(function(){
//                             callback();
//                         }, 2000);
//                         break;
//                     }
//                 }
//                 if (sealCounter == 0) {
//                     sealGameOver();
//                 }
//             }
//         }
//         else{
//             answer.html(`I don't understand that, try something else.`);
//             $(".playerAction").val("");
//         }
// }