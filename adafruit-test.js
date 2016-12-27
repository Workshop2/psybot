"use strict";
var five = require("johnny-five");
var psybotMotors = require("./psybot-lib/components/motors");
var board = new five.Board({ "port": "/dev/ttyAMA0" });
board.on("ready", function () {
    var motor1 = new five.Motor(psybotMotors.Motors.leftMotorPin);
    motor1.start(150);
    setTimeout(function () { motor1.stop(); }, 5000);
});
