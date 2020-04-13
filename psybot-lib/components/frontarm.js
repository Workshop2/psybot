"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const johnny_five_1 = require("johnny-five");
const delay_1 = require("../delay");
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
        return __awaiter(this, void 0, void 0, function* () {
            console.log("stop");
            this.topServo.stop();
            this.bottomServo.stop();
            yield delay_1.default(this.operationTimeout);
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
        return __awaiter(this, void 0, void 0, function* () {
            console.log("stopBottom");
            this.bottomServo.stop();
            yield delay_1.default(this.operationTimeout);
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
        return __awaiter(this, void 0, void 0, function* () {
            console.log("stopTop");
            this.topServo.stop();
            yield delay_1.default(this.operationTimeout);
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
        return __awaiter(this, void 0, void 0, function* () {
            console.log("center");
            this.bottomServo.center();
            this.topServo.center();
            yield delay_1.default(this.operationTimeout);
        });
    }
    faceUp(callback) {
        this.stopTop(() => {
            console.log("faceUp");
            this.topServo.min();
            setTimeout(() => { this.stopTop(callback); }, this.movementSpeed);
        });
    }
    faceUpAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("faceUp");
            this.topServo.min();
            yield delay_1.default(this.operationTimeout);
        });
    }
    faceDown(callback) {
        this.stopTop(() => {
            console.log("faceDown");
            this.topServo.max();
            setTimeout(() => { this.stopTop(callback); }, this.movementSpeed);
        });
    }
    faceDownAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("faceDown");
            this.topServo.max();
            yield delay_1.default(this.operationTimeout);
        });
    }
    faceRight(callback) {
        this.stopBottom(() => {
            console.log("faceRight");
            this.bottomServo.min();
            setTimeout(() => { this.stopBottom(callback); }, this.movementSpeed);
        });
    }
    faceRightAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("faceRight");
            this.bottomServo.min();
            yield delay_1.default(this.operationTimeout);
        });
    }
    faceLeft(callback) {
        this.stopBottom(() => {
            console.log("faceLeft");
            this.bottomServo.max();
            setTimeout(() => { this.stopBottom(callback); }, this.movementSpeed);
        });
    }
    faceLeftAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("faceLeft");
            this.bottomServo.max();
            yield delay_1.default(this.operationTimeout);
        });
    }
    sweepUpDown(sweepOptions) {
        this.stopTop();
        this.topServo.sweep(sweepOptions);
    }
    sweepUpDownAsync(sweepOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.stopTopAsync();
            this.topServo.sweep(sweepOptions);
        });
    }
    sweepLeftRight(sweepOptions) {
        this.stopBottom();
        this.bottomServo.sweep(sweepOptions);
    }
    sweepLeftAsync(sweepOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.stopBottomAsync();
            this.bottomServo.sweep(sweepOptions);
        });
    }
}
exports.FrontArm = FrontArm;
//# sourceMappingURL=frontarm.js.map