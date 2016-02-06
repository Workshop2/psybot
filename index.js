var five = require("johnny-five");
var async = require("async");
var board = new five.Board({port: "/dev/ttyAMA0"});

var initio = require("./psybot-lib/psybot.js");

board.on("ready", function() {
    var motors = new initio.motors({
      left: {
        pwm: 9,
        dir: 2,
        cdir: 3
      },
      right: {
        pwm: 10,
        dir: 4,
        cdir: 5
      }
    });

    async.waterfall([
      function(callback) {
          motors.init();
          motors.forward();

          setTimeout(callback, 5000);
      },
      function(callback) {
        motors.brake();
        setTimeout(callback, 200);
      },
      function(callback) {
        motors.left();
        setTimeout(callback, 5000);
      }
    ], function (err, result) {
      console.log("All done!")
    })

/*
    var motor = new five.Motor({
      pins: {
        pwm: 9,
        dir: 8,
        cdir: 11
      }
    });


    board.repl.inject({
      motor: motor
    });

    motor.on("start", function() {
      console.log("start", Date.now());
    });

    motor.on("stop", function() {
      console.log("automated stop on timer", Date.now());
    });

    motor.on("brake", function() {
      console.log("automated brake on timer", Date.now());
    });

    motor.on("forward", function() {
      console.log("forward", Date.now());

      // demonstrate switching to reverse after 5 seconds
      board.wait(5000, function() {
        motor.reverse(255);
      });
    });

    motor.on("reverse", function() {
      console.log("reverse", Date.now());

      // demonstrate braking after 5 seconds
      board.wait(5000, function() {

        // Brake for 500ms and call stop()
        motor.brake(500);
      });
    });

    // set the motor going forward full speed
    motor.forward(255);*/
});
