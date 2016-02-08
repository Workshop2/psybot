"use strict";
var j5 = require("johnny-five");
var FrontArm = (function () {
    function FrontArm(bottomServoPin, topServoPin) {
        this.bottomServo = this.createServo(bottomServoPin);
        this.topServo = this.createServo(topServoPin);
    }
    FrontArm.prototype.createServo = function (pin) {
        return new j5.Servo({
            pin: pin,
            range: [45, 135],
            center: true
        });
    };
    FrontArm.prototype.sweepUpDown = function (sweepOptions) {
        this.topServo.sweep(sweepOptions);
    };
    FrontArm.prototype.sweepLeftRight = function (sweepOptions) {
        this.bottomServo.sweep(sweepOptions);
    };
    FrontArm.prototype.stop = function () {
        this.bottomServo.stop();
        this.topServo.stop();
    };
    FrontArm.prototype.center = function () {
        this.bottomServo.center();
        this.topServo.center();
    };
    FrontArm.prototype.faceUp = function () {
    };
    FrontArm.prototype.faceDown = function () {
    };
    FrontArm.prototype.faceRight = function () {
    };
    FrontArm.prototype.faceLeft = function () {
    };
    return FrontArm;
}());
exports.FrontArm = FrontArm;
var ServoSweepOptions = (function () {
    function ServoSweepOptions(range, interval) {
        this.range = range;
    }
    return ServoSweepOptions;
}());
exports.ServoSweepOptions = ServoSweepOptions;
