"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var johnny_five_1 = require("johnny-five");
var Q = require("q");
var FrontArm = /** @class */ (function () {
    function FrontArm(bottomServoPin, topServoPin) {
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
    FrontArm.prototype.stop = function (callback) {
        this.stopBottom();
        this.stopTop();
        if (callback) {
            setTimeout(callback, this.stopTimeout);
        }
    };
    FrontArm.prototype.stopAsync = function () {
        var _this = this;
        return Q.fcall(function () {
            console.log("stop");
            _this.topServo.stop();
            _this.bottomServo.stop();
        });
    };
    FrontArm.prototype.stopBottom = function (callback) {
        console.log("stopBottom");
        this.bottomServo.stop();
        if (callback) {
            setTimeout(callback, this.stopTimeout);
        }
    };
    FrontArm.prototype.stopBottomAsync = function () {
        var _this = this;
        return Q.fcall(function () {
            console.log("stopBottom");
            _this.bottomServo.stop();
        });
    };
    FrontArm.prototype.stopTop = function (callback) {
        console.log("stopTop");
        this.topServo.stop();
        if (callback) {
            setTimeout(callback, this.stopTimeout);
        }
    };
    FrontArm.prototype.stopTopAsync = function () {
        var _this = this;
        return Q.fcall(function () {
            console.log("stopTop");
            _this.topServo.stop();
        });
    };
    // based on trust that the callbacks work...
    FrontArm.prototype.center = function (callback) {
        var _this = this;
        this.stop();
        this.bottomServo.center();
        this.topServo.center();
        setTimeout(function () {
            _this.stop();
            if (callback) {
                callback();
            }
        }, this.movementSpeed);
    };
    FrontArm.prototype.centerAsync = function () {
        var _this = this;
        return Q.fcall(function () {
            console.log("center");
            _this.bottomServo.center();
            _this.topServo.center();
        })
            .delay(500);
    };
    FrontArm.prototype.faceUp = function (callback) {
        var _this = this;
        this.stopTop(function () {
            console.log("faceUp");
            _this.topServo.min();
            setTimeout(function () { _this.stopTop(callback); }, _this.movementSpeed);
        });
    };
    FrontArm.prototype.faceUpAsync = function () {
        var _this = this;
        return Q.fcall(function () {
            console.log("faceUp");
            _this.topServo.min();
        })
            .delay(this.operationTimeout);
    };
    FrontArm.prototype.faceDown = function (callback) {
        var _this = this;
        this.stopTop(function () {
            console.log("faceDown");
            _this.topServo.max();
            setTimeout(function () { _this.stopTop(callback); }, _this.movementSpeed);
        });
    };
    FrontArm.prototype.faceDownAsync = function () {
        var _this = this;
        return Q.fcall(function () {
            console.log("faceDown");
            _this.topServo.max();
        })
            .delay(this.operationTimeout);
    };
    FrontArm.prototype.faceRight = function (callback) {
        var _this = this;
        this.stopBottom(function () {
            console.log("faceRight");
            _this.bottomServo.min();
            setTimeout(function () { _this.stopBottom(callback); }, _this.movementSpeed);
        });
    };
    FrontArm.prototype.faceRightAsync = function () {
        var _this = this;
        return Q.fcall(function () {
            console.log("faceRight");
            _this.bottomServo.min();
        })
            .delay(this.operationTimeout);
    };
    FrontArm.prototype.faceLeft = function (callback) {
        var _this = this;
        this.stopBottom(function () {
            console.log("faceLeft");
            _this.bottomServo.max();
            setTimeout(function () { _this.stopBottom(callback); }, _this.movementSpeed);
        });
    };
    FrontArm.prototype.faceLeftAsync = function () {
        var _this = this;
        return Q.fcall(function () {
            console.log("faceLeft");
            _this.bottomServo.max();
        })
            .delay(this.operationTimeout);
    };
    FrontArm.prototype.sweepUpDown = function (sweepOptions) {
        this.stopTop();
        this.topServo.sweep(sweepOptions);
    };
    FrontArm.prototype.sweepUpDownAsync = function (sweepOptions) {
        var _this = this;
        return this.stopTopAsync()
            .then(function () {
            _this.topServo.sweep(sweepOptions);
        });
    };
    FrontArm.prototype.sweepLeftRight = function (sweepOptions) {
        this.stopBottom();
        this.bottomServo.sweep(sweepOptions);
    };
    FrontArm.prototype.sweepLeftAsync = function (sweepOptions) {
        var _this = this;
        return this.stopBottomAsync()
            .then(function () {
            _this.bottomServo.sweep(sweepOptions);
        });
    };
    return FrontArm;
}());
exports.FrontArm = FrontArm;
//# sourceMappingURL=frontarm.js.map