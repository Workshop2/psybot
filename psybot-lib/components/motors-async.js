"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const johnny_five_1 = require("johnny-five");
const shields_1 = require("../../j5-types/shields");
const Q = require("q");
class MotorsAsync {
    constructor() {
        this.minSpeed = 50;
        this.maxSpeed = 255;
        this.operationCooldown = 50;
        console.log("Initialising motors...");
        this.leftMotor = new johnny_five_1.Motor(shields_1.Shields.M1);
        this.rightMotor = new johnny_five_1.Motor(shields_1.Shields.M2);
        console.log("Done!");
        this._speed = this.maxSpeed;
    }
    forward() {
        return Q.fcall(() => {
            console.log("Moving forward...");
            this.leftMotor.forward(this.leftSpeed);
            this.rightMotor.forward(this.rightSpeed);
        })
            .delay(this.operationCooldown);
    }
    reverse() {
        return Q.fcall(() => {
            console.log("Moving forward...");
            this.leftMotor.reverse(this.leftSpeed);
            this.rightMotor.reverse(this.rightSpeed);
        })
            .delay(this.operationCooldown);
    }
    brake() {
        return Q.fcall(() => {
            console.log("Breaking...");
            this.leftMotor.brake();
            this.rightMotor.brake();
        })
            .delay(this.operationCooldown);
    }
    left() {
        return Q.fcall(() => {
            console.log("Turning left");
            this.leftMotor.reverse(this.leftSpeed);
            this.rightMotor.forward(this.rightSpeed);
        })
            .delay(this.operationCooldown);
    }
    right() {
        return Q.fcall(() => {
            console.log("Turning right");
            this.leftMotor.forward(this.leftSpeed);
            this.rightMotor.reverse(this.rightSpeed);
        })
            .delay(this.operationCooldown);
    }
    get speed() {
        return this._speed;
    }
    setSpeed(newSpeed) {
        if (newSpeed) {
            if (newSpeed < this.minSpeed) {
                newSpeed = this.minSpeed;
            }
            if (newSpeed > this.maxSpeed) {
                newSpeed = this.maxSpeed;
            }
            let promise = Q.fcall(() => { });
            if (newSpeed != this.speed) {
                console.log("Changing speed to " + newSpeed);
                this._speed = newSpeed;
                promise.then(() => {
                    if (this.leftMotor.isOn) {
                        this.leftMotor.start(this.leftSpeed);
                    }
                    if (this.rightMotor.isOn) {
                        this.rightMotor.start(this.rightSpeed);
                    }
                })
                    .delay(this.operationCooldown);
            }
            return promise;
        }
    }
    get leftSpeed() {
        return this.speed;
    }
    get rightSpeed() {
        return this.speed * 0.985;
    }
}
exports.MotorsAsync = MotorsAsync;
//# sourceMappingURL=motors-async.js.map