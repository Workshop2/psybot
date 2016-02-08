"use strict";
var j5 = require("johnny-five");
var FrontArm = (function () {
    function FrontArm(bottomServoPin, topServoPin) {
        this.movementSpeed = 1000;
        this.bottomServo = this.createServo(bottomServoPin, this.bottomServoMovementCompleted);
        this.topServo = this.createServo(topServoPin, this.topServoMovementCompleted);
    }
    FrontArm.prototype.createServo = function (pin, callback) {
        var servo = new j5.Servo({
            pin: pin,
            range: [45, 135],
            center: true
        });
        servo.on("move:complete", callback);
        return servo;
    };
    FrontArm.prototype.bottomServoMovementCompleted = function () {
        if (this.bottomServoCallback) {
            this.bottomServoCallback();
            this.bottomServoCallback = null;
        }
    };
    FrontArm.prototype.topServoMovementCompleted = function () {
        if (this.topServoCallback) {
            this.topServoCallback();
            this.topServoCallback = null;
        }
    };
    FrontArm.prototype.sweepUpDown = function (sweepOptions) {
        this.stopTop();
        this.topServo.sweep(sweepOptions);
    };
    FrontArm.prototype.sweepLeftRight = function (sweepOptions) {
        this.stopBottom();
        this.bottomServo.sweep(sweepOptions);
    };
    FrontArm.prototype.stop = function () {
        this.stopBottom();
        this.stopTop();
    };
    FrontArm.prototype.stopBottom = function () {
        this.bottomServoCallback = null;
        this.bottomServo.stop();
    };
    FrontArm.prototype.stopTop = function () {
        this.topServoCallback = null;
        this.topServo.stop();
    };
    FrontArm.prototype.center = function (callback) {
        this.stop();
        var bottomCompleted = false;
        var topCompleted = false;
        this.bottomServoCallback = function () {
            bottomCompleted = true;
            if (topCompleted === bottomCompleted && callback) {
                callback();
            }
        };
        this.topServoCallback = function () {
            topCompleted = true;
            if (bottomCompleted === topCompleted && callback) {
                callback();
            }
        };
        this.bottomServo.center();
        this.topServo.center();
    };
    FrontArm.prototype.faceUp = function (callback) {
        this.stopTop();
        this.topServoCallback = callback;
        this.topServo.to(180, this.movementSpeed);
    };
    FrontArm.prototype.faceDown = function (callback) {
        this.stopTop();
        this.topServoCallback = callback;
        this.topServo.to(0, this.movementSpeed);
    };
    FrontArm.prototype.faceRight = function (callback) {
        this.stopBottom();
        this.bottomServoCallback = callback;
        this.bottomServo.to(180, this.movementSpeed);
    };
    FrontArm.prototype.faceLeft = function (callback) {
        this.stopBottom();
        this.bottomServoCallback = callback;
        this.bottomServo.to(0, this.movementSpeed);
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
