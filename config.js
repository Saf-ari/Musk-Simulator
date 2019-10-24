var GAME = {
  canvas : {
    width : 1000,
    height : 600
  },
  started : true,
  score : 0,
  gravity : 0.1,
  death : ""
};

var ROCKET1 = {
  x : 0,
  y : 0,
  width : 60,
  height : 120,
  thrusting : false,
  xvel : 0,
  xacc : 0,
  yvel : 0,
  yacc : 0,
  rot : Math.PI/2,
  rotating : false,
  rotspeed : Math.PI/70,
  power : 0.3
};
var ROCKET2 = {
  x : 0,
  y : 0,
  width : 80,
  height : 120,
  thrusting : false,
  xvel : 0,
  xacc : 0,
  yvel : 0,
  yacc : 0,
  rot : Math.PI/2,
  rotating : false,
  rotspeed : Math.PI/70,
  power : 0.3
};
