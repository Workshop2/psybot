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
            if (newSpeed) {
                if (newSpeed < 0) {
                    newSpeed = 0;
                }
                if (newSpeed > 255) {
                    newSpeed = 255;
                }
                console.log("Speed changed to " + newSpeed);
                this._speed = newSpeed;
            }
        },
        enumerable: true,
        configurable: true
    });
    Motors.prototype.forward = function (speed) {
        this.speed = speed;
        console.log("Moving forward");
        this.leftMotor.forward(this._speed);
        this.rightMotor.forward(this._speed);
    };
    Motors.prototype.reverse = function (speed) {
        this.speed = speed;
        console.log("Moving backwards");
        this.leftMotor.reverse(this._speed);
        this.rightMotor.reverse(this._speed);
    };
    Motors.prototype.brake = function () {
        console.log("Braking");
        this.leftMotor.brake();
        this.rightMotor.brake();
    };
    Motors.prototype.left = function (speed) {
        this.speed = speed;
        console.log("Turning left");
        this.leftMotor.reverse(this._speed);
        this.rightMotor.forward(this._speed);
    };
    Motors.prototype.right = function (speed) {
        this.speed = speed;
        console.log("Turning right");
        this.leftMotor.forward(this._speed);
        this.rightMotor.reverse(this._speed);
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
