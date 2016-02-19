"use strict";
var j5 = require("johnny-five");
var Motors = (function () {
    function Motors(leftPins, rightPins) {
        this.minSpeed = 140;
        this.maxSpeed = 255;
        this.operationCooldown = 50;
        console.log("Initialising motors...");
        this.leftMotor = new j5.Motor(new MotorOptions(leftPins));
        this.rightMotor = new j5.Motor(new MotorOptions(rightPins));
        console.log("Done!");
        this.speed = this.maxSpeed;
    }
    Motors.prototype.forward = function (speed, callback) {
        var _this = this;
        this.speed = speed;
        this.runOperation(function () {
            console.log("Moving forward");
            _this.leftMotor.forward(_this.speed);
            _this.rightMotor.forward(_this.speed);
            if (callback) {
                callback();
            }
        });
    };
    Motors.prototype.reverse = function (speed, callback) {
        var _this = this;
        this.speed = speed;
        this.runOperation(function () {
            console.log("Moving backwards");
            _this.leftMotor.reverse(_this.speed);
            _this.rightMotor.reverse(_this.speed);
            if (callback) {
                callback();
            }
        });
    };
    Motors.prototype.brake = function (callback) {
        console.log("Braking");
        this.leftMotor.brake();
        this.rightMotor.brake();
        this.lastOperation = null;
        if (callback) {
            setTimeout(callback, this.operationCooldown);
        }
    };
    Motors.prototype.left = function (callback) {
        var _this = this;
        this.runOperation(function () {
            console.log("Turning left");
            _this.leftMotor.reverse(_this.maxSpeed);
            _this.rightMotor.forward(_this.maxSpeed);
            if (callback) {
                callback();
            }
        });
    };
    Motors.prototype.right = function (callback) {
        var _this = this;
        this.runOperation(function () {
            console.log("Turning right");
            _this.leftMotor.forward(_this.maxSpeed);
            _this.rightMotor.reverse(_this.maxSpeed);
            if (callback) {
                callback();
            }
        });
    };
    Object.defineProperty(Motors.prototype, "speed", {
        get: function () {
            return this._speed;
        },
        set: function (newSpeed) {
            if (newSpeed) {
                if (newSpeed < this.minSpeed) {
                    newSpeed = this.minSpeed;
                }
                if (newSpeed > this.maxSpeed) {
                    newSpeed = this.maxSpeed;
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
    Motors.prototype.runOperation = function (operation) {
        var _this = this;
        this.brake(function () {
            operation();
            _this.lastOperation = operation;
        });
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
