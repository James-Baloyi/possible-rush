var rotate_init = 45;
var current_colour = 'green';
var colour = ['#00ff00', 'blue', 'red', 'yellow'];
var index = 1;
var falling_ball = '';
var score = 0;
var indices = 0;
var fails = 0;
var lives = 3;
var show_high_score = true;
var allowed = true;
var dropspeed = 0.3;

//Desktop Support since the UI allows
window.onkeydown = (event){
  if(event.keyCode == '49' || event.keyCode == 49){
  rotate(90);
  }
}

function rotate(deg){
  if(indices == 0){
    createFallingBalls();
    indices = 1;
  }
  current_colour = colour[index++];
  if(current_colour == 'yellow'){
    index = 0;
  }
  rotate_init = rotate_init + deg;
  //console.log(rotate_init, current_colour, index);
  var block = document.getElementsByClassName('block')[0];
  block.style.transform = 'rotateZ('+rotate_init+'deg)';
}

window.ondblclick = (event) => {
  event.preventDefault();
}

function variableDroppageArchitecture(){
    var speeds = [2.5,2.6,2.65,2.75];
    dropspeed = speeds[Math.floor(Math.random()*speeds.length)];
    return dropspeed;
}

function createFallingBalls(){
  if(allowed == true){
  falling_ball = document.createElement('div', 'div');
  falling_ball.setAttribute('id', 'falling_ball');
  var bg_colour = colour[Math.floor(Math.random()*colour.length)];
  falling_ball.setAttribute('data', bg_colour);
  //console.log(bg_colour);
  falling_ball.style.backgroundColor = bg_colour;
  console.log(variableDroppageArchitecture());
  falling_ball.style.transition = 0.43/variableDroppageArchitecture()+'s';
  document.body.appendChild(falling_ball);
  setInterval(()=>{moveBall(falling_ball)}, 50);
  }
}

function moveBall(ball) {
  var ballStyle = window.getComputedStyle(ball);
  var topValue = ballStyle.getPropertyValue("top").replace("px", "");
  ball.style.top = (Number(topValue) + 70) + "px";
  var box = document.getElementsByClassName('block')[0];
  var boxStyle = window.getComputedStyle(box);
  var boxBottom = parseInt(boxStyle.bottom.replace('px', ''));
  var ballBottom = parseInt(ballStyle.bottom.replace('px', ''));
  var diff = ballBottom - boxBottom;
  if(diff < 70){
    var win = document.getElementById('audio');
    var fail = document.getElementById('audio2');
    var id = ball.getAttribute('id');
    var ball_colour = ball.getAttribute('data');
    if(current_colour == ball_colour){
      updateScore(20);
      win.play();
    }else{
      //console.log(score);
      if(score > 100){
      lives = lives - 1;
      document.getElementById('lifeBox').innerText = lives;
      updateScore(-20);
      }else{
      updateScore(0);
      lives = lives - 1;
      document.getElementById('lifeBox').innerText = lives;
    }

    fails = fails + 1;

    console.log(fails);
    if(fails > 2){
      allowed = false;
      restartGame();
    }
    fail.play();

    }
    removeElement(id);
  }
}

function restartGame(){
var previousScore = localStorage.getItem('currentScore');
if(previousScore == null){
  previousScore = 0;
}
console.log(previousScore);

if(score > previousScore){
  localStorage.setItem('currentScore', score);
}
showRestartModal(previousScore);
}

function showRestartModal(previousScore){
    if(score > previousScore){
      document.getElementsByClassName('hidden')[0].classList.toggle('score-panel');
      document.getElementById('old-score').innerText = previousScore;
      document.getElementById('new-score').innerText = score;
    }else{
      document.getElementsByClassName('hidden2')[0].classList.toggle('score-panel');
      document.getElementById('old-score_one').innerText = previousScore;
      document.getElementById('new-score_one').innerText = score;
    }
    console.log(score, previousScore)
}

function updateScore(add){
  score = score + add;
  document.getElementById('scoreBox').innerText = score;
}

function removeElement(elementId) {
    var element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
    createFallingBalls();
}

function resumeGame(){
  allowed = true;
  score = 0;
  fails = 0;
  lives = 3;
  document.getElementById('lifeBox').innerText = 3;
  document.getElementById('scoreBox').innerText = 0;
  document.getElementsByClassName('hidden')[0].classList.toggle('score-panel');
  createFallingBalls();
}

function resumeGameFromDeath(){
  allowed = true;
  score = 0;
  fails = 0;
  lives = 3;
  document.getElementById('scoreBox').innerText = 0;
  document.getElementById('lifeBox').innerText = 3;
  document.getElementsByClassName('hidden2')[0].classList.toggle('score-panel');
  createFallingBalls();
}
