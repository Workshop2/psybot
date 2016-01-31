var five = require("johnny-five");

module.exports = function(pins) {
  var motors = {};
  console.log(pins);

  var init = function() {
    console.log("Initialising motors...");
    motors.left = new five.Motor({pins: pins.left});
    motors.right = new five.Motor({pins: pins.right});
    console.log("Done!");
  }

  var forward = function() {
    console.log("Moving forward");
    motors.left.forward(255);
    motors.right.forward(255);
  };

  var brake = function() {
    console.log("Braking...");
    motors.left.brake();
    motors.right.brake();
  };

  var left = function() {
    console.log("Braking...");
    motors.left.forward(255);
    motors.right.reverse(255);
  };

  return {
    init: init,
    forward: forward,
    brake: brake,
    left: left
  };
};
