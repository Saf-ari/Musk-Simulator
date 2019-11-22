var CONTROLS = {
  running : false,
  student : {
    jumping : false
  }

};

document.addEventListener('keydown', function(event) {
  switch (event.key) {
    case "w":
      ROCKET1.thrusting = true;
      break;
      case "a":
      if (ROCKET1.y < GAME.canvas.height-ROCKET1.height/4 ){
        ROCKET1.rotating = true;
        ROCKET1.rotspeed = Math.abs(ROCKET1.rotspeed);
      }
        break;
        case "d":
        if (ROCKET1.y < GAME.canvas.height-ROCKET1.height/4 ){
          ROCKET1.rotating = true;
          ROCKET1.rotspeed = -Math.abs(ROCKET1.rotspeed);
        }
          break;
          case "r":
            if (!GAME.started){
              initializeRockets();
              EXPLOSION.currentFrame = 0;
              GAME.started = true;
            }
            break;
    default:
      break;
  }
});


document.addEventListener('keyup', function(event) {
  switch (event.key) {
    case "w":
      ROCKET1.thrusting = false;
      break;
      case "a":
        ROCKET1.rotating = false;
        break;
        case "d":
          ROCKET1.rotating = false;
          break;
    default:
      break;
  }
});

// from here its for rocket2

document.addEventListener('keydown', function(event) {
  switch (event.key) {
    case "i":
      ROCKET2.thrusting = true;
      break;
      case "j":
      if (ROCKET2.y < GAME.canvas.height-ROCKET2.height/4 ){
        ROCKET2.rotating = true;
        ROCKET2.rotspeed = Math.abs(ROCKET2.rotspeed);
      }
        break;
        case "l":
        if (ROCKET2.y < GAME.canvas.height-ROCKET2.height/4 ){
          ROCKET2.rotating = true;
          ROCKET2.rotspeed = -Math.abs(ROCKET2.rotspeed);
        }
          break;
          case "r":
            if (!GAME.started){
              initializeRockets();
              EXPLOSION.currentFrame = 0;
              GAME.started = true;
            }
            break;
    default:
      break;
  }
});


document.addEventListener('keyup', function(event) {
  switch (event.key) {
    case "i":
      ROCKET2.thrusting = false;
      break;
      case "j":
        ROCKET2.rotating = false;
        break;
        case "l":
          ROCKET2.rotating = false;
          break;
    default:
      break;
  }
});
