var CONTROLS = {
  running : false,
  student : {
    jumping : false
  }

};

document.addEventListener('keydown', function(event) {
  switch (event.key) {
    case " ":
      CONTROLS.student.jumping = true;
      break;
      case "r":
        CONTROLS.running = true;
    default:
      break;
  }
});


document.addEventListener('keyup', function(event) {
  switch (event.key) {
    case " ":
      CONTROLS.student.jumping = false;
      break;
    case "r":
      CONTROLS.running = false;
    default:
      break;
  }
});
