"use strict";
var j5 = require("johnny-five");
var psybotSonar = require("./sonar");
var FrontArm = (function () {
    function FrontArm(bottomServoPin, topServoPin) {
        this.movementSpeed = 1000;
        this.bottomServo = new j5.Servo({
            pin: bottomServoPin,
            range: [15, 180],
            center: true
        });
        this.topServo = new j5.Servo({
            pin: topServoPin,
            range: [20, 150],
            center: true
        });
        var sonarOptions = new psybotSonar.SonarOptions(1, "device");
        this.sonar = new psybotSonar.Sonar(sonarOptions);
    }
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
        console.log("stopBottom");
        this.bottomServo.stop();
    };
    FrontArm.prototype.stopTop = function () {
        console.log("stopTop");
        this.topServo.stop();
    };
    FrontArm.prototype.center = function (callback) {
        var _this = this;
        this.stop();
        this.bottomServo.center();
        this.topServo.center();
        setTimeout(function () { _this.stop(); callback(); }, this.movementSpeed);
    };
    FrontArm.prototype.faceUp = function (callback) {
        var _this = this;
        this.stopTop();
        console.log("faceUp");
        this.topServo.min();
        setTimeout(function () { _this.stopTop(); callback(); }, this.movementSpeed);
    };
    FrontArm.prototype.faceDown = function (callback) {
        var _this = this;
        this.stopTop();
        console.log("faceDown");
        this.topServo.max();
        setTimeout(function () { _this.stopTop(); callback(); }, this.movementSpeed);
    };
    FrontArm.prototype.faceRight = function (callback) {
        var _this = this;
        this.stopBottom();
        console.log("faceRight");
        this.bottomServo.min();
        setTimeout(function () { _this.stopBottom(); callback(); }, this.movementSpeed);
    };
    FrontArm.prototype.faceLeft = function (callback) {
        var _this = this;
        this.stopBottom();
        console.log("faceLeft");
        this.bottomServo.max();
        setTimeout(function () { _this.stopBottom(); callback(); }, this.movementSpeed);
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
