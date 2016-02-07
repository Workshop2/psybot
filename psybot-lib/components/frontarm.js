"use strict";
var j5 = require("johnny-five");
var FrontArm = (function () {
    function FrontArm(bottomServoPin, topServoPin) {
        this.bottomServo = new j5.Servo({
            pin: bottomServoPin,
            range: [45, 135],
            center: true
        });
        this.topServo = new j5.Servo({
            pin: topServoPin,
            range: [45, 135],
            center: true
        });
    }
    FrontArm.prototype.sweepUpDown = function () {
        this.topServo.sweep();
    };
    FrontArm.prototype.sweepLeftRight = function () {
        this.bottomServo.sweep();
    };
    return FrontArm;
}());
exports.FrontArm = FrontArm;
