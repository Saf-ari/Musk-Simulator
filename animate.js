var score = 0;
var highScore = 0;
//for rocket1
function renderRockets(context) {
  var canvas = document.getElementById('canvas');
  if (GAME.started){
    handleRocketMovement();
  }
  var r1 = new Image();
  if (ROCKET1.thrusting){
    r1.src = 'Rocket Ship 1 Thrust.png';
    drawRotatedImage(context, r1, ROCKET1.x, ROCKET1.y, ROCKET1.width, ROCKET1.height, ROCKET1.rot);
  }
  else {
    r1.src = 'Rocket Ship 1.png';
    drawRotatedImage(context, r1, ROCKET1.x, ROCKET1.y, ROCKET1.width, ROCKET1.height, ROCKET1.rot);
  }
}
//for rocket2
function renderRockets2(context) {
  var canvas = document.getElementById('canvas');
  if (GAME.started){
    handleRocketMovement2();
  }
  var r2 = new Image();
  if (ROCKET2.thrusting){
    r2.src = 'Rocket Ship 2 Thrust.png';
    drawRotatedImage(context, r2, ROCKET2.x, ROCKET2.y, ROCKET2.width, ROCKET2.height, ROCKET2.rot);
  }
  else {
    r2.src = 'Rocket Ship 2.png';
    drawRotatedImage(context, r2, ROCKET2.x, ROCKET2.y, ROCKET2.width, ROCKET2.height, ROCKET2.rot);
  }
}

function drawRotatedImage(context, image, x, y, width, height, angle) {
	context.save();
	context.translate(x, y);
	context.rotate(Math.PI/2-angle);
	context.drawImage(image, -width/2, -height/2, width, height) ;
	context.restore();
}


function initializeRockets(){
  var canvas = document.getElementById('mainCanvas');
  var context = canvas.getContext('2d');
  ROCKET1.x = (GAME.canvas.width-ROCKET1.width)/2;
  ROCKET1.y = (GAME.canvas.height-ROCKET1.height)/2;
  ROCKET1.xvel = 0;
  ROCKET1.xacc = 0;
  ROCKET1.yvel = 0;
  ROCKET1.yacc = 0;
  ROCKET1.rot = Math.PI/2;
  ROCKET1.tipping = false;

  ROCKET2.x = (GAME.canvas.width-ROCKET2.width)/2;
  ROCKET2.y = (GAME.canvas.height-ROCKET2.height)/2;
  ROCKET2.xvel = 0;
  ROCKET2.xacc = 0;
  ROCKET2.yvel = 0;
  ROCKET2.yacc = 0;
  ROCKET2.rot = Math.PI/2;
  ROCKET2.tipping = false;

  randomizePlatform();

}

function renderCurrentScore(context){
  context.font = "30px Arial";
  context.fillStyle = "red";
  context.fillText("Score: " + score, 60, 70);
}

function renderHighScore(context){
  context.font = "30px Arial";
  context.fillStyle = "red";
  context.fillText("High score: " + highScore, 800, 70);
}


//rocket1
function checkCollidePlatform(){
  if (ROCKET1.x < PLATFORM.x + PLATFORM.width +39 && ROCKET1.x + ROCKET1.width  > PLATFORM.x +39 &&
  ROCKET1.y < PLATFORM.y + PLATFORM.height +107 && ROCKET1.y + ROCKET1.height > PLATFORM.y+107) {
    return true;
}
return false;
}
//ROCKET2
function checkCollidePlatform2(){
  if (ROCKET2.x < PLATFORM.x + PLATFORM.width +39 && ROCKET2.x + ROCKET2.width  > PLATFORM.x +39 &&
  ROCKET2.y < PLATFORM.y + PLATFORM.height +107 && ROCKET2.y + ROCKET2.height > PLATFORM.y+107) {
    return true;
}
return false;
}



//for rocket1
function handleRocketMovement() {
  if (ROCKET1.thrusting){
    ROCKET1.xacc = ROCKET1.power * Math.cos(ROCKET1.rot);
    ROCKET1.fuel -= 1;
  }
  else{
    ROCKET1.xacc = 0;
  }
  if (ROCKET1.thrusting){
    ROCKET1.yacc = -ROCKET1.power * Math.sin(ROCKET1.rot)+GAME.gravity;
  }
  else{
    ROCKET1.yacc = GAME.gravity;
  }
  ROCKET1.xvel+=ROCKET1.xacc;
  ROCKET1.yvel+=ROCKET1.yacc;
  ROCKET1.x += ROCKET1.xvel;
  ROCKET1.y += ROCKET1.yvel;
  if (ROCKET1.fuel == 0){
    GAME.death = "PLAYER 1 ran out of fuel";
    ROCKET1.thrusting = false;
    GAME.started = false;
    GAME.level = 5;
    if (score > highScore){
      highScore = score;
    }
    score = 0;
    giveBackFuel();
  }

  if
    (checkCollidePlatform())
  {
    if (ROCKET1.rot<Math.PI/2-0.5 || ROCKET1.rot > Math.PI/2+0.5){
      GAME.death = "PLAYER 1 had too much rotation";
      ROCKET1.tipping = true;
      ROCKET1.thrusting = false;
      GAME.started = false;
      GAME.level = GAME.level/2;
      score = 0;
    }
    else if(ROCKET1.yvel > 4){
      GAME.death = "PLAYER 1 had too much speed";
      ROCKET1.thrusting = false;
      GAME.started = false;
      GAME.level = GAME.level/2;
      score = 0;
    }
    else{
      ROCKET1.y = PLATFORM.y-ROCKET1.height/4
      ROCKET1.yvel = 0;
      ROCKET1.xvel = 0;
      GAME.death = "PLAYER 1 had an excellent landing"
      GAME.started = false;
      GAME.level = GAME.level/2;
      score = score +1;
      if (score>highScore){
        highScore = score;
      }
      if (ROCKET1.rot < Math.PI/2 && ROCKET1.rot > 0){
        ROCKET1.rot += Math.abs(ROCKET1.rotspeed);
      }
      else if (ROCKET1.rot > Math.PI/2 && ROCKET1.rot < Math.PI){
        ROCKET1.rot -= Math.abs(ROCKET1.rotspeed);
      }
    }
  }
  if (ROCKET1.y - ROCKET1.height/2 <0){
    ROCKET1.y = ROCKET1.height/2;
    ROCKET1.yvel = 0;
  }
  if (ROCKET1.x > GAME.canvas.width - ROCKET1.width/2){
      ROCKET1.x = GAME.canvas.width-ROCKET1.width/2;
      ROCKET1.xvel = 0;
  }
  if (ROCKET1.x - ROCKET1.width/2 <0){
    ROCKET1.x = ROCKET1.width/2;
    ROCKET1.xvel = 0;
  }
  if (ROCKET1.rotating){
    ROCKET1.rot += ROCKET1.rotspeed;
    if (ROCKET1.rot > Math.PI){
      ROCKET1.rot = Math.PI;
    }
    if (ROCKET1.rot < 0){
      ROCKET1.rot = 0;
    }
  }
}

//for rocket2

function handleRocketMovement2() {
  if (ROCKET2.thrusting){
    ROCKET2.xacc = ROCKET2.power * Math.cos(ROCKET2.rot);
    ROCKET2.fuel -= 1;
  }
  else{
    ROCKET2.xacc = 0;
  }
  if (ROCKET2.thrusting){
    ROCKET2.yacc = -ROCKET2.power * Math.sin(ROCKET2.rot)+GAME.gravity;
  }
  else{
    ROCKET2.yacc = GAME.gravity;
  }
  ROCKET2.xvel+=ROCKET2.xacc;
  ROCKET2.yvel+=ROCKET2.yacc;
  ROCKET2.x += ROCKET2.xvel;
  ROCKET2.y += ROCKET2.yvel;
  if (ROCKET2.fuel == 0){
    GAME.death = "PLAYER 2 ran out of fuel";
    ROCKET2.thrusting = false;
    GAME.started = false;
    GAME.level = 5;
    if (score > highScore){
      highScore = score;
    }
    score = 0;
    giveBackFuel();
  }

  if
    (checkCollidePlatform2())
  {
    if (ROCKET2.rot<Math.PI/2-0.5 || ROCKET2.rot > Math.PI/2+0.5){
      GAME.death = "PLAYER 2 had too much rotation";
      ROCKET2.tipping = true;
      ROCKET2.thrusting = false;
      GAME.started = false;
      GAME.level = GAME.level/2;
      score = 0;
    }
    else if(ROCKET2.yvel > 4){
      GAME.death = "PLAYER 2 too much speed";
      ROCKET2.thrusting = false;
      GAME.started = false;
      GAME.level = GAME.level/2;
      score = 0;
    }
    else{
      ROCKET2.y = PLATFORM.y-ROCKET2.height/4
      ROCKET2.yvel = 0;
      ROCKET2.xvel = 0;
      GAME.death = "PLAYER 2 had an excellent landing"
      GAME.started = false;
      GAME.level = GAME.level/2;
      score = score +1;
      if (score>highScore){
        highScore = score;
      }
      if (ROCKET2.rot < Math.PI/2 && ROCKET2.rot > 0){
        ROCKET2.rot += Math.abs(ROCKET2.rotspeed);
      }
      else if (ROCKET2.rot > Math.PI/2 && ROCKET2.rot < Math.PI){
        ROCKET2.rot -= Math.abs(ROCKET2.rotspeed);
      }
    }
  }
  if (ROCKET2.y - ROCKET2.height/2 <0){
    ROCKET2.y = ROCKET2.height/2;
    ROCKET2.yvel = 0;
  }
  if (ROCKET2.x > GAME.canvas.width - ROCKET2.width/2){
      ROCKET2.x = GAME.canvas.width-ROCKET2.width/2;
      ROCKET2.xvel = 0;
  }
  if (ROCKET2.x - ROCKET2.width/2 <0){
    ROCKET2.x = ROCKET2.width/2;
    ROCKET2.xvel = 0;
  }
  if (ROCKET2.rotating){
    ROCKET2.rot += ROCKET2.rotspeed;
    if (ROCKET2.rot > Math.PI){
      ROCKET2.rot = Math.PI;
    }
    if (ROCKET2.rot < 0){
      ROCKET2.rot = 0;
    }
  }
}

function renderBackground(context){
  var background = new Image();
  background.src = 'Space Background.png';
  context.drawImage(background, 0, 0, GAME.canvas.width, GAME.canvas.height);

}

function renderPlatform(context){
  var platform = new Image();
  platform.src = 'platform.png';
  context.drawImage(platform, PLATFORM.x, PLATFORM.y, PLATFORM.width, PLATFORM.height);

}
function debugHitbox(context){
  context.beginPath();
  context.lineWidth = "6";
  context.strokeStyle = "red";
  context.rect(PLATFORM.x, PLATFORM.y, PLATFORM.width, PLATFORM.height);
  context.rect (ROCKET1.x, ROCKET1.y , ROCKET1.width, ROCKET1.height);
  context.stroke();
}

function randomizePlatform(){
  PLATFORM.x = Math.random ()*(GAME.canvas.width-50);
  PLATFORM.y = Math.random()*(GAME.canvas.height-50);

  PLATFORM.width = Math.random()*400 +50*GAME.level;
  PLATFORM.height = 100;
}

function renderFuel(context){
  var fuelBox = new Image();
  fuelBox.src = 'swirl.jpg'
  context.drawImage(fuelBox, 10, 100, 100, ROCKET1.fuel)

}

function giveBackFuel(){
  ROCKET1.fuel = 500;
}



function runGame() {
  var canvas = document.getElementById('mainCanvas');
  var context = canvas.getContext('2d');
  if (GAME.started) {

    renderBackground(context);
    renderRockets(context);
    renderRockets2(context);
    renderPlatform(context);
    renderFuel(context);
    renderCurrentScore(context);
    renderHighScore(context);
  }
  else {
    if (ROCKET1.tipping){
      if (ROCKET1.rot < Math.PI/2 && ROCKET1.rot > 0){
        ROCKET1.rot -= Math.abs(ROCKET1.rotspeed);
      }
      else if (ROCKET1.rot > Math.PI/2 && ROCKET1.rot < Math.PI){
        ROCKET1.rot += Math.abs(ROCKET1.rotspeed);
      }
      else{
        ROCKET1.tipping = false;
      }
      renderBackground(context);
      renderRockets(context);
    }
    else if (EXPLOSION.currentFrame < EXPLOSION.totalFrames * EXPLOSION.frameDuration){
      var explosion = new Image();
      explosion.src = "explosion.png";
      renderBackground(context);
      renderPlatform(context);
      context.drawImage(explosion,EXPLOSION.width / EXPLOSION.totalFrames * Math.floor(EXPLOSION.currentFrame/EXPLOSION.frameDuration),0,EXPLOSION.width / EXPLOSION.totalFrames, EXPLOSION.height, ROCKET1.x-(EXPLOSION.width / (2 * EXPLOSION.totalFrames)), ROCKET1.y-(EXPLOSION.height/1.3), EXPLOSION.width / EXPLOSION.totalFrames, EXPLOSION.height);
      EXPLOSION.currentFrame++;
    }
    else{
      renderBackground(context);
      context.font = "30px Arial";
      context.fillStyle = "red";
      context.textAlign = "center";
      context.fillText("Game Over: " + GAME.death, GAME.canvas.width/2, 200);
      context.fillText("Press R to try again", GAME.canvas.width/2, 260);
    }
    if (CONTROLS.running){
      GAME.started = true;
    }

    else if (ROCKET2.tipping){
      if (ROCKET2.rot < Math.PI/2 && ROCKET2.rot > 0){
        ROCKET2.rot -= Math.abs(ROCKET2.rotspeed);
      }
      else if (ROCKET2.rot > Math.PI/2 && ROCKET2.rot < Math.PI){
        ROCKET2.rot += Math.abs(ROCKET2.rotspeed);
      }
      else{
        ROCKET2.tipping = false;
      }
      renderBackground(context);
      renderRockets(context);
    }
    else if (EXPLOSION.currentFrame < EXPLOSION.totalFrames * EXPLOSION.frameDuration){
      var explosion = new Image();
      explosion.src = "explosion.png";
      renderBackground(context);
      renderPlatform(context);
      context.drawImage(explosion,EXPLOSION.width / EXPLOSION.totalFrames * Math.floor(EXPLOSION.currentFrame/EXPLOSION.frameDuration),0,EXPLOSION.width / EXPLOSION.totalFrames, EXPLOSION.height, ROCKET2.x-(EXPLOSION.width / (2 * EXPLOSION.totalFrames)), ROCKET2.y-(EXPLOSION.height/1.3), EXPLOSION.width / EXPLOSION.totalFrames, EXPLOSION.height);
      context.drawImage(explosion,EXPLOSION.width / EXPLOSION.totalFrames * Math.floor(EXPLOSION.currentFrame/EXPLOSION.frameDuration),0,EXPLOSION.width / EXPLOSION.totalFrames, EXPLOSION.height, ROCKET1.x-(EXPLOSION.width / (2 * EXPLOSION.totalFrames)), ROCKET1.y-(EXPLOSION.height/1.3), EXPLOSION.width / EXPLOSION.totalFrames, EXPLOSION.height);
      EXPLOSION.currentFrame++;
    }
    // else{
    //   renderBackground(context);
    //   context.font = "30px Arial";
    //   context.fillStyle = "red";
    //   context.textAlign = "center";
    //   context.fillText("Game Over: " + GAME.death, GAME.canvas.width/2, 200);
    //   context.fillText("Press R to try again", GAME.canvas.width/2, 260);
    // }
    if (CONTROLS.running){
      GAME.started = true;
    }
  }
  window.requestAnimationFrame(runGame);
}

window.requestAnimationFrame(runGame);
