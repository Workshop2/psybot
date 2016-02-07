"use strict";
var j5 = require("johnny-five");
var Motors = (function () {
    function Motors(leftPins, rightPins) {
        this.leftPins = leftPins;
        this.rightPins = rightPins;
        console.log("Initialising motors...");
        console.log("Left");
        console.log(new MotorOptions(leftPins));
        this.leftMotor = new j5.Motor(new MotorOptions(leftPins));
        console.log("right");
        this.rightMotor = new j5.Motor(new MotorOptions(rightPins));
        console.log("Done!");
    }
    Motors.prototype.forward = function (speed) {
        console.log("Moving forward");
        this.leftMotor.forward(255);
        this.rightMotor.forward(255);
    };
    Motors.prototype.reverse = function (speed) {
        console.log("Moving backwards");
        this.leftMotor.reverse(255);
        this.rightMotor.reverse(255);
    };
    Motors.prototype.brake = function () {
        console.log("Braking");
        this.leftMotor.brake();
        this.rightMotor.brake();
    };
    Motors.prototype.left = function (speed) {
        console.log("Moving left");
        this.leftMotor.reverse(255);
        this.rightMotor.forward(255);
    };
    Motors.prototype.right = function (speed) {
        console.log("Moving right");
        this.leftMotor.forward(255);
        this.rightMotor.reverse(255);
    };
    return Motors;
}());
exports.Motors = Motors;
var MotorPins = (function () {
    function MotorPins(pwm, dir, cdir) {
        this.pwm = pwm;
        this.dir = dir;
        this.cdir = cdir;
    }
    return MotorPins;
}());
exports.MotorPins = MotorPins;
var MotorOptions = (function () {
    function MotorOptions(pins) {
        this.pins = pins;
    }
    return MotorOptions;
}());
