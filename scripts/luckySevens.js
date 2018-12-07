var gameActive = false;
var startingMoney = 0;
var remainingMoney = 0;
var totalRolls = 0;
var highestAmount = 0;
var rollCountAtHighest = 0;
var rollResult;

//This function checks to see if the player still has money, if no money remains the game is ended
function checkMoney(){   
    if(gameActive && (remainingMoney > 0)){
        gameActive = true;
    }
    
    if(gameActive && (remainingMoney <= 0)){
        gameActive = false;
    }  
}

//This function will keep track of the total rolls
function countRolls(){
    totalRolls++;
}

//This function will reset all counts and game stats
function resetCounts(){
    remainingMoney = 0;
    totalRolls = 0;
    highestAmount = 0;
    rollCountAtHighest = 0;
}

//This function compares the current amount to the highest amount, and stores the higher amount and the
//roll count it was recorded on
function checkHighestAmount(amount){
    if(amount > highestAmount){
        highestAmount = amount;
        rollCountAtHighest = totalRolls;
    }
}

//This function will roll the two die, and return true if the total is equal to 7
function rollDice(){
    var d1 = Math.floor(Math.random() * 6) + 1;
    var d2 = Math.floor(Math.random() * 6) + 1;
    
    countRolls();
    
    if(d1 + d2 == 7){
        return true;
    }
    else{
        return false;
    }
}

//This function runs the game and is triggered by the play button
function playGame(){
    
    //starting money is set to the player input value
    startingMoney = Number(document.forms["luckySevenForm"]["startingMoney"].value)
    
    //if the input value is not a number greater than zero, the player is alerted and the game will not start
    if(startingMoney == "" || isNaN(startingMoney)){
        alert("Starting Bet must be filled in with a positive number.");
        document.forms["luckySevenForm"]["startingMoney"].focus();
        return false;
    }
    
    //the counts are reset before the new game starts
    resetCounts();
    
    //starting money is stored as remaining money so we can save the starting value to display later
    remainingMoney = startingMoney;
    //game active is set to true
    gameActive = true;
    
    //game will continue until game active is set to false
    while(gameActive){
        
        //highest amount is stored right away in case no money is gained
        checkHighestAmount(remainingMoney);
        
        //rollResult is a boolean that will be true if rollDice() results in 7
        rollResult = rollDice();
        
        //if the result is 7, $4 is added, otherwise $1 is subtracted
        if(rollResult){
            remainingMoney = remainingMoney + 4;
        }
        
        else{
            remainingMoney = remainingMoney - 1;
        }
        
        //remaining money is checked, and gameActive will be set to false if no money remains
        checkMoney();
    }
    
    document.getElementById("resultsHeader").style.display = "block";
    document.getElementById("results").style.display = "block";
    document.getElementById("startingBetDisplay").innerText = "$" + Math.round(startingMoney * 100) / 100;
    document.getElementById("totalRollsDisplay").innerText = totalRolls;
    document.getElementById("highestAmountDisplay").innerText = "$" + Math.round(highestAmount * 100) / 100;
    document.getElementById("rollCountDisplay").innerText = rollCountAtHighest;
    
    return false;
    
}

