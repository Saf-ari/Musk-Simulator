
function renderRockets(context) {
  var canvas = document.getElementById('canvas');
  handleRocketMovement();
  var r1 = new Image();
  //var r2 = new Image();
  if (ROCKET1.thrusting){
    r1.src = 'Rocket Ship 1 Thrust.png';
  }
  else {
    r1.src = 'Rocket Ship 1.png';
  }
  /*if (ROCKET2.thrusting){
    r2.src = 'Rocket Ship 2 Thrust.png';
  }
  else {
    r2.src = 'Rocket Ship 2.png';
  }*/
  context.drawImage(r1, ROCKET1.x, ROCKET1.y, ROCKET1.width, ROCKET1.height);  //Render rocket
}
function initializeRockets(){
  ROCKET1.x = GAME.canvas.width/2;
  ROCKET1.y = GAME.canvas.height/2;
}
function handleRocketMovement() {
  if (ROCKET1.thrusting){
    ROCKET1.xacc = ROCKET1.power * Math.cos(ROCKET1.rot);
  }
  else{
    ROCKET1.xacc = 0;
  }
  ROCKET1.xvel+=ROCKET1.xacc;
  STUDENT.y += STUDENT.vel;
  if (STUDENT.y > GAME.canvas.height-STUDENT.height){
    STUDENT.y = GAME.canvas.height-STUDENT.height;
  };
  if (STUDENT.y < 0){
    STUDENT.y = 0;
  };
}
function renderBackground(context){
  var canvas = document.getElementById('canvas');
  var background = new Image();
  background.src = 'Space Background.png';
  context.drawImage(student, 0, 0, GAME.canvas.width, GAME.canvs.height);
}
function runGame() {
  var canvas = document.getElementById('mainCanvas');
  var context = canvas.getContext('2d');

  if (GAME.started) {
    context.clearRect(0, 0, 600, 300);
    renderStudent(context);
    renderTheiss(context);
    if (STUDENT.x < THEISS1.x + THEISS1.width &&
      STUDENT.x + STUDENT.width > THEISS1.x &&
      STUDENT.y < THEISS1.height) {
        GAME.started = false;
    }
    if (STUDENT.x < THEISS2.x + THEISS2.width &&
      STUDENT.x + STUDENT.width > THEISS2.x &&
      STUDENT.y < THEISS2.height) {
        GAME.started = false;
    }
    if (STUDENT.x < THEISS3.x + THEISS3.width &&
      STUDENT.x + STUDENT.width > THEISS3.x &&
      STUDENT.y < THEISS3.height) {
        GAME.started = false;
    }
    if (STUDENT.x < THEISS1.x + THEISS1.width &&
      STUDENT.x + STUDENT.width > THEISS1.x &&
      STUDENT.y + STUDENT.height > THEISS1.height + GAME.gap){
        GAME.started = false;
    }
    if (STUDENT.x < THEISS2.x + THEISS2.width &&
      STUDENT.x + STUDENT.width > THEISS2.x &&
      STUDENT.y + STUDENT.height > THEISS2.height + GAME.gap){
        GAME.started = false;
    }
    if (STUDENT.x < THEISS3.x + THEISS3.width &&
      STUDENT.x + STUDENT.width > THEISS3.x &&
      STUDENT.y + STUDENT.height > THEISS3.height + GAME.gap){
        GAME.started = false;
    }

  } else {
    context.font = "30px Arial";
    if (GAME.score > document.cookie){
      document.cookie = GAME.score;
    }
    context.fillText("Game Over Score " + GAME.score, 135, 200);
    context.fillText("High Score : " + document.cookie, 135, 230);
    context.fillText("Press R to try again", 135, 260);
    if (CONTROLS.running){
      GAME.started = true;
      initializeTheiss();
      initializeStudent();
      GAME.score = 0;
    }
  }
  window.requestAnimationFrame(runGame);
}

window.requestAnimationFrame(runGame);
