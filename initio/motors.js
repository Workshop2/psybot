var five = require("johnny-five");

// speed is always passed in as a decimal between 0.0 - 1.0
module.exports = function(pins, motors) {
  var motors = motors || {};
  var consts = {
    maxSpeed: 180,
    minSpeed: 0
  };

  var state = {
    speed: 0.0
  };

  var init = function() {
    console.log("Initialising motors...");
    motors.left = new five.Motor({pins: pins.left});
    motors.right = new five.Motor({pins: pins.right});
    console.log("Done!");
  }

  var forward = function(speed) {
    console.log("Moving forward");
    motors.left.forward(255);
    motors.right.forward(255);
  };

  var brake = function(speed) {
    console.log("Braking...");
    motors.left.brake();
    motors.right.brake();
  };

  var left = function(speed) {
    console.log("Turning left...");
    motors.left.forward(255);
    motors.right.reverse(255);
  };

  var right = function(speed) {
    console.log("Turning right...");
    motors.left.reverse(255);
    motors.right.forward(255);
  };

  var getSpeed = function(speed) {
    state.speed = speed || state.speed;

  }

  return {
    init: init,
    forward: forward,
    brake: brake,
    left: left,
    right: right
  };
};
