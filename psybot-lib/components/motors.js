"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shields_1 = require("../../j5-types/shields");
const johnny_five_1 = require("johnny-five");
class Motors {
    constructor() {
        this.minSpeed = 50;
        this.maxSpeed = 255;
        this.operationCooldown = 50;
        console.log("Initialising motors...");
        this.leftMotor = new johnny_five_1.Motor(Motors.leftMotorPin);
        this.rightMotor = new johnny_five_1.Motor(Motors.rightMotorPin);
        console.log("Done!");
        this.speed = this.maxSpeed;
    }
    forward(callback) {
        var hasAlreadyCalledBack = false;
        this.runOperation(() => {
            console.log("Moving forward");
            this.leftMotor.forward(this.leftSpeed);
            this.rightMotor.forward(this.rightSpeed);
            if (callback && !hasAlreadyCalledBack) {
                console.log("Forward callback()...");
                hasAlreadyCalledBack = true;
                callback();
            }
        });
    }
    reverse(callback) {
        var hasAlreadyCalledBack = false;
        this.runOperation(() => {
            console.log("Moving backwards");
            this.leftMotor.reverse(this.leftSpeed);
            this.rightMotor.reverse(this.rightSpeed);
            if (callback && !hasAlreadyCalledBack) {
                console.log("Reverse callback()...");
                hasAlreadyCalledBack = true;
                callback();
            }
        });
    }
    brake(callback) {
        console.log("Braking");
        this.leftMotor.brake();
        this.rightMotor.brake();
        this.lastOperation = null;
        if (callback) {
            setTimeout(callback, this.operationCooldown);
        }
    }
    left(callback) {
        var hasAlreadyCalledBack = false;
        this.runOperation(() => {
            console.log("Turning left");
            this.leftMotor.reverse(this.maxSpeed);
            this.rightMotor.forward(this.maxSpeed);
            if (callback && !hasAlreadyCalledBack) {
                console.log("Left callback()...");
                hasAlreadyCalledBack = true;
                callback();
            }
        });
    }
    right(callback) {
        var hasAlreadyCalledBack = false;
        this.runOperation(() => {
            console.log("Turning right");
            this.leftMotor.forward(this.maxSpeed);
            this.rightMotor.reverse(this.maxSpeed);
            if (callback && !hasAlreadyCalledBack) {
                console.log("Right callback()...");
                hasAlreadyCalledBack = true;
                callback();
            }
        });
    }
    get speed() {
        return this._speed;
    }
    set speed(newSpeed) {
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
    }
    get leftSpeed() {
        return this.speed;
    }
    get rightSpeed() {
        return this.speed * 0.985;
    }
    runOperation(operation) {
        this.brake(() => {
            operation();
            this.lastOperation = operation;
        });
    }
}
exports.Motors = Motors;
Motors.leftMotorPin = shields_1.Shields.M1;
Motors.rightMotorPin = shields_1.Shields.M2;
//# sourceMappingURL=motors.js.map