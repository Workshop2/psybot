"use strict";
var j5 = require("johnny-five");
var psybotSonar = require("./sonar");
var FrontArm = (function () {
    function FrontArm(bottomServoPin, topServoPin) {
        this.movementSpeed = 1000;
        this.stopTimeout = 200;
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
    FrontArm.prototype.stop = function (callback) {
        this.stopBottom();
        this.stopTop();
        if (callback) {
            setTimeout(callback, this.stopTimeout);
        }
    };
    FrontArm.prototype.stopBottom = function (callback) {
        console.log("stopBottom");
        this.bottomServo.stop();
        if (callback) {
            setTimeout(callback, this.stopTimeout);
        }
    };
    FrontArm.prototype.stopTop = function (callback) {
        console.log("stopTop");
        this.topServo.stop();
        if (callback) {
            setTimeout(callback, this.stopTimeout);
        }
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
        this.stopTop(function () {
            console.log("faceUp");
            _this.topServo.min();
            setTimeout(function () { _this.stopTop(callback); }, _this.movementSpeed);
        });
    };
    FrontArm.prototype.faceDown = function (callback) {
        var _this = this;
        this.stopTop(function () {
            console.log("faceDown");
            _this.topServo.max();
            setTimeout(function () { _this.stopTop(callback); }, _this.movementSpeed);
        });
    };
    FrontArm.prototype.faceRight = function (callback) {
        var _this = this;
        this.stopBottom(function () {
            console.log("faceRight");
            _this.bottomServo.min();
            setTimeout(function () { _this.stopBottom(callback); }, _this.movementSpeed);
        });
    };
    FrontArm.prototype.faceLeft = function (callback) {
        var _this = this;
        this.stopBottom(function () {
            console.log("faceLeft");
            _this.bottomServo.max();
            setTimeout(function () { _this.stopBottom(callback); }, _this.movementSpeed);
        });
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
