"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var five = require("johnny-five");
var psybotMotors = require("./psybot-lib/components/motors");
//var boardOptions = new BoardOptions(; // connect over serial
var board = new five.Board({ "port": "/dev/ttyAMA0" });
board.on("ready", function () {
    var motor1 = new five.Motor(psybotMotors.Motors.leftMotorPin);
    // Start the motor at maximum speed
    motor1.start(150);
    setTimeout(function () { motor1.stop(); }, 5000);
});
//# sourceMappingURL=adafruit-test.js.map