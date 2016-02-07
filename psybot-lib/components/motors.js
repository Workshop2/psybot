"use strict";
var j5 = require("johnny-five");
var Motors = (function () {
    function Motors(leftPins, rightPins) {
        console.log("Initialising motors...");
        this.leftMotor = new j5.Motor(new MotorOptions(leftPins));
        this.rightMotor = new j5.Motor(new MotorOptions(rightPins));
        console.log("Done!");
        this.speed = 255;
    }
    Object.defineProperty(Motors.prototype, "speed", {
        get: function () {
            return this._speed;
        },
        set: function (newSpeed) {
            var minSpeed = 150;
            var maxSpeed = 255;
            if (newSpeed) {
                if (newSpeed < minSpeed) {
                    newSpeed = minSpeed;
                }
                if (newSpeed > maxSpeed) {
                    newSpeed = maxSpeed;
                }
                if (newSpeed != this._speed) {
                    console.log("Speed changed to " + newSpeed);
                    this._speed = newSpeed;
                    if (this.lastOperation) {
                        this.lastOperation();
                    }
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Motors.prototype.forward = function (speed) {
        var _this = this;
        this.speed = speed;
        this.lastOperation = function () {
            console.log("Moving forward");
            _this.leftMotor.forward(_this._speed);
            _this.rightMotor.forward(_this._speed);
        };
        this.lastOperation();
    };
    Motors.prototype.reverse = function (speed) {
        var _this = this;
        this.speed = speed;
        this.lastOperation = function () {
            console.log("Moving backwards");
            _this.leftMotor.reverse(_this._speed);
            _this.rightMotor.reverse(_this._speed);
        };
        this.lastOperation();
    };
    Motors.prototype.brake = function () {
        var _this = this;
        this.lastOperation = function () {
            console.log("Braking");
            _this.leftMotor.brake();
            _this.rightMotor.brake();
        };
        this.lastOperation();
    };
    Motors.prototype.left = function (speed) {
        var _this = this;
        this.speed = speed;
        this.lastOperation = function () {
            console.log("Turning left");
            _this.leftMotor.reverse(_this._speed);
            _this.rightMotor.forward(_this._speed);
        };
        this.lastOperation();
    };
    Motors.prototype.right = function (speed) {
        var _this = this;
        this.speed = speed;
        this.lastOperation = function () {
            console.log("Turning right");
            _this.leftMotor.forward(_this._speed);
            _this.rightMotor.reverse(_this._speed);
        };
        this.lastOperation();
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
