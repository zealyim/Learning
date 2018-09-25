/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


var scores, roundScore, activePlayer, gameplaying;
const winScore = 100;

init();

//document.querySelector('#current-' + activePlayer).textContent = dice; //use # to select id
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';



//Grab info from page
//var x = document.querySelector('#score-0').textContent;
//console.log(x);


document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gameplaying){
        document.querySelector('.btn-hold').style.display = 'block';
        //1. Randome number
        var dice = Math.floor(Math.random() * 6) + 1;
        //2. Display result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';
        //3. Update round score only if dice is NOT a 1
        if (dice !== 1) {//true equal 
            //add score
            roundScore += dice;
            document.getElementById('current-' + activePlayer).textContent = roundScore;
        }
        else { //next player
            roundScore = 0;
            document.getElementById('current-' + activePlayer).textContent = '0';
            //switch player
            switchPlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if(gameplaying && roundScore !== 0){
        //add current number to active player's score
        scores[activePlayer] += roundScore;
        //reset active player current score
        roundScore = 0;
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
        document.getElementById('current-' + activePlayer).textContent = '0';
        //check if active player won the game
        if (scores[activePlayer] >= winScore ){
            document.getElementById('name-' + activePlayer).textContent = 'WINNER!';
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.btn-roll').style.display = 'none';
            document.querySelector('.btn-hold').style.display = 'none';
            gameplaying = false;
        }
        else {
            //switch player
            switchPlayer();
        }
    }
});
document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;

    
    document.querySelector('.dice').style.display = 'none'; //use a "dot" to select class
    document.querySelector('.btn-roll').style.display = 'block';
    document.querySelector('.btn-hold').style.display = 'none';
    document.getElementById('current-0').textContent = '0'; //faster than querySelector
    document.getElementById('score-0').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('name-1').textContent = 'Player 2'
    
    var player0Panel = document.querySelector('.player-0-panel');
    var player1Panel = document.querySelector('.player-1-panel');
    player0Panel.classList.remove('winner');
    player1Panel.classList.remove('winner');
    player0Panel.classList.remove('active');
    player1Panel.classList.remove('active');
    
    player0Panel.classList.add('active');
    
    gameplaying = true;
}
function switchPlayer() {
    //remove "active" class from current active player
    document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
    //switch active player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; //ternary operator format [condition ? expr1 : expr2]
    //add "active" class to new active player
    document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
    showToast();

}
function showToast(){
    var x = document.getElementById('toast');
    var y = document.querySelector('.btn-roll');
    var z = document.querySelector('.btn-hold');
    //disable roll and hold button
    y.style.display = 'none'
    z.style.display = 'none'
    var tempNum = activePlayer + 1
    x.textContent = 'Switch to Player ' + tempNum + '.';
    x.classList.add('show');
    setTimeout(function(){
        x.classList.remove('show'); 
        y.style.display = 'block';
        document.querySelector('.dice').style.display = 'none'
    },3000);

}

function hideToast(){
    var x = document.getElementById('toast');
    x.classList.remove('show');
}
