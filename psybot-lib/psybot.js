"use strict";
var j5 = require("johnny-five");
var psybotMotors = require("./components/motors");
var psybotFrontarm = require("./components/frontarm");
var psybotSpeedReader = require("./components/speed-reader");
var Psybot = (function () {
    function Psybot(settings) {
        if (settings.usbConnection) {
            this.board = new j5.Board();
        }
        else {
            console.log("Connecting to serial port: " + settings.serialPort);
            var boardOptions = new BoardOptions(settings.serialPort);
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
    Object.defineProperty(Psybot.prototype, "someSensor", {
        get: function () {
            if (!this._someSensor) {
                console.log("Generating sensor...");
                var pin = new psybotSpeedReader.SensorOptions("A5", 5);
                this._someSensor = new psybotSpeedReader.SpeedReader(pin);
            }
            return this._someSensor;
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
