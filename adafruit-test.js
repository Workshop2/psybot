"use strict";
var five = require("johnny-five");
var board = new five.Board({ "port": "/dev/ttyAMA0" });
board.on("ready", function () {
    var configs = five.Motor.SHIELD_CONFIGS.ADAFRUIT_V2;
    var motor1 = new five.Motor(configs.M1);
    motor1.start(150);
    setTimeout(function () { motor1.stop(); }, 5000);
});
