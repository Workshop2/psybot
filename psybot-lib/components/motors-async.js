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
const shields_1 = require("../../j5-types/shields");
const delay_1 = require("../delay");
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
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Moving forward...");
            this.leftMotor.forward(this.leftSpeed);
            this.rightMotor.forward(this.rightSpeed);
            yield delay_1.default(this.operationCooldown);
        });
    }
    reverse() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Moving forward...");
            this.leftMotor.reverse(this.leftSpeed);
            this.rightMotor.reverse(this.rightSpeed);
            yield delay_1.default(this.operationCooldown);
        });
    }
    brake() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Breaking...");
            this.leftMotor.brake();
            this.rightMotor.brake();
            yield delay_1.default(this.operationCooldown);
        });
    }
    left() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Turning left");
            this.leftMotor.reverse(this.leftSpeed);
            this.rightMotor.forward(this.rightSpeed);
            yield delay_1.default(this.operationCooldown);
        });
    }
    right() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Turning right");
            this.leftMotor.forward(this.leftSpeed);
            this.rightMotor.reverse(this.rightSpeed);
            yield delay_1.default(this.operationCooldown);
        });
    }
    get speed() {
        return this._speed;
    }
    setSpeed(newSpeed) {
        return __awaiter(this, void 0, void 0, function* () {
            if (newSpeed) {
                if (newSpeed < this.minSpeed) {
                    newSpeed = this.minSpeed;
                }
                if (newSpeed > this.maxSpeed) {
                    newSpeed = this.maxSpeed;
                }
                if (newSpeed != this.speed) {
                    console.log("Changing speed to " + newSpeed);
                    this._speed = newSpeed;
                    if (this.leftMotor.isOn) {
                        this.leftMotor.start(this.leftSpeed);
                    }
                    if (this.rightMotor.isOn) {
                        this.rightMotor.start(this.rightSpeed);
                    }
                }
                yield delay_1.default(this.operationCooldown);
            }
        });
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