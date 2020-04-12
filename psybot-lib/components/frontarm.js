"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const johnny_five_1 = require("johnny-five");
const Q = require("q");
class FrontArm {
    constructor(bottomServoPin, topServoPin) {
        this.movementSpeed = 800;
        this.stopTimeout = 100;
        this.operationTimeout = 400;
        this.bottomServo = new johnny_five_1.Servo({
            pin: bottomServoPin,
            range: [30, 180],
            center: true
        });
        this.topServo = new johnny_five_1.Servo({
            pin: topServoPin,
            range: [40, 140],
            center: true
        });
    }
    stop(callback) {
        this.stopBottom();
        this.stopTop();
        if (callback) {
            setTimeout(callback, this.stopTimeout);
        }
    }
    stopAsync() {
        return Q.fcall(() => {
            console.log("stop");
            this.topServo.stop();
            this.bottomServo.stop();
        });
    }
    stopBottom(callback) {
        console.log("stopBottom");
        this.bottomServo.stop();
        if (callback) {
            setTimeout(callback, this.stopTimeout);
        }
    }
    stopBottomAsync() {
        return Q.fcall(() => {
            console.log("stopBottom");
            this.bottomServo.stop();
        });
    }
    stopTop(callback) {
        console.log("stopTop");
        this.topServo.stop();
        if (callback) {
            setTimeout(callback, this.stopTimeout);
        }
    }
    stopTopAsync() {
        return Q.fcall(() => {
            console.log("stopTop");
            this.topServo.stop();
        });
    }
    // based on trust that the callbacks work...
    center(callback) {
        this.stop();
        this.bottomServo.center();
        this.topServo.center();
        setTimeout(() => {
            this.stop();
            if (callback) {
                callback();
            }
        }, this.movementSpeed);
    }
    centerAsync() {
        return Q.fcall(() => {
            console.log("center");
            this.bottomServo.center();
            this.topServo.center();
        })
            .delay(500);
    }
    faceUp(callback) {
        this.stopTop(() => {
            console.log("faceUp");
            this.topServo.min();
            setTimeout(() => { this.stopTop(callback); }, this.movementSpeed);
        });
    }
    faceUpAsync() {
        return Q.fcall(() => {
            console.log("faceUp");
            this.topServo.min();
        })
            .delay(this.operationTimeout);
    }
    faceDown(callback) {
        this.stopTop(() => {
            console.log("faceDown");
            this.topServo.max();
            setTimeout(() => { this.stopTop(callback); }, this.movementSpeed);
        });
    }
    faceDownAsync() {
        return Q.fcall(() => {
            console.log("faceDown");
            this.topServo.max();
        })
            .delay(this.operationTimeout);
    }
    faceRight(callback) {
        this.stopBottom(() => {
            console.log("faceRight");
            this.bottomServo.min();
            setTimeout(() => { this.stopBottom(callback); }, this.movementSpeed);
        });
    }
    faceRightAsync() {
        return Q.fcall(() => {
            console.log("faceRight");
            this.bottomServo.min();
        })
            .delay(this.operationTimeout);
    }
    faceLeft(callback) {
        this.stopBottom(() => {
            console.log("faceLeft");
            this.bottomServo.max();
            setTimeout(() => { this.stopBottom(callback); }, this.movementSpeed);
        });
    }
    faceLeftAsync() {
        return Q.fcall(() => {
            console.log("faceLeft");
            this.bottomServo.max();
        })
            .delay(this.operationTimeout);
    }
    sweepUpDown(sweepOptions) {
        this.stopTop();
        this.topServo.sweep(sweepOptions);
    }
    sweepUpDownAsync(sweepOptions) {
        return this.stopTopAsync()
            .then(() => {
            this.topServo.sweep(sweepOptions);
        });
    }
    sweepLeftRight(sweepOptions) {
        this.stopBottom();
        this.bottomServo.sweep(sweepOptions);
    }
    sweepLeftAsync(sweepOptions) {
        return this.stopBottomAsync()
            .then(() => {
            this.bottomServo.sweep(sweepOptions);
        });
    }
}
exports.FrontArm = FrontArm;
//# sourceMappingURL=frontarm.js.map