"use strict";
var j5 = require("johnny-five");
var psybotMotors = require("./components/motors");
var psybotFrontarm = require("./components/frontarm");
var Psybot = (function () {
    function Psybot(usbConnection) {
        if (usbConnection) {
            this.board = new j5.Board();
        }
        else {
            var boardOptions = new BoardOptions("/dev/ttyAMA0");
            this.board = new j5.Board(boardOptions);
        }
    }
    Object.defineProperty(Psybot.prototype, "motors", {
        get: function () {
            if (!this._motors) {
                var leftPins = new psybotMotors.MotorPins(6, 2, 3);
                var rightPins = new psybotMotors.MotorPins(11, 4, 5);
                this._motors = new psybotMotors.Motors(leftPins, rightPins);
            }
            return this._motors;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Psybot.prototype, "frontArm", {
        get: function () {
            if (!this._frontArm) {
                this._frontArm = new psybotFrontarm.FrontArm(14, 15);
            }
            return this._frontArm;
        },
        enumerable: true,
        configurable: true
    });
    return Psybot;
}());
exports.Psybot = Psybot;
var BoardOptions = (function () {
    function BoardOptions(port) {
        this.port = port;
    }
    return BoardOptions;
}());