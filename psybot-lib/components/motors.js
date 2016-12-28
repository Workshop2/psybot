"use strict";
var j5 = require("johnny-five");
var Motors = (function () {
    function Motors() {
        this.minSpeed = 50;
        this.maxSpeed = 255;
        this.operationCooldown = 50;
        console.log("Initialising motors...");
        this.leftMotor = new j5.Motor(Motors.leftMotorPin);
        this.rightMotor = new j5.Motor(Motors.rightMotorPin);
        console.log("Done!");
        this.speed = this.maxSpeed;
    }
    Motors.prototype.forward = function (callback) {
        var _this = this;
        var hasAlreadyCalledBack = false;
        this.runOperation(function () {
            console.log("Moving forward");
            _this.leftMotor.forward(_this.leftSpeed);
            _this.rightMotor.forward(_this.rightSpeed);
            if (callback && !hasAlreadyCalledBack) {
                console.log("Forward callback()...");
                hasAlreadyCalledBack = true;
                callback();
            }
        });
    };
    Motors.prototype.reverse = function (callback) {
        var _this = this;
        var hasAlreadyCalledBack = false;
        this.runOperation(function () {
            console.log("Moving backwards");
            _this.leftMotor.reverse(_this.leftSpeed);
            _this.rightMotor.reverse(_this.rightSpeed);
            if (callback && !hasAlreadyCalledBack) {
                console.log("Reverse callback()...");
                hasAlreadyCalledBack = true;
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
        var hasAlreadyCalledBack = false;
        this.runOperation(function () {
            console.log("Turning left");
            _this.leftMotor.reverse(_this.maxSpeed);
            _this.rightMotor.forward(_this.maxSpeed);
            if (callback && !hasAlreadyCalledBack) {
                console.log("Left callback()...");
                hasAlreadyCalledBack = true;
                callback();
            }
        });
    };
    Motors.prototype.right = function (callback) {
        var _this = this;
        var hasAlreadyCalledBack = false;
        this.runOperation(function () {
            console.log("Turning right");
            _this.leftMotor.forward(_this.maxSpeed);
            _this.rightMotor.reverse(_this.maxSpeed);
            if (callback && !hasAlreadyCalledBack) {
                console.log("Right callback()...");
                hasAlreadyCalledBack = true;
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
    Object.defineProperty(Motors.prototype, "leftSpeed", {
        get: function () {
            return this.speed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Motors.prototype, "rightSpeed", {
        get: function () {
            return this.speed * 0.985;
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
    Motors.leftMotorPin = j5.Motor.SHIELD_CONFIGS.ADAFRUIT_V2.M1;
    Motors.rightMotorPin = j5.Motor.SHIELD_CONFIGS.ADAFRUIT_V2.M2;
    return Motors;
}());
exports.Motors = Motors;
