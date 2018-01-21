"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var johnny_five_1 = require("johnny-five");
var shields_1 = require("../../j5-types/shields");
var Q = require("q");
var MotorsAsync = /** @class */ (function () {
    function MotorsAsync() {
        this.minSpeed = 50;
        this.maxSpeed = 255;
        this.operationCooldown = 50;
        console.log("Initialising motors...");
        this.leftMotor = new johnny_five_1.Motor(shields_1.Shields.M1);
        this.rightMotor = new johnny_five_1.Motor(shields_1.Shields.M2);
        console.log("Done!");
        this._speed = this.maxSpeed;
    }
    MotorsAsync.prototype.forward = function () {
        var _this = this;
        return Q.fcall(function () {
            console.log("Moving forward...");
            _this.leftMotor.forward(_this.speed);
            _this.rightMotor.forward(_this.speed);
        })
            .delay(this.operationCooldown);
    };
    MotorsAsync.prototype.reverse = function () {
        var _this = this;
        return Q.fcall(function () {
            console.log("Moving forward...");
            _this.leftMotor.reverse(_this.speed);
            _this.rightMotor.reverse(_this.speed);
        })
            .delay(this.operationCooldown);
    };
    MotorsAsync.prototype.brake = function () {
        var _this = this;
        return Q.fcall(function () {
            console.log("Breaking...");
            _this.leftMotor.brake();
            _this.rightMotor.brake();
        })
            .delay(this.operationCooldown);
    };
    MotorsAsync.prototype.left = function () {
        var _this = this;
        return Q.fcall(function () {
            console.log("Turning left");
            _this.leftMotor.reverse(_this.speed);
            _this.rightMotor.forward(_this.speed);
        })
            .delay(this.operationCooldown);
    };
    MotorsAsync.prototype.right = function () {
        var _this = this;
        return Q.fcall(function () {
            console.log("Turning right");
            _this.leftMotor.forward(_this.speed);
            _this.rightMotor.reverse(_this.speed);
        })
            .delay(this.operationCooldown);
    };
    Object.defineProperty(MotorsAsync.prototype, "speed", {
        get: function () {
            return this._speed;
        },
        enumerable: true,
        configurable: true
    });
    MotorsAsync.prototype.setSpeed = function (newSpeed) {
        var _this = this;
        if (newSpeed) {
            if (newSpeed < this.minSpeed) {
                newSpeed = this.minSpeed;
            }
            if (newSpeed > this.maxSpeed) {
                newSpeed = this.maxSpeed;
            }
            var promise = Q.fcall(function () { });
            if (newSpeed != this.speed) {
                console.log("Changing speed to " + newSpeed);
                this._speed = newSpeed;
                promise.then(function () {
                    if (_this.leftMotor.isOn) {
                        _this.leftMotor.start(newSpeed);
                    }
                    if (_this.rightMotor.isOn) {
                        _this.rightMotor.start(newSpeed);
                    }
                })
                    .delay(this.operationCooldown);
            }
            return promise;
        }
    };
    Object.defineProperty(MotorsAsync.prototype, "leftSpeed", {
        get: function () {
            return this.speed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MotorsAsync.prototype, "rightSpeed", {
        get: function () {
            return this.speed * 0.985;
        },
        enumerable: true,
        configurable: true
    });
    return MotorsAsync;
}());
exports.MotorsAsync = MotorsAsync;
//# sourceMappingURL=motors-async.js.map