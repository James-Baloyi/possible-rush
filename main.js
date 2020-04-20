var rotate_init = 45;
var current_colour = 'green';
var colour = ['green', 'blue', 'red', 'yellow'];
var index = 1;
var falling_ball = '';
var score = 0;
var indices = 0;

function rotate(deg, event){
  if(indices == 0){
    createFallingBalls();
    indices = 1;
  }
  current_colour = colour[index++];
  if(current_colour == 'yellow'){
    index = 0;
  }
  rotate_init = rotate_init + deg;
  console.log(rotate_init, current_colour, index);
  var block = event.target;
  block.style.transform = 'rotateZ('+rotate_init+'deg)';
}

window.ondblclick = (event) => {
  event.preventDefault();
}

function createFallingBalls(){
  falling_ball = document.createElement('div', 'div');
  falling_ball.setAttribute('id', 'falling_ball');
  var bg_colour = colour[Math.floor(Math.random()*colour.length)]
  falling_ball.setAttribute('data', bg_colour);
  console.log(bg_colour);
  falling_ball.style.backgroundColor = bg_colour;
  document.body.appendChild(falling_ball);
  setInterval(()=>{moveBall(falling_ball)}, 50);
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
  if(diff < 100){
    addScore = false;
  }
  if(diff < 40){
    var win = document.getElementById('audio');
    var fail = document.getElementById('audio2');
    var id = ball.getAttribute('id');
    var ball_colour = ball.getAttribute('data');
    if(current_colour == ball_colour){
      updateScore(20);
      win.play();
    }else{
      console.log(score);
      if(score > 100){
      updateScore(-20);
      }else{
      updateScore(0);
      fail.play();
    }
    }
    removeElement(id);
  }
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
